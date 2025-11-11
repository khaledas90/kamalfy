"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  containerVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out our platform",
      highlighted: false,
      features: [
        "Up to 100 products",
        "Basic analytics",
        "Email support",
        "Standard integrations",
        "Single store",
        "14-day free trial",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Monthly Plan",
      price: "$49",
      period: "/month",
      description: "Most popular choice",
      highlighted: true,
      features: [
        "Everything in Free",
        "Unlimited products",
        "AI features included",
        "Priority support",
        "Multi-store management",
        "Custom integrations",
        "Advanced analytics",
      ],
      cta: "Get Started",
    },
    {
      name: "Yearly Plan",
      price: "$39",
      period: "/month billed yearly",
      description: "Best value - Save 20%",
      highlighted: false,
      features: [
        "All Monthly features",
        "Advanced AI insights",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "Priority support",
        "Early access to features",
      ],
      cta: "Subscribe Yearly",
    },
  ];

  return (
    <main className="w-full min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportHeader}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            variants={headerVariants}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={headerVariants}
          >
            Choose the plan that works best for your business. All plans include
            a 14-day free trial with no credit card required.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative rounded-2xl border h-full flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-background/50 backdrop-blur-sm"
                  : "border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <Check
                          size={18}
                          className="flex-shrink-0 text-primary mt-0.5"
                        />
                        <span className="text-sm text-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  className={`w-full font-medium h-12 rounded-xl ${
                    plan.highlighted
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Can I change plans later?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-muted-foreground">
                No, there are no setup fees or hidden costs. What you see is what
                you pay.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee. If you're not
                satisfied, contact us for a full refund.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

