import prisma from '../prisma';

export async function logAction(actor: string, action: string, details?: string) {
  try {
    await prisma.audit.create({ data: { actor, action, details } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to write audit:', err);
  }
}
