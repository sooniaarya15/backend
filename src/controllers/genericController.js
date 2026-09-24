// A reusable CRUD controller factory.
// Every simple content type (skills, projects, blogs, experience,
// testimonials, services) shares the same shape: list / get one / create /
// update / delete. Rather than repeating this logic 6 times, we generate it
// once per table.
const pool = require('../config/db');

/**
 * @param {string} table - table name in the database
 * @param {string[]} allowedFields - columns that can be set via POST/PUT
 * @param {string} orderBy - column to sort results by (default: sort_order then id)
 */
function createCrudController(table, allowedFields, orderBy = 'sort_order ASC, id ASC') {
  // GET /resource
  async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to fetch ${table}` });
    }
  }

  // GET /resource/:id
  async function getOne(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: `${table} entry not found` });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to fetch ${table} entry` });
    }
  }

  // POST /resource
  async function create(req, res) {
    try {
      const fields = allowedFields.filter((f) => req.body[f] !== undefined);
      if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided' });
      }
      const values = fields.map((f) => req.body[f]);
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');

      const query = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to create ${table} entry` });
    }
  }

  // PUT /resource/:id
  async function update(req, res) {
    try {
      const fields = allowedFields.filter((f) => req.body[f] !== undefined);
      if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided' });
      }
      const values = fields.map((f) => req.body[f]);
      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');

      const query = `UPDATE ${table} SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
      const result = await pool.query(query, [...values, req.params.id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: `${table} entry not found` });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to update ${table} entry` });
    }
  }

  // DELETE /resource/:id
  async function remove(req, res) {
    try {
      const result = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: `${table} entry not found` });
      }
      res.json({ message: `${table} entry deleted`, id: result.rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to delete ${table} entry` });
    }
  }

  return { getAll, getOne, create, update, remove };
}

module.exports = createCrudController;