const jwt = require('jsonwebtoken');

// Protects any route that requires a logged-in admin.
// Expects header: Authorization: Bearer <token>
function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
}

module.exports = { protect };