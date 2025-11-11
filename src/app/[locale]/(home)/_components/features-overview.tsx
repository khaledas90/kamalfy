"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Settings, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  containerVariants,
  cardVariants,
  itemVariants,
  headerContainerVariants,
  headerVariants,
  viewportOnce,
  viewportHeader,
} from "../../../../utils/animations";

export function FeaturesOverview() {
  const t = useTranslations("common.features");

  const features = [
    {
      icon: TrendingUp,
      title: t("marketing.title"),
      items: [
        t("marketing.items.coupons"),
        t("marketing.items.cart"),
        t("marketing.items.loyalty"),
        t("marketing.items.email"),
      ],
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Brain,
      title: t("ai.title"),
      items: [
        t("ai.items.recommendations"),
        t("ai.items.chat"),
        t("ai.items.analytics"),
        t("ai.items.insights"),
      ],
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Settings,
      title: t("operations.title"),
      items: [
        t("operations.items.tracking"),
        t("operations.items.multiStore"),
        t("operations.items.multiLang"),
        t("operations.items.integrations"),
      ],
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-16 relative overflow-hidden"
      aria-label="Features Overview"
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
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-300 overflow-hidden"
                variants={cardVariants}
              >
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon
                    className={`${feature.iconColor} relative z-10`}
                    size={28}
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-6">
                  {feature.title}
                </h3>

                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      custom={itemIndex}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className={`${feature.iconColor} w-4 h-4`} />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
