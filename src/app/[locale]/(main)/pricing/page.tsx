"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  containerVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function PricingPage() {
  const t = useTranslations("common.pricingPage");

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
        t("free.features.trial"),
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
        t("monthly.features.analytics"),
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
        t("yearly.features.early"),
      ],
      cta: t("yearly.cta"),
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
            {t("title")}
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={headerVariants}
          >
            {t("description")}
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
            {t("faq.title")}
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("faq.changePlans.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.changePlans.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("faq.paymentMethods.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.paymentMethods.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("faq.setupFee.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.setupFee.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("faq.refunds.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.refunds.answer")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

