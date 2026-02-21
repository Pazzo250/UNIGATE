const express = require('express');
const router = express.Router();
const { RolePermission } = require('../models');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { logAction } = require('../middleware/audit');
const { Op } = require('sequelize');

// GET /api/role-permissions?role=&permission=&page=&limit=
router.get('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const { role, permission, page = 1, limit = 50 } = req.query;
    const where = {};
    if (role) where.role = role;
    if (permission) where.permission = { [Op.like]: `%${permission}%` };
    const rows = await RolePermission.findAndCountAll({
      where, limit: Number(limit), offset: (Number(page)-1)*Number(limit), order: [['createdAt','DESC']]
    });
    res.json({ total: rows.count, rows: rows.rows });
  } catch (err) { console.error('role-permissions list', err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/role-permissions  { role, permission }
router.post('/', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const { role, permission } = req.body || {};
    if (!role || !permission) return res.status(400).json({ message: 'role and permission required' });
    const exists = await RolePermission.findOne({ where: { role, permission } });
    if (exists) return res.status(409).json({ message: 'Permission exists for role' });
    const rp = await RolePermission.create({ role, permission });
    await logAction(req, 'role_permission.create', 'role_permission', rp.id, { role, permission });
    res.status(201).json(rp);
  } catch (err) { console.error('role-permissions create', err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/role-permissions/:id
router.delete('/:id', auth, requireRole('super_admin','admin'), async (req, res) => {
  try {
    const rp = await RolePermission.findByPk(req.params.id);
    if (!rp) return res.status(404).json({ message: 'Not found' });
    await rp.destroy();
    await logAction(req, 'role_permission.delete', 'role_permission', req.params.id, { role: rp.role, permission: rp.permission });
    res.json({ message: 'Deleted' });
  } catch (err) { console.error('role-permissions delete', err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/role-permissions/seed   seeds common permissions (idempotent)
router.post('/seed', auth, requireRole('super_admin'), async (req, res) => {
  try {
    const seed = [
      // users
      { role: 'admin', permission: 'users.create' }, { role: 'admin', permission: 'users.update' }, { role: 'admin', permission: 'users.delete' },
      // cms
      { role: 'admin', permission: 'cms.create' }, { role: 'admin', permission: 'cms.update' }, { role: 'admin', permission: 'cms.delete' },
      // payments
      { role: 'admin', permission: 'payments.refund' }, { role: 'admin', permission: 'payments.verify' },
      // applications
      { role: 'university_admin', permission: 'applications.assign' }, { role: 'staff', permission: 'applications.review' }
    ];
    const created = [];
    for (const s of seed) {
      const exists = await RolePermission.findOne({ where: { role: s.role, permission: s.permission } });
      if (!exists) {
        const rp = await RolePermission.create(s);
        created.push(rp);
      }
    }
    await logAction(req, 'role_permission.seed', 'role_permission', null, { created: created.length });
    res.json({ message: 'Seed complete', created: created.length });
  } catch (err) { console.error('role-permissions seed', err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
