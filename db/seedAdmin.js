// Run once with: npm run seed:admin
// Creates (or updates) the first CMS admin user using ADMIN_EMAIL / ADMIN_PASSWORD from .env
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [ADMIN_EMAIL]);

  if (existing.rows.length > 0) {
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, ADMIN_EMAIL]);
    console.log(`Admin user ${ADMIN_EMAIL} already existed — password updated.`);
  } else {
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      ['Admin', ADMIN_EMAIL, hashedPassword, 'admin']
    );
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin user:', err);
  process.exit(1);
});