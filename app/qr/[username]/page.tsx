import QRCode from "qrcode";
import Image from "next/image";

export default async function QRPage({ params }) {
  const { username } = params;

  // This is the URL the QR code will point to
  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/p/${username}`;

  // Generate QR code as a data URL
  const qrDataUrl = await QRCode.toDataURL(profileUrl);

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4">QR Code for {username}</h1>

      <div className="bg-white shadow p-6 rounded-lg inline-block">
        <Image
          src={qrDataUrl}
          alt="QR Code"
          width={250}
          height={250}
          className="mx-auto"
        />
      </div>

      <p className="mt-6 text-gray-700">
        Scan this code to view the profile page.
      </p>

      <a
        href={`/p/${username}`}
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        View Profile
      </a>
    </div>
  );
}