const express = require('express');
const router = express.Router();
const { User, University, Application, Payment } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { Op, fn, col } = require('sequelize');

// GET /api/analytics/overview?days=30
router.get('/overview', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const days = Number(req.query.days || 30);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const [usersCount, unisCount, appsCount, revenueRow] = await Promise.all([
      User.count(),
      University.count(),
      Application.count(),
      Payment.findOne({ where: { createdAt: { [Op.gte]: since }, status: 'confirmed' }, attributes: [[fn('SUM', col('amount')), 'total']] })
    ]);
    const revenue = revenueRow && revenueRow.dataValues && Number(revenueRow.dataValues.total || 0) || 0;

    // top universities by application count
    const topUnis = await Application.findAll({
      attributes: ['universityId', [fn('COUNT', col('id')), 'apps']],
      group: ['universityId'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      limit: 10
    });

    res.json({
      users: usersCount,
      universities: unisCount,
      applications: appsCount,
      revenue,
      topUniversities: topUnis.map(r => ({ universityId: r.universityId, apps: r.dataValues.apps }))
    });
  } catch (err) {
    console.error('analytics error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
