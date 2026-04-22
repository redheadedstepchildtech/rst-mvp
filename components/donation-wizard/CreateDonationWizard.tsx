import { useState } from "react";
import CategoryStep from "./CategoryStep";
import DetailsStep from "./DetailsStep";
import PhotosStep from "./PhotosStep";
import DescriptionStep from "./DescriptionStep";
import ReviewStep from "./ReviewStep";
import FinalStep from "./FinalStep";

export default function CreateDonationWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    photos: [],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CategoryStep nextStep={nextStep} updateForm={updateForm} formData={formData} />;
      case 2:
        return <DetailsStep nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />;
      case 3:
        return <PhotosStep nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />;
      case 4:
        return <DescriptionStep nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />;
      case 5:
        return <ReviewStep nextStep={nextStep} prevStep={prevStep} formData={formData} />;
      case 6:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <div className="wizard-container">
      {renderStep()}
    </div>
  );
}