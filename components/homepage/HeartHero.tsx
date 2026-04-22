import Link from "next/link";

export default function HeartHero() {
  return (
    <div className="w-full flex justify-center mt-10 mb-16">
      <div className="relative heart-container">

        {/* Heart Shape */}
        <svg
          viewBox="0 0 200 180"
          className="w-80 h-72 mx-auto"
        >
          <path
            d="M100 170 L20 90 A50 50 0 1 1 100 40 A50 50 0 1 1 180 90 Z"
            fill="white"
            stroke="#e63946"
            strokeWidth="4"
          />
        </svg>

        {/* Buttons inside the heart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">

          <div className="flex gap-4">
            <Link href="/swap-meet">
              <button className="heart-btn">Swap‑Meet</button>
            </Link>

            <Link href="/create-donation">
              <button className="heart-btn">Create Donation</button>
            </Link>
          </div>

          <Link href="/who-we-are">
            <button className="heart-btn mt-2">Who We Are</button>
          </Link>

        </div>
      </div>
    </div>
  );
}