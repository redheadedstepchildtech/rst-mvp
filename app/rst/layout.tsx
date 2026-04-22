import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function RstLayout({ children }) {
  // ⭐ Hardcoded user until auth is ready
  const userId = 1;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { boostCredits: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ⭐ NAVBAR */}
      <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/rst/needs" className="text-lg font-semibold">
            RST Marketplace
          </Link>

          <Link href="/rst/create" className="text-blue-600 hover:underline">
            Post a Need
          </Link>

          <Link href="/rst/helpers/join" className="text-blue-600 hover:underline">
            Get Text Alerts
          </Link>
        </div>

        {/* ⭐ Boost Credits Badge */}
        {user && (
          <div className="text-sm">
            <span className="inline-block bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-medium">

{user.boostCredits <= 1 && (
  <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium ml-3">
    Low credits — consider topping up
  </span>
)}
              Boost credits: {user.boostCredits}
            </span>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>
    </div>
  );
}