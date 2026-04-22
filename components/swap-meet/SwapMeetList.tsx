import SwapMeetCard from "./SwapMeetCard";
import { Donation } from "@/types";

interface Props {
  items: Donation[];
}

export default function SwapMeetList({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {items.map((item) => (
        <SwapMeetCard key={item.id} item={item} />
      ))}
    </div>
  );
}