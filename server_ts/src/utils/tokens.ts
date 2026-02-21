import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import prisma from '../prisma';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function signAccessToken(user: { id: number; email: string; role: string }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export async function createRefreshToken(userId: number) {
  const token = crypto.randomBytes(48).toString('hex');
  const tokenHash = await bcrypt.hash(token, 10);
  const record = await prisma.refreshToken.create({ data: { tokenHash, userId } });
  return { id: record.id, token };
}

export async function rotateRefreshToken(oldId: string, presentedToken: string) {
  const existing = await prisma.refreshToken.findUnique({ where: { id: oldId } });
  if (!existing || existing.revoked) return null;
  const ok = await bcrypt.compare(presentedToken, existing.tokenHash);
  if (!ok) return null;
  // revoke old
  await prisma.refreshToken.update({ where: { id: oldId }, data: { revoked: true } });
  // create new
  return createRefreshToken(existing.userId);
}

export async function revokeRefreshToken(id: string) {
  await prisma.refreshToken.update({ where: { id }, data: { revoked: true } });
}
