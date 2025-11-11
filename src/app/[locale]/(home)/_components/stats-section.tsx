"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, Users, Zap, Globe } from "lucide-react";
import {
  containerVariants,
  headerContainerVariants,
  headerVariants,
  viewportOnce,
  viewportHeader,
  statVariants,
} from "../../../../utils/animations";

export function StatsSection() {
  const t = useTranslations("common.stats");

  const stats = [
    {
      icon: Users,
      value: t("merchants.value"),
      label: t("merchants.label"),
      description: t("merchants.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: TrendingUp,
      value: t("conversion.value"),
      label: t("conversion.label"),
      description: t("conversion.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Zap,
      value: t("recovered.value"),
      label: t("recovered.label"),
      description: t("recovered.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Globe,
      value: t("countries.value"),
      label: t("countries.label"),
      description: t("countries.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section
      className="w-full py-20 relative overflow-hidden"
      aria-label="Statistics"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 hover:border-primary transition-all duration-300 text-center"
                custom={index}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon className={`${stat.iconColor} relative z-10 w-7 h-7`} />
                </motion.div>

                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <span className="text-4xl lg:text-5xl font-bold text-foreground block">
                    {stat.value}
                  </span>
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>

                <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
