export default function CategoryStep({ value, onChange, onNext }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a category</h2>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-3"
      >
        <option value="">Select one</option>
        <option value="clothing">Clothing</option>
        <option value="transportation">Transportation</option>
        <option value="food">Food</option>
        <option value="housing">Housing</option>
        <option value="other">Other</option>
      </select>

      <button
        onClick={onNext}
        className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg"
      >
        Next
      </button>
    </div>
  );
}