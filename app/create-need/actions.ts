'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createNeed(formData: FormData) {
  const title = formData.get('title') as string | null;
  const category = formData.get('category') as string | null;
  const story = formData.get('story') as string | null;
  const photos = formData.getAll('photos') as File[];

  // ✅ required fields
  if (!title || !category) {
    throw new Error("Missing required fields: title and category are required.");
  }

  // ✅ upload photos
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

  // ✅ create Need
  const need = await prisma.need.create({
    data: {
      title,
      category,
      description: story || null,
      photoUrl: uploadedUrls[0] || null, // main photo
      userId: 'dev-user', // placeholder for now
    },
  });

  // ✅ create Photo records
  if (uploadedUrls.length > 0) {
    await prisma.photo.createMany({
      data: uploadedUrls.map((url) => ({
        url,
        needId: need.id,
      })),
    });
  }

  redirect('/dashboard?created=1');
}