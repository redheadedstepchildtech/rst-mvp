interface Props {
  donation: any;
}

export default function DonationCard({ donation }: Props) {
  return (
    <div className="donation-card">
      <h3>{donation.title}</h3>
      <p>{donation.category}</p>

      {donation.photos?.length > 0 && (
        <img
          src={donation.photos[0]}
          alt="Donation"
          className="donation-thumb"
        />
      )}

      <a href={`/dashboard/donation/${donation.id}`}>
        <button>View</button>
      </a>
    </div>
  );
}