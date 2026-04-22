import Image from "next/image";
import Link from "next/link";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
      <Image
        src={profile.photo}
        alt={profile.name}
        width={80}
        height={80}
        className="rounded-full object-cover"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600 text-sm">{profile.city}</p>
        <p className="text-gray-700 mt-1">{profile.tagline}</p>

        <div className="flex gap-3 mt-3">
          <Link
            href={`/p/${profile.username}`}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            View Profile
          </Link>

          <Link
            href={`/qr/${profile.username}`}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            QR Code
          </Link>
        </div>
      </div>
    </div>
  );
}