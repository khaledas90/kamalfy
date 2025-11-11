"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronDown, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/assets/hero.png";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("common.hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const words = [
    t("title.line1"),
    t("title.line2"),
    t("title.line3"),
    t("title.line4"),
  ];
  const primaryWords = [1, 3];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden pt-16 pb-16 min-h-[90vh] flex items-center"
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y, opacity }}
        >
          <div className="flex flex-col gap-6 relative z-10">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-2 xl:text-6xl font-bold leading-[1.1] text-foreground flex flex-col gap-6 mt-2"
              variants={itemVariants}
            >
              <motion.span
                custom={0}
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2"
              >
                {words.slice(0, 2).map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    className={
                      primaryWords.includes(i)
                        ? "text-primary font-bold relative"
                        : "relative"
                    }
                  >
                    {word}
                    {primaryWords.includes(i) && (
                      <motion.span
                        className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                      />
                    )}
                    {i === 0 && " "}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                custom={2}
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                {words.slice(2, 4).map((word, i) => (
                  <motion.span
                    key={i + 2}
                    custom={i + 2}
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    className={
                      primaryWords.includes(i + 2)
                        ? "text-primary font-bold relative"
                        : "relative"
                    }
                  >
                    {word}
                    {primaryWords.includes(i + 2) && (
                      <motion.span
                        className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          delay: (i + 2) * 0.1 + 0.5,
                          duration: 0.6,
                        }}
                      />
                    )}
                    {i === 0 && " "}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl mt-5 text-muted-foreground leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              {t("description")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-1"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium h-14 rounded-xl px-8 text-base shadow-lg shadow-foreground/20 hover:shadow-xl hover:shadow-foreground/30 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("cta.primary")}
                    <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:border-primary/50 hover:bg-[#f5f5f5] font-medium h-14 rounded-xl px-8 text-base backdrop-blur-sm transition-all group"
                >
                  <span className="flex items-center gap-2">
                    {t("cta.secondary")}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4 pt-2"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-muted-foreground">
                  {t("stats.trial")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <span className="text-sm text-muted-foreground">
                  {t("stats.noCard")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t("stats.merchants")}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.div
              className="absolute inset-0  rounded-3xl blur-3xl -z-10"
              variants={glowVariants}
              animate="animate"
            />

            <motion.div className="relative w-full h-full">
              <div className="relative rounded-2xl overflow-hidden  border border-border/50 backdrop-blur-sm  p-4">
                <Image
                  src={heroImage}
                  alt="Boostify AI Dashboard with analytics and shopping cart"
                  className="w-full h-full object-contain"
                  width={900}
                  height={900}
                  priority
                />
              </div>

              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs text-muted-foreground ">{t("scroll")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
