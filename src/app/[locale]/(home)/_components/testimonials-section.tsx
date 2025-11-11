"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  containerVariants,
  cardVariants,
  headerContainerVariants,
  headerVariants,
  viewportOnce,
  viewportHeader,
} from "../../../../utils/animations";

export function TestimonialsSection() {
  const t = useTranslations("common.testimonials");

  const testimonials = [
    {
      quote: t("items.0.quote"),
      author: t("items.0.author"),
      role: t("items.0.role"),
      company: t("items.0.company"),
      avatar: "/placeholder.svg",
      rating: 5,
    },
    {
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      role: t("items.1.role"),
      company: t("items.1.company"),
      avatar: "/placeholder.svg",
      rating: 5,
    },
    {
      quote: t("items.2.quote"),
      author: t("items.2.author"),
      role: t("items.2.role"),
      company: t("items.2.company"),
      avatar: "/placeholder.svg",
      rating: 5,
    },
  ];

  return (
    <section
      className="w-full py-16 relative overflow-hidden"
      aria-label="Customer Testimonials"
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 flex flex-col h-full hover:border-primary transition-all duration-300"
              variants={cardVariants}
            >
              {/* Rating Stars - Top */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary/20 text-primary/20"
                  />
                ))}
              </div>

              {/* Quote - Middle */}
              <div className="flex-grow mb-6">
                <p className="text-base text-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info - Bottom */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/50 mt-1">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border/50 flex-shrink-0">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
