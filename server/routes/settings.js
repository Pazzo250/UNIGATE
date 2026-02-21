const express = require('express');
const router = express.Router();
const { Setting } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { logAction } = require('../middleware/audit');

// GET /api/settings/:key
router.get('/:key', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const s = await Setting.findByPk(req.params.key);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/settings/:key
router.put('/:key', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const key = req.params.key;
    const val = req.body.value;
    const [s, created] = await Setting.upsert({ key, value: val, description: req.body.description || null, updatedAt: new Date() });
    await logAction(req, 'setting.update', 'setting', key, { value: val });
    res.json({ key, value: val });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
