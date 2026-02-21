import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';
import { logAction } from '../utils/audit';

const router = express.Router();

router.post('/', requireAuth, async (req: any, res) => {
  const { applicationId, amount, providerId } = req.body;
  if (!amount) return res.status(400).json({ error: 'amount required' });
  const p = await prisma.payment.create({ data: { application: applicationId ? Number(applicationId) : null, amount: Number(amount), providerId } });
  await logAction(req.user.email || 'unknown', 'create_payment', `payment:${p.id}`);
  res.json(p);
});

router.get('/', requireAuth, async (req, res) => {
  const items = await prisma.payment.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export default router;
