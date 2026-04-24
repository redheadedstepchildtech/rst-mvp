"use client";

interface Props {
  details: {
    title: string;
    description: string;
    type: string;
    availability: string;
    contactPreference: string;
  };
  photos: string[];
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export default function OfferHelpReviewStep({
  details,
  photos,
  submitting,
  onBack,
  onSubmit,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review Your Help Offer</h2>

      <div className="space-y-2 mb-4">
        <p><strong>Title:</strong> {details.title}</p>
        <p><strong>Description:</strong> {details.description}</p>
        <p><strong>Type:</strong> {details.type}</p>
        <p><strong>Availability:</strong> {details.availability}</p>
        <p><strong>Contact Preference:</strong> {details.contactPreference}</p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((url) => (
            <img
              key={url}
              src={url}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}