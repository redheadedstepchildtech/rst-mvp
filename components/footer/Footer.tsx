import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-12">
      <div className="max-w-4xl mx-auto p-6 text-center text-sm text-gray-600">

        {/* Main Links */}
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/offer-help">Offer Help</Link>
          <Link href="/create-donation">Create Donation</Link>
        </div>

        {/* Tagline */}
        <p className="mb-2">
          People helping people, with dignity.
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Redheaded Stepchild Tech
        </p>
      </div>
    </footer>
  );
}