import { HeroSection } from "./_components/hero";
import { FeaturesOverview } from "./_components/features-overview";
import { AIEnhancedFeatures } from "./_components/ai-enhanced-features";
import { StatsSection } from "./_components/stats-section";
import { PricingSection } from "./_components/pricing-section";
import { TestimonialsSection } from "./_components/testimonials-section";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesOverview />
      <AIEnhancedFeatures />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
    </main>
  );
}
