const express = require('express');
const router = express.Router();
const { University } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { Op } = require('sequelize');
const { logAction } = require('../middleware/audit');

// GET /api/universities?q=&country=&verified=&page=&limit=
router.get('/', auth, requireRole('super_admin','admin','university_admin'), async (req, res) => {
  try {
    const { q, country, verified, page = 1, limit = 20 } = req.query;
    const where = {};
    if (q) where.name = { [Op.like]: `%${q}%` };
    if (country) where.country = country;
    if (verified !== undefined) where.verified = (verified === 'true');
    const rows = await University.findAndCountAll({
      where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']]
    });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/universities
router.post('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const uni = await University.create(req.body);
    await logAction(req, 'university.create', 'university', uni.id, { name: uni.name });
    res.status(201).json(uni);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/universities/:id
router.put('/:id', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const uni = await University.findByPk(req.params.id);
    if (!uni) return res.status(404).json({ message: 'Not found' });
    await uni.update(req.body);
    await logAction(req, 'university.update', 'university', uni.id, { changes: req.body });
    res.json(uni);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/universities/:id/verify
router.post('/:id/verify', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const uni = await University.findByPk(req.params.id);
    if (!uni) return res.status(404).json({ message: 'Not found' });
    uni.verified = true;
    await uni.save();
    await logAction(req, 'university.verify', 'university', uni.id, {});
    res.json({ message: 'Verified', uni });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/universities/:id
router.delete('/:id', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const uni = await University.findByPk(req.params.id);
    if (!uni) return res.status(404).json({ message: 'Not found' });
    await uni.destroy();
    await logAction(req, 'university.delete', 'university', req.params.id, {});
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
