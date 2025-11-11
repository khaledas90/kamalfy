"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  containerVariants,
  cardVariants,
  headerContainerVariants,
  headerVariants,
  slideUpVariants,
  viewportOnce,
  viewportHeader,
} from "../../../../utils/animations";

export function PricingSection() {
  const t = useTranslations("common.pricing");

  const plans = [
    {
      name: t("free.name"),
      price: t("free.price"),
      period: t("free.period"),
      description: t("free.description"),
      highlighted: false,
      features: [
        t("free.features.products"),
        t("free.features.analytics"),
        t("free.features.support"),
        t("free.features.integrations"),
        t("free.features.store"),
      ],
      cta: t("free.cta"),
    },
    {
      name: t("monthly.name"),
      price: t("monthly.price"),
      period: t("monthly.period"),
      description: t("monthly.description"),
      highlighted: true,
      features: [
        t("monthly.features.everything"),
        t("monthly.features.products"),
        t("monthly.features.ai"),
        t("monthly.features.support"),
        t("monthly.features.stores"),
        t("monthly.features.integrations"),
      ],
      cta: t("monthly.cta"),
    },
    {
      name: t("yearly.name"),
      price: t("yearly.price"),
      period: t("yearly.period"),
      description: t("yearly.description"),
      highlighted: false,
      features: [
        t("yearly.features.everything"),
        t("yearly.features.insights"),
        t("yearly.features.integrations"),
        t("yearly.features.manager"),
        t("yearly.features.api"),
        t("yearly.features.support"),
      ],
      cta: t("yearly.cta"),
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-16 relative overflow-hidden"
      aria-label="Pricing Plans"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportHeader}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            variants={headerVariants}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={headerVariants}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`group relative rounded-2xl border h-full flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-background/50 backdrop-blur-sm"
                  : "border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary"
              }`}
              variants={cardVariants}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
                    {t("mostPopular")}
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
                      <li key={featureIndex} className="flex items-start gap-3">
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

        <motion.p
          className="text-center text-muted-foreground mt-12 text-sm"
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportHeader}
        >
          {t("footer")}
        </motion.p>
      </div>
    </section>
  );
}
