import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import dotenv from 'dotenv';
import { signAccessToken, createRefreshToken, rotateRefreshToken, revokeRefreshToken } from '../utils/tokens';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash, name } });
  const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role });
  const refresh = await createRefreshToken(user.id);
  res.json({ token: accessToken, refresh, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
  const refresh = await createRefreshToken(user.id);
  res.json({ token, refresh, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

// Rotate refresh token: client sends { id, token }
router.post('/refresh', async (req, res) => {
  const { id, token } = req.body;
  if (!id || !token) return res.status(400).json({ error: 'id and token required' });
  const rotated = await rotateRefreshToken(id, token);
  if (!rotated) return res.status(401).json({ error: 'Invalid refresh token' });
  const rt = await prisma.refreshToken.findUnique({ where: { id: rotated.id } });
  const user = await prisma.user.findUnique({ where: { id: rt!.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const access = signAccessToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token: access, refresh: rotated });
});

router.post('/logout', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  await revokeRefreshToken(id).catch(() => {});
  res.json({ ok: true });
});

// Accept Google id_token from client and verify it
router.post('/google', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) return res.status(400).json({ error: 'id_token required' });
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return res.status(500).json({ error: 'Server missing GOOGLE_CLIENT_ID' });
  const client = new OAuth2Client(clientId);
  try {
    const ticket = await client.verifyIdToken({ idToken: id_token, audience: clientId });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).json({ error: 'Invalid id_token' });
    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({ data: { email: payload.email, name: payload.name || payload.email } });
    }
    const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
    const refresh = await createRefreshToken(user.id);
    res.json({ token, refresh, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('google verify failed', err);
    return res.status(400).json({ error: 'Invalid Google token' });
  }
});

export default router;
