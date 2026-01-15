import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { UserTypesSection } from "@/components/landing/UserTypesSection";
import { TitlesShowcase } from "@/components/landing/TitlesShowcase";
import { RecruiterPreview } from "@/components/landing/RecruiterPreview";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <UserTypesSection />
      <TitlesShowcase />
      <RecruiterPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
