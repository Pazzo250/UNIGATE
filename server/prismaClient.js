// Lightweight Prisma client wrapper for server usage
try {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  module.exports = prisma;
} catch (err) {
  // Prisma client may not be generated yet. Export a stub that errors on use.
  module.exports = {
    _throw() { throw new Error('Prisma client not available. Run `npm install` and `npm run prisma:generate`.'); }
  };
}
