const { Audit } = require('../models');

/**
 * logAction(req, action, targetType, targetId, details)
 * - req: request (used to get actor info)
 * - action: string like 'users.create'
 */
async function logAction(req, action, targetType = null, targetId = null, details = {}) {
  try {
    const actorId = req && req.user ? req.user.id : null;
    const actorEmail = req && req.user ? req.user.email : null;
    await Audit.create({
      actorId,
      actorEmail,
      action,
      targetType,
      targetId,
      details
    });
  } catch (err) {
    console.error('audit log failed', err);
  }
}

module.exports = { logAction };
