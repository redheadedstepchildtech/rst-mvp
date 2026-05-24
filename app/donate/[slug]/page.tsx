// --- SERVER COMPONENT (no "use client" allowed here) ---
import DonatePageClient from "./DonatePageClient";

export default async function DonatePageWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <DonatePageClient slug={slug} />;
}
