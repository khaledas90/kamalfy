import { HeroSection } from "./_components/hero"
import { FeaturesOverview } from "./_components/features-overview"
import { AIEnhancedFeatures } from "./_components/ai-enhanced-features"
import { DashboardPreview } from "./_components/dashboard-preview"
import { TestimonialsSection } from "./_components/testimonials-section"
import { PricingSection } from "./_components/pricing-section"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesOverview />
      <AIEnhancedFeatures />
      <DashboardPreview />
      <TestimonialsSection />
      <PricingSection />
    </main>
  )
}
