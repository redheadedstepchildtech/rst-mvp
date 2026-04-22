"use client";

const [uploadedAudioURL, setUploadedAudioURL] = useState<string | null>(null);
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Step4() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const text = searchParams.get("text") || "";
  const photo = searchParams.get("photo") || "";

  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!title || !text) {
      router.push("/rst2/memory/record/step1");
    }
  }, [title, text, router]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
  const blob = new Blob(chunksRef.current, { type: "audio/mpeg" });
  const file = new File([blob], `recording-${Date.now()}.mp3`, {
    type: "audio/mpeg",
  });

  // Show preview
  const url = URL.createObjectURL(blob);
  setAudioURL(url);

  // Upload immediately
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload/audio", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  // Save the real uploaded URL
  setAudioFile(file);
  setUploadedAudioURL(data.url);
};

    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
  const params = new URLSearchParams({
    title,
    text,
  });

  if (photo) params.append("photo", photo);
  if (uploadedAudioURL) params.append("audio", uploadedAudioURL);

  router.push(`/rst2/memory/record/step5?${params.toString()}`);
};

    const data = await res.json();
    audioURL = data.url;
  }

  const params = new URLSearchParams({
    title,
    text,
  });

  if (photo) params.append("photo", photo);
  if (audioURL) params.append("audio", audioURL);

  router.push(`/rst2/memory/record/step5?${params.toString()}`);
};

  const handleSkip = () => {
    router.push(
      `/rst2/memory/record/step5?title=${encodeURIComponent(
        title
      )}&text=${encodeURIComponent(text)}${photo ? `&photo=${photo}` : ""}`
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Add Your Voice (Optional)
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        You can record your voice or upload an audio file.  
        If you'd rather skip this step, that's perfectly fine.
      </p>

      <div className="flex flex-col items-center gap-4 mb-6">
        <button
          onClick={startRecording}
          className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          className="px-6 py-3 text-lg bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Stop Recording
        </button>

        <input
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          className="mt-4"
        />
      </div>

      {audioURL && (
        <audio controls className="w-full mb-6">
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={() =>
            router.push(
              `/rst2/memory/record/step3?title=${encodeURIComponent(
                title
              )}&text=${encodeURIComponent(text)}${
                photo ? `&photo=${photo}` : ""
              }`
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
          onClick={handleNext}
          disabled={!audioFile}
          className={`px-6 py-3 text-lg rounded-lg text-white ${
            audioFile
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}