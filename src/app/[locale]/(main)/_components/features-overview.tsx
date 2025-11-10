"use client"

import { motion } from "framer-motion"
import { TrendingUp, Brain, Settings } from "lucide-react"

export function FeaturesOverview() {
  const features = [
    {
      icon: TrendingUp,
      title: "Marketing & Growth",
      items: [
        "Smart Coupons & Discounts",
        "Abandoned Cart Recovery",
        "Loyalty & Rewards Points",
        "Email Marketing Automation",
      ],
    },
    {
      icon: Brain,
      title: "AI & Personalization",
      items: [
        "AI Product Recommendations",
        "Smart Chat Assistant",
        "Predictive Analytics",
        "Customer Behavior Insights",
      ],
    },
    {
      icon: Settings,
      title: "Operations & Experience",
      items: ["Real-time Order Tracking", "Multi-Store Management", "Multi-language Support", "One-Click Integrations"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="features" className="w-full py-12" aria-label="Features Overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Everything You Need to Scale</h2>
          <p className="text-base text-muted-foreground">Comprehensive tools built for modern eCommerce merchants</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-foreground/20 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center mb-5">
                  <Icon className="text-foreground" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <ul className="space-y-2.5">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="text-foreground mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
