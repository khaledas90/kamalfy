"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Settings, Check, Zap, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  containerVariants,
  itemVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function FeaturesPage() {
  const t = useTranslations("common.featuresPage");

  const features = [
    {
      icon: TrendingUp,
      title: t("marketing.title"),
      description: t("marketing.description"),
      items: [
        t("marketing.items.coupons"),
        t("marketing.items.cart"),
        t("marketing.items.loyalty"),
        t("marketing.items.email"),
        t("marketing.items.social"),
        t("marketing.items.seo"),
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Brain,
      title: t("ai.title"),
      description: t("ai.description"),
      items: [
        t("ai.items.recommendations"),
        t("ai.items.chat"),
        t("ai.items.analytics"),
        t("ai.items.insights"),
        t("ai.items.pricing"),
        t("ai.items.personalized"),
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Settings,
      title: t("operations.title"),
      description: t("operations.description"),
      items: [
        t("operations.items.tracking"),
        t("operations.items.multiStore"),
        t("operations.items.multiLang"),
        t("operations.items.integrations"),
        t("operations.items.inventory"),
        t("operations.items.workflows"),
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Zap,
      title: t("performance.title"),
      description: t("performance.description"),
      items: [
        t("performance.items.dashboard"),
        t("performance.items.sales"),
        t("performance.items.reports"),
        t("performance.items.revenue"),
        t("performance.items.conversion"),
        t("performance.items.metrics"),
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: t("aiSalesAdvisor.title"),
      description: t("aiSalesAdvisor.description"),
    },
    {
      icon: MessageSquare,
      title: t("aiMessageGenerator.title"),
      description: t("aiMessageGenerator.description"),
    },
    {
      icon: Zap,
      title: t("aiPricingSuggestion.title"),
      description: t("aiPricingSuggestion.description"),
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
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={headerVariants}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Main Features */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t("coreFeatures")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`${feature.iconColor} w-7 h-7`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        custom={itemIndex}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex items-start gap-3"
                      >
                        <Check
                          size={18}
                          className={`flex-shrink-0 ${feature.iconColor} mt-0.5`}
                        />
                        <span className="text-sm text-foreground leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t("aiFeatures")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

