import Image from "next/image";
import Link from "next/link";
import ProfileCard from "../components/ProfileCard";

export default function ProfilesPage() {
  const profiles = [
    {
      id: 1,
      name: "Sarah M.",
      city: "Helena, MT",
      tagline: "Trying to get back on my feet.",
      photo: "/placeholder-profile.jpg",
      username: "sarahm",
    },
    {
      id: 2,
      name: "James R.",
      city: "East Helena, MT",
      tagline: "Working hard to rebuild.",
      photo: "/placeholder-profile.jpg",
      username: "jamesr",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Community Profiles
      </h1>

      <div className="space-y-4">
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}
      </div>
    </div>
  );
}          >
            <Image
              src={p.photo}
              alt={p.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-600 text-sm">{p.city}</p>
              <p className="text-gray-700 mt-1">{p.tagline}</p>

              <div className="flex gap-3 mt-3">
                <Link
                  href={`/p/${p.username}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  View Profile
                </Link>

                <Link
                  href={`/qr/${p.username}`}
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                >
                  QR Code
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}