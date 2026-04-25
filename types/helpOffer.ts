import { Photo } from "./photo";

export interface HelpOffer {
  id: string;
  title: string;
  category: string;
  type: string;
  availability: string;
  contactPreference: string;
  description: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface HelpOffer {
  id: string;
  title: string;
  category: string;
  type: string;
  availability: string;
  contactPreference: string;
  description: string;   // ⭐ REQUIRED
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}
