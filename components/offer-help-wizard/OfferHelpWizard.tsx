"use client";

import { useState } from "react";
import OfferHelpDetailsStep from "./OfferHelpDetailsStep";
import OfferHelpPhotosStep from "./OfferHelpPhotosStep";
import OfferHelpReviewStep from "./OfferHelpReviewStep";

export default function OfferHelpWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Wizard data
  const [details, setDetails] = useState({
    title: "",
    description: "",
    type: "",
    availability: "",
    contactPreference: "",
  });

  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      ...details,
      photos,
    };

    const res = await fetch("/api/help-offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (res.ok) {
      alert("Help offer submitted!");
      setCurrentStep(1);
      setDetails({
        title: "",
        description: "",
        type: "",
        availability: "",
        contactPreference: "",
      });
      setPhotos([]);
    } else {
      alert("Error submitting help offer.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      {currentStep === 1 && (
        <OfferHelpDetailsStep
          data={details}
          onNext={(d) => {
            setDetails(d);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <OfferHelpPhotosStep
          onNext={(uploaded) => {
            setPhotos(uploaded);
            setCurrentStep(3);
          }}
        />
      )}

      {currentStep === 3 && (
        <OfferHelpReviewStep
          details={details}
          photos={photos}
          submitting={submitting}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}