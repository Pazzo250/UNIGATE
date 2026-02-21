const express = require('express');
const router = express.Router();
const { Application, User, University } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { Op } = require('sequelize');
const { logAction } = require('../middleware/audit');

// GET /api/applications?status&uni&program&q&page&limit&sort
router.get('/', auth, requireRole('super_admin','admin','university_admin','staff'), async (req, res) => {
  try {
    const { status, uni, program, q, page=1, limit=20, sort='createdAt:desc'} = req.query;
    const where = {};
    if (status) where.status = status;
    if (uni) where.universityId = uni;
    if (program) where.program = program;
    if (q) where.program = { [Op.like]: `%${q}%` };
    const [sBy, sDir] = sort.split(':');
    const rows = await Application.findAndCountAll({
      where,
      order: [[sBy || 'createdAt', (sDir||'desc').toUpperCase()]],
      limit: Number(limit), offset: (Number(page)-1)*Number(limit)
    });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /api/applications/:id
router.get('/:id', auth, requireRole('super_admin','admin','university_admin','staff'), async (req, res) => {
  try {
    const app = await Application.findByPk(req.params.id, { include: [{ model: User }, { model: University }] });
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json(app);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/applications/:id/status  { status }
router.patch('/:id/status', auth, requireRole('super_admin','admin','university_admin','staff'), async (req, res) => {
  try {
    const app = await Application.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    const old = app.status;
    app.status = req.body.status || app.status;
    await app.save();
    await logAction(req, 'application.status_change', 'application', app.id, { from: old, to: app.status });
    res.json({ message: 'Status updated', app });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/applications/:id/assign  { reviewerId }
router.post('/:id/assign', auth, requireRole('super_admin','admin','university_admin'), async (req, res) => {
  try {
    const app = await Application.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    app.assignedReviewer = req.body.reviewerId;
    await app.save();
    await logAction(req, 'application.assign_reviewer', 'application', app.id, { reviewer: req.body.reviewerId });
    res.json({ message: 'Reviewer assigned', app });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/applications/:id/document-verify  { docId, result }
router.post('/:id/document-verify', auth, requireRole('super_admin','admin','university_admin','staff'), async (req, res) => {
  try {
    const { docId, result } = req.body;
    const app = await Application.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    const docs = app.documents || [];
    const idx = docs.findIndex(d => d.id === docId);
    if (idx >= 0) docs[idx].verified = !!result;
    await app.update({ documents: docs });
    await logAction(req, 'application.document_verify', 'application', app.id, { docId, result });
    res.json({ message: 'Document verification updated', docs });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/applications/:id/fraud-flag  { flag }
router.post('/:id/fraud-flag', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const app = await Application.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    app.fraudFlag = !!req.body.flag;
    await app.save();
    await logAction(req, 'application.fraud_flag', 'application', app.id, { flag: app.fraudFlag });
    res.json({ message: 'Fraud flag updated', app });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
