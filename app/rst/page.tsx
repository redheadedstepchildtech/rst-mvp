import NeedCard from "./components/NeedCard";

export default async function Page() {
  const needs = await getNeedsSomehow(); // your existing fetch

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {needs.map((need) => (
        <NeedCard key={need.id} need={need} />
      ))}
    </div>
  );
}