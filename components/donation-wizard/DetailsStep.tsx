export default function DetailsStep({ nextStep, prevStep, updateForm, formData }) {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Details</h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <p>Category: {formData.category}</p>

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}