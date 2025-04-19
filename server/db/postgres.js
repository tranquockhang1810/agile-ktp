const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Connected to the PostgreSQL database');
  } catch (error) {
    console.error('Failed to connect to the PostgreSQL database', error);
    process.exit(-1);
  }
})();

module.exports = pool;
