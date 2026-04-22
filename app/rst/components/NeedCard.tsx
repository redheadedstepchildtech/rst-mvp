type Appraisal = {
  low: number;
  high: number;
  quickSale: number;
};

type Need = {
  id: string;
  title: string;
  needType: string;
  amount: string | null;
  category: string | null;
  photoFileName: string | null;
  premium: boolean;
  wantsBoost: boolean;
  aiListing?: string | null;
  appraisal?: Appraisal | null;
};

type Props = {
  need: Need;
};

export default function NeedCard({ need }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white relative">
      {/* Badges row */}
      <div className="flex items-center mb-2 gap-2">
        {need.premium && (
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Premium
          </span>
        )}

        {need.wantsBoost && (
          <span className="inline-block bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Boosted
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">{need.title}</h2>

      {/* Category */}
      {need.category && (
        <p className="text-xs text-gray-500 mb-2">
          Category: {need.category}
        </p>
      )}

      {/* Price for selling needs */}
      {need.needType === "selling" && need.amount && (
        <p className="text-sm text-gray-800 mb-2">${need.amount}</p>
      )}

      {/* Optional AI listing preview */}
      {need.aiListing && (
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {need.aiListing}
        </p>
      )}
    </div>
  );
}