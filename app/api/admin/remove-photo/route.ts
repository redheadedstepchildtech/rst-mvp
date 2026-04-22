import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const photoUrl = form.get('photoUrl') as string;
  const reportId = form.get('reportId') as string;

  // Remove from Need.photos
  await prisma.need.updateMany({
    where: { photos: { has: photoUrl } },
    data: {
      photos: {
        set: [],
      },
    },
  });

  // Delete the report entry
  await prisma.reportedPhoto.delete({
    where: { id: reportId },
  });

  return NextResponse.redirect('/admin');
}