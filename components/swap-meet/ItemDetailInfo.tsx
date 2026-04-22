import { Donation } from "@/types";

interface Props {
  item: Donation;
}

export default function ItemDetailInfo({ item }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-gray-600 capitalize mb-2">{item.category}</p>

      <p className="mb-4">{item.description}</p>

      <p className="text-xs text-gray-500">
        Posted on {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}