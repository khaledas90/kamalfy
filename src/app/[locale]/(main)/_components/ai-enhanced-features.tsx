"use client"

import { motion } from "framer-motion"
import { Brain, MessageSquare, TrendingUp, ArrowRight } from "lucide-react"

export function AIEnhancedFeatures() {
  const aiFeatures = [
    {
      icon: Brain,
      title: "AI Sales Advisor",
      description: "Get real-time recommendations on pricing, inventory, and promotions based on market trends",
    },
    {
      icon: MessageSquare,
      title: "AI Message Generator",
      description: "Create personalized marketing emails and product descriptions in seconds",
    },
    {
      icon: TrendingUp,
      title: "AI Pricing Suggestion",
      description: "Optimize product pricing dynamically to maximize profit and conversions",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="w-full py-12" aria-label="AI Enhanced Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">AI That Works For You</h2>
          <p className="text-base text-muted-foreground">Powerful AI capabilities designed to boost your sales</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 h-full flex flex-col hover:border-foreground/20 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center mb-5">
                  <Icon className="text-foreground" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary font-medium transition-colors group"
                >
                  Learn More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
