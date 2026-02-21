import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } });
  res.json(users);
});

router.get('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
