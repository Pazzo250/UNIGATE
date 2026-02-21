const express = require('express');
const router = express.Router();
const { CMS } = require('../models');
const auth = require('../middleware/auth');
const { requireRole, requirePermission } = require('../middleware/rbac');
const { Op } = require('sequelize');
const { logAction } = require('../middleware/audit');

// GET /api/cms?q=&type=&status=&page=&limit=
router.get('/', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const { q, type, status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (q) where.title = { [Op.like]: `%${q}%` };
    const rows = await CMS.findAndCountAll({ where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']] });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/cms  create (permissioned)
router.post('/', auth, requirePermission('cms.create'), async (req, res) => {
  try {
    const c = await CMS.create(req.body);
    await logAction(req, 'cms.create', 'cms', c.id, { title: c.title, type: c.type });
    res.status(201).json(c);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/cms/:id update
router.put('/:id', auth, requirePermission('cms.update'), async (req, res) => {
  try {
    const c = await CMS.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    await c.update(req.body);
    await logAction(req, 'cms.update', 'cms', c.id, { changes: req.body });
    res.json(c);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/cms/:id
router.delete('/:id', auth, requirePermission('cms.delete'), async (req, res) => {
  try {
    const c = await CMS.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    await c.destroy();
    await logAction(req, 'cms.delete', 'cms', req.params.id, {});
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
