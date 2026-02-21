const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies && req.cookies.token;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
    next();
  } catch (err) {
    console.error('auth error', err);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
