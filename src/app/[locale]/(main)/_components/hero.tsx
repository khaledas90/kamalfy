"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-12" aria-label="Hero Section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="flex flex-col gap-6">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground"
              variants={itemVariants}
            >
              Sell Smarter.
              <br />
              <span className="text-primary">Grow Faster.</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              Boostify is your AI-driven eCommerce platform that automates sales, marketing, and customer engagement.
              Let AI work for your business while you focus on growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-2" variants={itemVariants}>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-medium h-12 rounded-lg px-8 transition-all"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border hover:bg-muted font-medium h-12 rounded-lg px-8 transition-all"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust indicator */}
            <motion.p className="text-sm text-muted-foreground pt-2" variants={itemVariants}>
              ✓ 14-day free trial • No credit card required • Used by 10,000+ merchants
            </motion.p>
          </div>

          {/* Right side - Illustration */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full h-96">
              <img
                src="/isometric-ai-dashboard-with-analytics-charts-and-s.jpg"
                alt="Boostify AI Dashboard with analytics and shopping cart"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center mt-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ChevronDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  )
}
