import Link from "next/link";

export default function PrintCardButton({ id }: { id: string }) {
  return (
    <div className="mt-6 flex justify-center">
      <Link
        href={`/card/${id}/business`}
        className="px-6 py-3 bg-black text-white rounded shadow hover:bg-gray-800"
      >
        Print Donation Card
      </Link>
    </div>
  );
}