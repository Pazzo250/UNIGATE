import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await prisma.university.findMany({ orderBy: { name: 'asc' } });
  res.json(items);
});

router.post('/', requireAuth, async (req, res) => {
  const { name, slug } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'name and slug required' });
  const u = await prisma.university.create({ data: { name, slug } });
  res.json(u);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const u = await prisma.university.findUnique({ where: { id } });
  if (!u) return res.status(404).json({ error: 'Not found' });
  res.json(u);
});

router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { name, slug } = req.body;
  const u = await prisma.university.update({ where: { id }, data: { name, slug } });
  res.json(u);
});

export default router;
