export interface HelpOffer {
  id: string;
  type: "item" | "service" | "support" | "other";
  title: string;
  description: string;
  availability: string;
  contactPreference: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}