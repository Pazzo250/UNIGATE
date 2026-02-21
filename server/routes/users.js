const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { logAction } = require('../middleware/audit');

// GET /api/users  ?q=&role=&status=&page=&limit=&sort=
router.get('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const { q, role, status, page = 1, limit = 20, sort = 'createdAt:desc' } = req.query;
    const where = {};
    if (role) where.role = role;
    if (status) where.status = status;
    if (q) where.email = { [require('sequelize').Op.like]: `%${q}%` }; // simple search
    const [sortBy, sortDir] = sort.split(':');
    const users = await User.findAndCountAll({
      where,
      order: [[sortBy || 'createdAt', (sortDir || 'desc').toUpperCase()]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit)
    });
    res.json({ total: users.count, rows: users.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users  (create user)
router.post('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.email || !payload.password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) return res.status(409).json({ message: 'Email exists' });
    const user = await User.createWithPassword(payload);
    await logAction(req, 'user.create', 'user', user.id, { email: user.email, role: user.role });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/:id  (update)
router.put('/:id', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    await user.update(req.body);
    await logAction(req, 'user.update', 'user', user.id, { changes: req.body });
    res.json(user);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/users/:id/suspend
router.patch('/:id/suspend', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.status = req.body.status || 'suspended';
    await user.save();
    await logAction(req, 'user.suspend', 'user', user.id, { status: user.status });
    res.json({ message: 'Updated', user });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/users/:id  (soft-delete)
router.delete('/:id', auth, requireRole('super_admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.status = 'deleted';
    await user.save();
    await logAction(req, 'user.delete', 'user', user.id, {});
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
