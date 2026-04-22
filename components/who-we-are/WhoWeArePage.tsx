import MissionSection from "./MissionSection";
import WhyWeBuiltSection from "./WhyWeBuiltSection";
import HowItWorksSection from "./HowItWorksSection";
import ValuesSection from "./ValuesSection";
import ClosingSection from "./ClosingSection";

export default function WhoWeArePage() {
  return (
    <div className="who-container">
      <MissionSection />
      <WhyWeBuiltSection />
      <HowItWorksSection />
      <ValuesSection />
      <ClosingSection />
    </div>
  );
}