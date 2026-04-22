import DonationCard from "./DonationCard";

interface Props {
  donations: any[];
}

export default function DonationList({ donations }: Props) {
  return (
    <div className="donation-list">
      {donations.map((donation, index) => (
        <DonationCard key={index} donation={donation} />
      ))}
    </div>
  );
}