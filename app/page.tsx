export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER + TAGLINE */}
      <section className="pt-20 text-center px-4">
        <h1 className="text-5xl font-extrabold text-red-700 drop-shadow-sm">
          Welcome to Redheaded Stepchild Tech
        </h1>

        <p className="mt-4 text-2xl text-red-700 font-medium">
          Dignity‑first tools.
        </p>
      </section>

      {/* HERO HEART */}
      <section className="mt-20 grid place-items-center px-4">
        <div className="relative h-80 w-80 flex items-center justify-center">
          <img
            src="/heart.png"
            alt="RST Heart Symbol"
            className="h-full w-full object-contain drop-shadow-md"
          />
        </div>
      </section>

      {/* NAVIGATION BUTTONS */}
      <section className="mt-20 grid gap-6 max-w-md mx-auto px-4">
        <a
          href="/create-donation"
          className="block bg-red-700 text-white text-center py-4 rounded-xl shadow hover:bg-red-800 transition text-lg font-semibold"
        >
          ❤️ Create Donation
        </a>

        <a
          href="/swap-meet"
          className="block bg-red-700 text-white text-center py-4 rounded-xl shadow hover:bg-red-800 transition text-lg font-semibold"
        >
          🔄 Swap‑Meet
        </a>

        <a
          href="/who-we-are"
          className="block bg-red-700 text-white text-center py-4 rounded-xl shadow hover:bg-red-800 transition text-lg font-semibold"
        >
          👥 Who We Are
        </a>

        <a
          href="/login"
          className="block bg-gray-700 text-white text-center py-4 rounded-xl shadow hover:bg-gray-800 transition text-lg font-semibold"
        >
          🔐 Login
        </a>

        <a
          href="/login?guest=true"
          className="block bg-gray-700 text-white text-center py-4 rounded-xl shadow hover:bg-gray-800 transition text-lg font-semibold"
        >
          👤 Login as Guest
        </a>
      </section>

      {/* FOOTER */}
      <section className="mt-24 text-center text-xs text-gray-500 pb-10">
        © 2026 Redheaded Stepchild Tech
      </section>

    </main>
  );
}