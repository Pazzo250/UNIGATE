const express = require('express');
const router = express.Router();
const { Audit } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { Op } = require('sequelize');

/**
 * GET /api/audit
 * Query: actorEmail, action, targetType, page, limit, start, end, export=csv
 */
router.get('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const { actorEmail, action, targetType, page = 1, limit = 50, start, end, export: exportType } = req.query;
    const where = {};
    if (actorEmail) where.actorEmail = { [Op.like]: `%${actorEmail}%` };
    if (action) where.action = action;
    if (targetType) where.targetType = targetType;
    if (start || end) {
      where.createdAt = {};
      if (start) where.createdAt[Op.gte] = new Date(start);
      if (end) where.createdAt[Op.lte] = new Date(end);
    }

    const rows = await Audit.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit)
    });

    // CSV export
    if (exportType === 'csv') {
      const items = rows.rows.map(r => ({
        id: r.id,
        actorId: r.actorId || '',
        actorEmail: r.actorEmail || '',
        action: r.action,
        targetType: r.targetType || '',
        targetId: r.targetId || '',
        details: JSON.stringify(r.details || {}),
        createdAt: r.createdAt
      }));

      const header = ['id','actorId','actorEmail','action','targetType','targetId','details','createdAt'];
      const csv = [
        header.join(','),
        ...items.map(it => header.map(h => {
          const v = it[h] === null || it[h] === undefined ? '' : `${it[h]}`.replace(/"/g, '""');
          return `"${v}"`;
        }).join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="audit-${Date.now()}.csv"`);
      return res.send(csv);
    }

    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) {
    console.error('audit list error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
