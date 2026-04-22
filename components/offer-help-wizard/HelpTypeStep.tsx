interface Props {
  nextStep: () => void;
  updateHelpData: (updates: any) => void;
  helpData: any;
}

export default function HelpTypeStep({ nextStep, updateHelpData }: Props) {
  const handleSelect = (type: string) => {
    updateHelpData({ type });
    nextStep();
  };

  return (
    <div>
      <h2>How would you like to help today?</h2>

      <div className="type-buttons">
        <button onClick={() => handleSelect("item")}>Offer an Item</button>
        <button onClick={() => handleSelect("service")}>Offer a Service</button>
        <button onClick={() => handleSelect("support")}>Offer Support</button>
        <button onClick={() => handleSelect("other")}>Other</button>
      </div>
    </div>
  );
}