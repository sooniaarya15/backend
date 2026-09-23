const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const generateToken = require('../utils/generateToken');

// POST /auth/login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
}

// POST /auth/refresh — issues a new token for an already-valid one
async function refresh(req, res) {
  // req.user is set by the protect middleware
  const token = generateToken({ id: req.user.id, email: req.user.email, role: req.user.role });
  res.json({ token });
}

module.exports = { login, refresh };