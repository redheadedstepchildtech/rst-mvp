import { loadCardData } from "../loadCardData";
import CardLayout from "../CardLayout";

export default async function SocialCardPage({ params }) {
  const { id } = params;

  // Load minisite data + QR + top needs
  const data = await loadCardData(id);

  return (
    <CardLayout data={data} size="social">
      {/* Social card has no extra content beyond shared layout */}
    </CardLayout>
  );
}