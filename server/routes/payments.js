const express = require('express');
const router = express.Router();
const { Payment } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { logAction } = require('../middleware/audit');
const { Op } = require('sequelize');

// GET /api/payments?status&userId&page&limit
router.get('/', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const { status, userId, page=1, limit=20 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;
    const rows = await Payment.findAndCountAll({
      where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']]
    });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/payments  create a payment record (server-side or webhook will update)
router.post('/', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const p = await Payment.create(req.body);
    await logAction(req, 'payment.create', 'payment', p.id, { amount: p.amount, currency: p.currency });
    res.status(201).json(p);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/payments/:id/verify  { providerTxnId, status }
router.post('/:id/verify', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const p = await Payment.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    p.provider = req.body.provider || p.provider;
    p.providerTxnId = req.body.providerTxnId || p.providerTxnId;
    p.status = req.body.status || 'confirmed';
    await p.save();
    await logAction(req, 'payment.verify', 'payment', p.id, { status: p.status });
    res.json({ message: 'Updated', p });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/payments/:id/refund { reason, amount }
router.post('/:id/refund', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const p = await Payment.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    // create a refund record or mark refunded
    p.status = 'refunded';
    p.meta = { ...p.meta, refund: { amount: req.body.amount || p.amount, reason: req.body.reason || '' } };
    await p.save();
    await logAction(req, 'payment.refund', 'payment', p.id, { refundAmount: req.body.amount || p.amount });
    res.json({ message: 'Refund processed', p });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/payments/reconcile  { start, end }  returns detailed rows or CSV if ?export=csv or body.export==='csv'
router.post('/reconcile', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const { start, end } = req.body || {};
    const exportType = (req.query.export || req.body.export || '').toLowerCase();
    const where = {};
    if (start) where.createdAt = { ...(where.createdAt||{}), [Op.gte]: new Date(start) };
    if (end) where.createdAt = { ...(where.createdAt||{}), [Op.lte]: new Date(end) };

    const rows = await Payment.findAll({ where, order: [['createdAt','DESC']] });
    const total = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

    await logAction(req, 'payment.reconcile', 'payment', null, { start, end, total, count: rows.length });

    if (exportType === 'csv') {
      // Prepare CSV rows
      const header = ['id','userId','applicationId','amount','currency','provider','providerTxnId','status','meta','createdAt'];
      const csvRows = rows.map(r => header.map(h => {
        let v = r[h];
        if (h === 'meta') v = JSON.stringify(r.meta || {});
        if (v === null || v === undefined) v = '';
        return `"${(`${v}`).replace(/"/g, '""')}"`;
      }).join(','));
      const csv = [header.join(','), ...csvRows].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="payments-reconcile-${Date.now()}.csv"`);
      return res.send(csv);
    }

    res.json({ total, count: rows.length, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
