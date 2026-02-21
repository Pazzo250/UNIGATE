import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';
import { logAction } from '../utils/audit';

const router = express.Router();

router.post('/', requireAuth, async (req: any, res) => {
  const { universityId, program } = req.body;
  if (!universityId || !program) return res.status(400).json({ error: 'universityId and program required' });
  const app = await prisma.application.create({ data: { universityId: Number(universityId), program, applicantId: req.user.sub } });
  await logAction(req.user.email || 'unknown', 'create_application', `application:${app.id}`);
  res.json(app);
});

router.get('/', requireAuth, async (req: any, res) => {
  const items = await prisma.application.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

router.get('/:id', requireAuth, async (req: any, res) => {
  const id = Number(req.params.id);
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) return res.status(404).json({ error: 'Not found' });
  res.json(app);
});

router.put('/:id', requireAuth, async (req: any, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  const updated = await prisma.application.update({ where: { id }, data });
  await logAction(req.user.email || 'unknown', 'update_application', `application:${id}`);
  res.json(updated);
});

export default router;
