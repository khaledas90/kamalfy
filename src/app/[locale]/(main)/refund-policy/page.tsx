"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function RefundPolicyPage() {
  const t = useTranslations("common.refundPolicy");

  const sections = [
    { key: "eligibility" },
    { key: "process" },
    { key: "exceptions" },
    { key: "processing" },
    { key: "cancellation" },
    { key: "contact" },
  ];

  return (
    <main className="w-full min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
            className="text-sm text-muted-foreground"
            variants={headerVariants}
          >
            {t("lastUpdated")}
          </motion.p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-8"
        >
          <p className="text-muted-foreground leading-relaxed">
            {t("introduction")}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.key}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t(`sections.${section.key}.title`)}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`sections.${section.key}.content`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

