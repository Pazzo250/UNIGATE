const sequelize = require('../config/database');
const User = require('./user');
const University = require('./university');
const Application = require('./application');
const Audit = require('./audit');
const Payment = require('./payment');
const Ticket = require('./ticket');
const RolePermission = require('./role_permission');
const CMS = require('./cms');
const SysLog = require('./log');
const Setting = require('./setting');

// initialize models with sequelize instance
User.initModel(sequelize);
University.initModel(sequelize);
Application.initModel(sequelize);
Audit.initModel(sequelize);
Payment.initModel(sequelize);
Ticket.initModel(sequelize);
RolePermission.initModel(sequelize);
CMS.initModel(sequelize);
SysLog.initModel(sequelize);
Setting.initModel(sequelize);

// Associations
User.hasMany(Application, { foreignKey: 'applicantId' });
Application.belongsTo(User, { foreignKey: 'applicantId' });

University.hasMany(Application, { foreignKey: 'universityId' });
Application.belongsTo(University, { foreignKey: 'universityId' });

// payments & tickets associations
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

Application.hasMany(Payment, { foreignKey: 'applicationId' });
Payment.belongsTo(Application, { foreignKey: 'applicationId' });

User.hasMany(Ticket, { foreignKey: 'userId' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Ticket, { foreignKey: 'assignedTo', as: 'assignedTickets' });

module.exports = {
  sequelize,
  User,
  University,
  Application,
  Audit,
  Payment,
  Ticket,
  RolePermission,
  CMS,
  SysLog,
  Setting
};
