"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Brain,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  containerVariants,
  cardVariants,
  headerContainerVariants,
  headerVariants,
  fadeInVariants,
  viewportOnce,
  viewportHeader,
} from "../../../../utils/animations";

export function AIEnhancedFeatures() {
  const t = useTranslations("common.aiFeatures");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const aiFeatures = [
    {
      icon: Brain,
      title: t("advisor.title"),
      description: t("advisor.description"),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconGradient: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.3)",
    },
    {
      icon: MessageSquare,
      title: t("generator.title"),
      description: t("generator.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconGradient: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: TrendingUp,
      title: t("pricing.title"),
      description: t("pricing.description"),
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconGradient: "from-emerald-500 to-teal-500",
      glow: "rgba(16, 185, 129, 0.3)",
    },
  ];

  return (
    <section
      className="w-full py-16 relative overflow-hidden"
      aria-label="AI Enhanced Features"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Floating particles effect - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const randomX =
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200);
            const randomY =
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800);
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full blur-sm"
                initial={{
                  x: randomX,
                  y: randomY,
                  opacity: 0.2,
                }}
                animate={{
                  y: [randomY, randomY - 100, randomY],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportHeader}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            variants={fadeInVariants}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              {t("badge")}
            </span>
          </motion.div>

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
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full flex flex-col hover:border-primary transition-all duration-300 overflow-hidden"
                variants={cardVariants}
              >
                {/* Icon with gradient */}
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.iconGradient} opacity-20`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon className="relative z-10 w-7 h-7 text-primary" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {feature.description}
                </p>

                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{t("learnMore")}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </motion.div>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
