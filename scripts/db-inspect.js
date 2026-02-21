// db-inspect.js - use server models to inspect seeded data
const path = require('path');
(async () => {
  try {
    const models = require(path.join(__dirname, '..', 'server', 'models'));
    const { User, University, RolePermission, sequelize } = models;
    await sequelize.authenticate();
    const userCount = await User.count();
    const uniCount = await University.count();
    const rpCount = await RolePermission.count();
    console.log('DB counts -> users:', userCount, 'universities:', uniCount, 'role_permissions:', rpCount);
    process.exit(0);
  } catch (err) {
    console.error('db-inspect error', err);
    process.exit(2);
  }
})();
