// PostgreSQL connection pool (Supabase-hosted Postgres)
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required by Supabase
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL (Supabase)');
});

pool.on('error', (err) => {
  console.error('Unexpected database error', err);
  process.exit(1);
});

module.exports = pool;