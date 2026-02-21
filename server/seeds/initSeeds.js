const { RolePermission, University, Setting, User } = require('../models');

async function runSeeds() {
  try {
    // role permissions
    const perms = [
      { role: 'admin', permission: 'users.create' },
      { role: 'admin', permission: 'users.update' },
      { role: 'admin', permission: 'users.delete' },
      { role: 'admin', permission: 'cms.create' },
      { role: 'admin', permission: 'cms.update' },
      { role: 'admin', permission: 'cms.delete' },
      { role: 'admin', permission: 'payments.refund' },
      { role: 'admin', permission: 'payments.verify' },
      { role: 'university_admin', permission: 'applications.assign' },
      { role: 'staff', permission: 'applications.review' }
    ];
    for (const p of perms) {
      const exists = await RolePermission.findOne({ where: { role: p.role, permission: p.permission } });
      if (!exists) await RolePermission.create(p);
    }

    // sample universities (idempotent by name)
    const unis = [
      { name: 'University of Nairobi', country: 'Kenya', city: 'Nairobi', verified: true },
      { name: 'University of Cape Town', country: 'South Africa', city: 'Cape Town', verified: true },
      { name: 'Makerere University', country: 'Uganda', city: 'Kampala', verified: false }
    ];
    for (const u of unis) {
      const exists = await University.findOne({ where: { name: u.name } });
      if (!exists) await University.create(u);
    }

    // default settings (idempotent)
    const s = await Setting.findOne({ where: { key: 'site.title' } });
    if (!s) await Setting.create({ key: 'site.title', value: 'UNIGATE' });

    console.log('[SEEDS] initSeeds complete');
  } catch (err) {
    console.error('[SEEDS] initSeeds failed', err);
  }
}

module.exports = { runSeeds };
