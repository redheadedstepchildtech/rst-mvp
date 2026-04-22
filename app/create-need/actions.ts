'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createNeed(formData: FormData) {
  const title = formData.get('title') as string;
  const needType = formData.get('needType') as string;
  const amount = formData.get('amount') as string | null;
  const category = formData.get('category') as string | null;
  const story = formData.get('story') as string | null;
  const photos = formData.getAll('photos') as File[];
  const nonprofitName = formData.get('nonprofitName') as string | null;
  const ein = formData.get('ein') as string | null;

const uploadedUrls: string[] = [];

for (const photo of photos) {
  if (photo.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append('file', photo);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: 'POST',
      body: uploadForm,
    });

    const data = await res.json();
    uploadedUrls.push(data.url);
  }
}

  if (!title || !needType) {
    throw new Error("Missing required fields");
  }

const photos = formData.getAll('photos') as File[];

const uploadedUrls: string[] = [];

for (const photo of photos) {
  if (photo.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append('file', photo);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: 'POST',
      body: uploadForm,
    });

    const data = await res.json();
    uploadedUrls.push(data.url);
  }
}

  await prisma.need.create({
    data: {
      title,
      needType,
      amount,
      category,
      story,
      photos: uploadedUrls,
      userId: 'dev-user',
    },
  });

  redirect('/dashboard?created=1');
}