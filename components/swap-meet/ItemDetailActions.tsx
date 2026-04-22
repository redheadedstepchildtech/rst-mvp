import { Donation } from "@/types";

interface Props {
  item: Donation;
}

export default function ItemDetailActions({ item }: Props) {
  return (
    <div className="mt-6">
      <button className="bg-red-600 text-white px-6 py-3 rounded">
        Claim This Item
      </button>
    </div>
  );
}