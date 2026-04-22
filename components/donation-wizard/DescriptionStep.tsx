export default function DescriptionStep({ nextStep, prevStep, updateForm, formData }) {
  const handleChange = (e) => {
    updateForm({ description: e.target.value });
  };

  return (
    <div>
      <h2>Description</h2>

      <textarea
        placeholder="Tell people what you're offering..."
        value={formData.description}
        onChange={handleChange}
      />

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}