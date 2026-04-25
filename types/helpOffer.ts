import { Photo } from "./photo";

export interface HelpOffer {
  id: string;
  title: string;
  category: "item" | "service" | "support" | "other";
  type: string;               // ← REQUIRED
  availability: string;       // ← REQUIRED
  contactPreference: string;  // ← REQUIRED
  description: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}