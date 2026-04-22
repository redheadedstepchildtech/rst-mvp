import { useState } from "react";
import WelcomeStep from "./WelcomeStep";
import HelpTypeStep from "./HelpTypeStep";
import HelpDetailsStep from "./HelpDetailsStep";
import HelpPhotosStep from "./HelpPhotosStep";
import HelpReviewStep from "./HelpReviewStep";
import HelpFinalStep from "./HelpFinalStep";

export default function OfferHelpWizard() {
  const [currentStep, setCurrentStep] = useState(1);

const handleSubmit = async () => {
  setSubmitting(true);

  const res = await fetch("/api/help-offers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(helpData),
  });

  const created = await res.json();

  setSubmitting(false);
  setCurrentStep("final");
};

  const [helpData, setHelpData] = useState({
    type: "",
    title: "",
    description: "",
    availability: "",
    contactPreference: "",
    photos: [] as File[],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateHelpData = (updates: Partial<typeof helpData>) => {
    setHelpData((prev) => ({ ...prev, ...updates }));
  };

const handleSubmit = async () => {
  const payload = {
    type: formData.type,
    title: formData.title,
    description: formData.description,
    availability: formData.availability,
    contactPreference: formData.contactPreference,
    photos: formData.photos.map((url) => ({
      id: crypto.randomUUID(),
      url,
    })),
    userId: "temp-user",
  };

  const res = await fetch("/api/help-offers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("Created help offer:", data);
};

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep nextStep={nextStep} />;
      case 2:
        return (
          <HelpTypeStep
            nextStep={nextStep}
            updateHelpData={updateHelpData}
            helpData={helpData}
          />
        );
      case 3:
        return (
          <HelpDetailsStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateHelpData={updateHelpData}
            helpData={helpData}
          />
        );
      case 4:
        return (
          <HelpPhotosStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateHelpData={updateHelpData}
            helpData={helpData}
          />
        );
      case 5:
        return (
          <HelpReviewStep
            nextStep={nextStep}
            prevStep={prevStep}
            helpData={helpData}
          />
        );
      case 6:
        return <HelpFinalStep />;
      default:
        return null;
    }
  };

// OfferHelpWizard.tsx
{
  currentStep === "photos" && (
    <OfferHelpPhotosStep
      photos={helpData.photos}
      setPhotos={(urls) =>
        setHelpData((prev) => ({ ...prev, photos: urls }))
      }
      onNext={() => setCurrentStep("review")}
      onBack={() => setCurrentStep("contact")}
    />
  );
}

  return <div className="wizard-container">{renderStep()}</div>;
}