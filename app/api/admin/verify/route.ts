import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

<Link href="/admin" className="text-sm text-blue-600 hover:underline">
  Admin Panel
</Link>

export async function POST(req: Request) {
  const form = await req.formData();
  const needId = form.get('needId') as string;

  await prisma.need.update({
    where: { id: needId },
    data: { verified: true },
  });

  return NextResponse.redirect('/admin');
}