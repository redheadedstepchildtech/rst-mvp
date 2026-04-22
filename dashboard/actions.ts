'use server';

import { prisma } from '@/lib/prisma';

export async function addBoost(needId: string) {
  await prisma.boost.create({
    data: {
      needId,
      userId: 'dev-user', // temporary
    },
  });
}