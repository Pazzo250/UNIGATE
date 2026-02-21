import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';
import { logAction } from '../utils/audit';

const router = express.Router();

router.post('/', requireAuth, async (req: any, res) => {
  const { subject, body } = req.body;
  if (!subject || !body) return res.status(400).json({ error: 'subject and body required' });
  const t = await prisma.ticket.create({ data: { userId: req.user.sub, subject, body } });
  await logAction(req.user.email || 'unknown', 'create_ticket', `ticket:${t.id}`);
  res.json(t);
});

router.get('/', requireAuth, async (req, res) => {
  const items = await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

router.put('/:id', requireAuth, async (req: any, res) => {
  const id = Number(req.params.id);
  const t = await prisma.ticket.update({ where: { id }, data: req.body });
  await logAction(req.user.email || 'unknown', 'update_ticket', `ticket:${id}`);
  res.json(t);
});

export default router;
