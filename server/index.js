require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const unisRoutes = require('./routes/universities');
const appsRoutes = require('./routes/applications');
const paymentsRoutes = require('./routes/payments');
const ticketsRoutes = require('./routes/tickets');
const auditRoutes = require('./routes/audit');
const cmsRoutes = require('./routes/cms');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const logsRoutes = require('./routes/logs');
const rolePermissionsRoutes = require('./routes/role_permissions'); // NEW

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Serve frontend static files (project root)
app.use(express.static(path.join(__dirname, '..')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/universities', unisRoutes);
app.use('/api/applications', appsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/role-permissions', rolePermissionsRoutes); // NEW

// health
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ message: 'Server error' });
});

// start server after syncing DB
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.sync({ alter: true }); // create tables (empty DB)
    console.log('DB synced');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
})();
