export interface Donation {
  id: string;
  title: string;
  category: "item" | "service" | "support" | "other";
  description: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}