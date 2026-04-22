export default function ReviewStep({ nextStep, prevStep, formData }) {
  return (
    <div>
      <h2>Review Your Donation</h2>

      <p><strong>Title:</strong> {formData.title}</p>
      <p><strong>Category:</strong> {formData.category}</p>
      <p><strong>Description:</strong> {formData.description}</p>

      <h3>Photos</h3>
      <ul>
        {formData.photos.map((p, i) => (
          <li key={i}>{p.name || "Photo"}</li>
        ))}
      </ul>

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Publish</button>
      </div>
    </div>
  );
}