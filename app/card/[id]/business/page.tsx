import { loadCardData } from "../loadCardData";
import CardLayout from "../CardLayout";

export default async function BusinessCardPage({ params }) {
  const { id } = params;

  // Load minisite data + QR + top needs
  const data = await loadCardData(id);

  return (
    <CardLayout data={data} size="business">
      {/* Business card has no extra content beyond shared layout */}
    </CardLayout>
  );
}