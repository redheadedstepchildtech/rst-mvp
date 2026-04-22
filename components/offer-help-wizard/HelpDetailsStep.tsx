interface Props {
  nextStep: () => void;
  prevStep: () => void;
  updateHelpData: (updates: any) => void;
  helpData: any;
}

export default function HelpDetailsStep({
  nextStep,
  prevStep,
  updateHelpData,
  helpData,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateHelpData({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Details</h2>

      <input
        name="title"
        placeholder="What are you offering?"
        value={helpData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Describe your offer..."
        value={helpData.description}
        onChange={handleChange}
      />

      <input
        name="availability"
        placeholder="When are you available?"
        value={helpData.availability}
        onChange={handleChange}
      />

      <input
        name="contactPreference"
        placeholder="How should people contact you?"
        value={helpData.contactPreference}
        onChange={handleChange}
      />

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}