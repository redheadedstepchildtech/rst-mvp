export interface DashboardItem {
  id: string;
  type: "donation" | "help-offer";
  title: string;
  createdAt: string;
  thumbnail?: string;
}