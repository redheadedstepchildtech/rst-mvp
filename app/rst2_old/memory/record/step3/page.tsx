"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Step3() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const text = searchParams.get("text") || "";

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!title || !text) {
      router.push("/rst2/memory/record/step1");
    }
  }, [title, text, router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

const handleNext = async () => {
  let photoURL = "";

  if (photo) {
    const formData = new FormData();
    formData.append("file", photo);

    const res = await fetch("/api/upload/photo", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    photoURL = data.url;
  }

  router.push(
    `/rst2/memory/record/step4?title=${encodeURIComponent(
      title
    )}&text=${encodeURIComponent(text)}${
      photoURL ? `&photo=${encodeURIComponent(photoURL)}` : ""
    }`
  );
};

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Add a Photo (Optional)
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        A photo can help bring your memory to life, but you can skip this step if you prefer.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="mb-6"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full rounded-lg border mb-6 shadow"
        />
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={() =>
            router.push(
              `/rst2/memory/record/step2?title=${encodeURIComponent(
                title
              )}&text=${encodeURIComponent(text)}`
            )
          }
          className="px-4 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Skip
        </button>

        <button
          const handleNext = async () => {
  let photoURL = "";

  if (photo) {
    const formData = new FormData();
    formData.append("file", photo);

    const res = await fetch("/api/upload/photo", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    photoURL = data.url;
  }

  router.push(
    `/rst2/memory/record/step4?title=${encodeURIComponent(
      title
    )}&text=${encodeURIComponent(text)}${
      photoURL ? `&photo=${encodeURIComponent(photoURL)}` : ""
    }`
  );
};
        >
          Next →
        </button>
      </div>
    </div>
  );
}