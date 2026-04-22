import Link from "next/link";

export default function NavMenu() {
  return (
    <nav className="border-b mb-6 pb-3">
      <ul className="flex gap-6 text-lg">
        <li>
          <Link href="/rst2" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
<li>
  <Link href="/rst2/categories" className="hover:underline">
    Categories
  </Link>
</li>

<li>
  <Link href="/rst2/tags" className="hover:underline">
    Tags
  </Link>
</li>
          <Link href="/rst2/stories" className="hover:underline">
            Stories
          </Link>
        </li>
        <li>
          <Link href="/rst2/forms" className="hover:underline">
            Forms
          </Link>
        </li>
        <li>
          <Link href="/rst2/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/swapmeet" className="hover:underline">
            Swap‑Meet
          </Link>
        </li>
      </ul>
    </nav>
  );
}