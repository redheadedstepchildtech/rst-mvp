import Nav from "./components/Nav";
import NavMobile from "./components/NavMobile";

function MyrnaHeader() {
  return (
    <header className="w-full bg-white border-b p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">MYRNA</h1>
        <p className="text-sm text-gray-600">
          Meet Your Neighborly Assistant
        </p>
      </div>
    </header>
  );
}

export default function Layout({ children }) {
  return (
    <div>
      <MyrnaHeader />
      <NavMobile />
      <Nav />
      <main className="p-6">{children}</main>
    </div>
  );
}