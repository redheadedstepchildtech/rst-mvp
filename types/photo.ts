export interface Photo {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  donationId?: string;
  helpOfferId?: string;
}