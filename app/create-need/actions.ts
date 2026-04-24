'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createNeed(formData: FormData) {
  const title = formData.get('title') as string | null;
  const category = formData.get('category') as string | null;
  const story = formData.get('story') as string | null;
  const photos = formData.getAll('photos') as File[];
  const nonprofitName = formData.get('nonprofitName') as string | null;
  const ein = formData.get('ein') as string | null;

  if (!title) {
    throw new Error("Missing required fields");
  }

  // Upload photos
  const uploadedUrls: string[] = [];

  for (const photo of photos) {
    if (photo.size > 0) {
      const uploadForm = new FormData();
      uploadForm.append('file', photo);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
        method: 'POST',
        body: uploadForm,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
      }
    }
  }

  // Create Need in DB
  await prisma.need.create({
    data: {
      title,
      category,
      story,
      photoUrls: uploadedUrls,
      nonprofitName,
      ein,
      userId: 'dev-user',
    },
  });

  redirect('/dashboard?created=1');
}