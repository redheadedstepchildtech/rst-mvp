"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Step5() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const text = searchParams.get("text") || "";
  const photo = searchParams.get("photo") || "";
  const audio = searchParams.get("audio") || "";

  const handleSave = () => {
    const params = new URLSearchParams({
      title,
      text,
    });

    if (photo) params.append("photo", photo);
    if (audio) params.append("audio", audio);

    router.push(`/rst2/memory/record/save?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Preview Your Memory
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>

        <p className="text-lg whitespace-pre-line mb-6">{text}</p>

        {photo && (
          <img
            src={photo}
            alt="Memory photo"
            className="w-full rounded-lg border mb-6"
          />
        )}

        {audio && (
          <audio controls className="w-full mb-6">
            <source src={audio} type="audio/mpeg" />
          </audio>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() =>
            router.push(
              `/rst2/memory/record/step4?title=${encodeURIComponent(
                title
              )}&text=${encodeURIComponent(text)}${
                photo ? `&photo=${photo}` : ""
              }${audio ? `&audio=${audio}` : ""}`
            )
          }
          className="px-4 py-3 text-lg rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 text-lg rounded-lg text-white bg-green-600 hover:bg-green-700"
        >
          Save Memory
        </button>
      </div>
    </div>
  );
}