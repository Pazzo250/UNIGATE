const express = require('express');
const router = express.Router();
const { SysLog } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { Op } = require('sequelize');

// GET /api/logs?level=&source=&page=&limit=
router.get('/', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const { level, source, page = 1, limit = 50 } = req.query;
    const where = {};
    if (level) where.level = level;
    if (source) where.source = { [Op.like]: `%${source}%` };
    const rows = await SysLog.findAndCountAll({ where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']] });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/logs  create log (internal services may call)
router.post('/', async (req, res) => {
  try {
    const { level='info', source='', message='', metadata={} } = req.body;
    const l = await SysLog.create({ level, source, message, metadata });
    res.status(201).json(l);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
