const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET = process.env.JWT_SECRET || 'change_this_secret';

/**
 * Seed super_admin user on first startup
 * Email: admin@unigate.local
 * Password: SuperAdmin123!
 * Role: super_admin
 */
async function seedSuperAdmin() {
  try {
    const existing = await User.findOne({ where: { email: 'admin@unigate.local' } });
    if (existing) return; // already seeded
    const superAdmin = await User.createWithPassword({
      email: 'admin@unigate.local',
      password: 'SuperAdmin123!',
      name: 'Super Admin',
      role: 'super_admin',
      status: 'active'
    });
    console.log('[AUTH] Super admin seeded:', superAdmin.email);
  } catch (err) {
    console.error('[AUTH] Failed to seed super admin:', err.message);
  }
}

// Seed on module load (safe: idempotent)
seedSuperAdmin();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const payload = { email: req.body.email, password: req.body.password, name: req.body.name, role: req.body.role || 'student' };
    // prevent public registration of super_admin (only via seed or direct DB)
    if (payload.role === 'super_admin') {
      return res.status(403).json({ message: 'Cannot register as super_admin via public endpoint' });
    }
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) return res.status(409).json({ message: 'Email already exists' });
    const user = await User.createWithPassword(payload);
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
