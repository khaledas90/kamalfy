"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  containerVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function AboutUsPage() {
  const t = useTranslations("common.aboutPage");

  const values = [
    {
      icon: Target,
      title: t("values.mission.title"),
      description: t("values.mission.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      title: t("values.team.title"),
      description: t("values.team.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Zap,
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Heart,
      title: t("values.customer.title"),
      description: t("values.customer.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
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

        {/* Story Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">{t("story.title")}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t("story.paragraph1")}</p>
            <p>{t("story.paragraph2")}</p>
            <p>{t("story.paragraph3")}</p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t("values.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`${value.iconColor} w-7 h-7`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t("stats.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">{t("stats.merchants")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                150+
              </div>
              <div className="text-sm text-muted-foreground">{t("stats.countries")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                35%
              </div>
              <div className="text-sm text-muted-foreground">{t("stats.growth")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">{t("stats.support")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
