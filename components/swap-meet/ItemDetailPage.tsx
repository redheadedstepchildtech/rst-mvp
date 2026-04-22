import { useEffect, useState } from "react";
import { Donation } from "@/types";
import ItemDetailPhotos from "./ItemDetailPhotos";
import ItemDetailInfo from "./ItemDetailInfo";
import ItemDetailActions from "./ItemDetailActions";

interface Props {
  id: string;
}

export default function ItemDetailPage({ id }: Props) {
  const [item, setItem] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/donations`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((d: Donation) => d.id === id);
        setItem(found || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="item-detail-container">
      <ItemDetailPhotos photos={item.photos} />
      <ItemDetailInfo item={item} />
      <ItemDetailActions item={item} />
    </div>
  );
}