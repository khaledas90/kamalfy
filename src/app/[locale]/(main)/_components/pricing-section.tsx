"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      description: "14-day free trial",
      highlighted: false,
      features: ["Up to 100 products", "Basic analytics", "Email support", "Standard integrations", "Single store"],
      cta: "Start Free Trial",
    },
    {
      name: "Monthly Plan",
      price: "$49",
      period: "/month",
      description: "Most popular",
      highlighted: true,
      features: [
        "Everything in Free",
        "Unlimited products",
        "AI features included",
        "Priority support",
        "Multi-store management",
        "Custom integrations",
      ],
      cta: "Get Started",
    },
    {
      name: "Yearly Plan",
      price: "$39",
      period: "/month billed yearly",
      description: "Save 20%",
      highlighted: false,
      features: [
        "All Monthly features",
        "Advanced AI insights",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "Priority support",
      ],
      cta: "Subscribe Yearly",
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
    <section id="pricing" className="w-full py-12" aria-label="Pricing Plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Simple, Transparent Pricing</h2>
          <p className="text-base text-muted-foreground">Choose the plan that works best for your business</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl border transition-all duration-300 h-full flex flex-col ${
                plan.highlighted
                  ? "border-foreground bg-foreground text-background md:scale-105"
                  : "border-border bg-card"
              }`}
              variants={cardVariants}
              whileHover={{ y: -4 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3
                    className={`text-xl font-semibold mb-1 ${plan.highlighted ? "text-background" : "text-foreground"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mb-4 ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${plan.highlighted ? "text-background" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="flex-grow mb-6">
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2.5">
                        <Check
                          size={16}
                          className={`flex-shrink-0 ${plan.highlighted ? "text-background" : "text-foreground"}`}
                        />
                        <span className={`text-sm ${plan.highlighted ? "text-background/90" : "text-foreground"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full font-medium h-11 rounded-lg transition-all ${
                    plan.highlighted
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground mt-10 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          All plans include access to our knowledge base, community forum, and email support. No hidden fees.
        </motion.p>
      </div>
    </section>
  )
}
