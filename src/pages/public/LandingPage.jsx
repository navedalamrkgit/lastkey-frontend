import CTASection from "../../components/landing/CTASection";
import EmergencySection from "../../components/landing/EmergencySection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import HeroSection from "../../components/landing/HeroSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import PricingSection from "../../components/landing/PricingSection";
import SecuritySection from "../../components/landing/SecuritySection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="page-enter">
      <HeroSection />

      <FeaturesSection />

      <SecuritySection />

      <HowItWorksSection />

      <EmergencySection />

      <TestimonialsSection />

      <PricingSection />

      <CTASection />
    </div>
  );
}