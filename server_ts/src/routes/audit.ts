import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const items = await prisma.audit.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export default router;
