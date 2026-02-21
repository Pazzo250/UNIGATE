const { RolePermission } = require('../models');

/**
 * requireRole(...allowedRoles) - existing allowlist middleware
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user && req.user.role;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}

/**
 * requirePermission(permission) - checks role_permissions table for permission OR super_admin
 */
function requirePermission(permission) {
  return async (req, res, next) => {
    try {
      const role = req.user && req.user.role;
      if (!role) return res.status(403).json({ message: 'Forbidden' });
      if (role === 'super_admin') return next();
      const found = await RolePermission.findOne({ where: { role, permission } });
      if (found) return next();
      return res.status(403).json({ message: 'Forbidden: missing permission' });
    } catch (err) {
      console.error('rbac requirePermission error', err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

module.exports = { requireRole, requirePermission };
