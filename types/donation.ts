export interface Photo {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  donationId?: string;
  helpOfferId?: string;
}

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
