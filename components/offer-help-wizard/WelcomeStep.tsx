interface Props {
  nextStep: () => void;
}

export default function WelcomeStep({ nextStep }: Props) {
  return (
    <div>
      <h2>Thank you for offering to help</h2>
      <p>Your kindness makes a real difference.</p>

      <button onClick={nextStep}>Continue</button>
    </div>
  );
}