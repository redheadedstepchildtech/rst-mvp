export default function Nav() {
  return (
    <nav className="w-full bg-gray-100 border-b p-4">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">

        <a
          href="/rst2"
          className="px-4 py-2 bg-white border rounded-lg font-semibold hover:bg-gray-200"
        >
          Home
        </a>

        <a
          href="/rst2/forms"
          className="px-4 py-2 bg-white border rounded-lg font-semibold hover:bg-gray-200"
        >
          Form Filler Outer
        </a>

        <a
          href="/rst2/forms/all"
          className="px-4 py-2 bg-white border rounded-lg font-semibold hover:bg-gray-200"
        >
          All Forms
        </a>

        <a
          href="/rst2/stories"
          className="px-4 py-2 bg-white border rounded-lg font-semibold hover:bg-gray-200"
        >
          Stories
        </a>

        <a
          href="/rst2/admin"
          className="px-4 py-2 bg-white border rounded-lg font-semibold hover:bg-gray-200"
        >
          Admin Dashboard
        </a>

      </div>
    </nav>
  );
}