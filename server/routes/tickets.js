const express = require('express');
const router = express.Router();
const { Ticket, User } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { logAction } = require('../middleware/audit');

// GET /api/tickets?status&assignedTo&page&limit
router.get('/', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const { status, assignedTo, page=1, limit=20 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;
    const rows = await Ticket.findAndCountAll({
      where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']]
    });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/tickets  create ticket
router.post('/', auth, async (req, res) => {
  try {
    const payload = { userId: req.user && req.user.id || null, subject: req.body.subject, messages: req.body.messages || [] };
    const t = await Ticket.create(payload);
    await logAction(req, 'ticket.create', 'ticket', t.id, { subject: t.subject });
    res.status(201).json(t);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /api/tickets/:id
router.get('/:id', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const t = await Ticket.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/tickets/:id/assign { assignedTo }
router.patch('/:id/assign', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const t = await Ticket.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    t.assignedTo = req.body.assignedTo;
    await t.save();
    await logAction(req, 'ticket.assign', 'ticket', t.id, { assignedTo: t.assignedTo });
    res.json({ message: 'Assigned', t });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/tickets/:id/message { from, text }
router.patch('/:id/message', auth, async (req, res) => {
  try {
    const t = await Ticket.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    const msg = { from: req.user ? req.user.email : 'anonymous', text: req.body.text, ts: new Date() };
    const msgs = t.messages || [];
    msgs.push(msg);
    t.messages = msgs;
    t.status = req.body.status || t.status;
    await t.save();
    await logAction(req, 'ticket.message', 'ticket', t.id, { from: msg.from });
    res.json({ message: 'Message added', t });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/tickets/:id/resolve
router.patch('/:id/resolve', auth, requireRole('super_admin','admin','staff'), async (req, res) => {
  try {
    const t = await Ticket.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    t.status = 'resolved';
    await t.save();
    await logAction(req, 'ticket.resolve', 'ticket', t.id, {});
    res.json({ message: 'Resolved', t });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/tickets/:id
router.delete('/:id', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const t = await Ticket.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    await t.destroy();
    await logAction(req, 'ticket.delete', 'ticket', req.params.id, {});
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
