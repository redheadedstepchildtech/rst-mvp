export default function CategoryStep({ nextStep, updateForm, formData }) {
  const handleSelect = (category) => {
    updateForm({ category });
    nextStep();
  };

  return (
    <div>
      <h2>What are you offering today?</h2>

      <div className="category-buttons">
        <button onClick={() => handleSelect("item")}>Item</button>
        <button onClick={() => handleSelect("service")}>Service</button>
        <button onClick={() => handleSelect("support")}>Support</button>
        <button onClick={() => handleSelect("other")}>Other</button>
      </div>
    </div>
  );
}