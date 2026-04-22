import Link from "next/link";
import { Donation } from "@/types";

interface Props {
  item: Donation;
}

export default function SwapMeetCard({ item }: Props) {
  const thumbnail = item.photos?.[0]?.url;

  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={item.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="font-semibold text-lg">{item.title}</h3>
      <p className="text-sm text-gray-600 capitalize">{item.category}</p>

      <Link href={`/swap-meet/${item.id}`}>
        <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
          View Item
        </button>
      </Link>
    </div>
  );
}