import QRCode from "qrcode";

export async function loadCardData(id: string) {
  // Fetch minisite data
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get?id=${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  // Generate QR code for the minisite URL
  const minisiteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/story/${id}`;
  const qrCode = await QRCode.toDataURL(minisiteUrl);

  // Extract top 3 needs
  const needsList = data.needs
    ? data.needs.split(",").map((n: string) => n.trim())
    : [];

  const topNeeds = needsList.slice(0, 3);

  return {
    ...data,
    qrCode,
    topNeeds,
  };
}