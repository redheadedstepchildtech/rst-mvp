export interface Photo {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  donationId?: string;
  helpOfferId?: string;
}

export interface HelpOffer {
  id: string;
  title: string;
  category: string;
  availability: string;
  contactPreference: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}