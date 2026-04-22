import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="w-full bg-white shadow-sm mb-6">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        
        {/* Left side: Logo or Name */}
        <Link href="/">
          <span className="font-bold text-lg cursor-pointer">
            RST
          </span>
        </Link>

<Link href="/admin/boost-history">Boost History</Link>

        {/* Right side: Navigation Links */}
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/create-donation">Create Donation</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/offer-help">Offer Help</Link>
          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}