// "about" is a singleton — there is only ever one row. GET returns it
// (creating an empty one on first run), PUT updates it.
const pool = require('../config/db');

const ALLOWED_FIELDS = [
  'full_name', 'title', 'bio', 'profile_image',
  'resume_url', 'location', 'email', 'social_links',
];

async function getAbout(req, res) {
  try {
    let result = await pool.query('SELECT * FROM about ORDER BY id LIMIT 1');

    if (result.rows.length === 0) {
      result = await pool.query('INSERT INTO about (full_name) VALUES ($1) RETURNING *', ['']);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch about info' });
  }
}

async function updateAbout(req, res) {
  try {
    const existing = await pool.query('SELECT id FROM about ORDER BY id LIMIT 1');

    const fields = ALLOWED_FIELDS.filter((f) => req.body[f] !== undefined);
    if (fields.length === 0) {
      return res.status(400).json({ message: 'No valid fields provided' });
    }
    const values = fields.map((f) => req.body[f]);

    let result;
    if (existing.rows.length === 0) {
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
      result = await pool.query(
        `INSERT INTO about (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        values
      );
    } else {
      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
      result = await pool.query(
        `UPDATE about SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, existing.rows[0].id]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update about info' });
  }
}

module.exports = { getAbout, updateAbout };