interface Props {
  nextStep: () => void;
  prevStep: () => void;
  helpData: any;
}

export default function HelpReviewStep({ nextStep, prevStep, helpData }: Props) {
  return (
    <div>
      <h2>Review Your Offer</h2>

      <p><strong>Type:</strong> {helpData.type}</p>
      <p><strong>Title:</strong> {helpData.title}</p>
      <p><strong>Description:</strong> {helpData.description}</p>
      <p><strong>Availability:</strong> {helpData.availability}</p>
      <p><strong>Contact:</strong> {helpData.contactPreference}</p>

      <h3>Photos</h3>
      <ul>
        {helpData.photos.map((p: File, i: number) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Publish</button>
      </div>
    </div>
  );
}