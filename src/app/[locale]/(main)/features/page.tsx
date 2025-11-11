"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Settings, Check, Zap, MessageSquare } from "lucide-react";
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
  const features = [
    {
      icon: TrendingUp,
      title: "Marketing & Growth",
      description: "Powerful marketing tools to grow your business",
      items: [
        "Smart Coupons & Discounts",
        "Abandoned Cart Recovery",
        "Loyalty & Rewards Points",
        "Email Marketing Automation",
        "Social Media Integration",
        "SEO Optimization Tools",
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Brain,
      title: "AI & Personalization",
      description: "Intelligent AI features for better customer experience",
      items: [
        "AI Product Recommendations",
        "Smart Chat Assistant",
        "Predictive Analytics",
        "Customer Behavior Insights",
        "Dynamic Pricing",
        "Personalized Shopping Experience",
      ],
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      icon: Settings,
      title: "Operations & Management",
      description: "Streamline your operations with powerful tools",
      items: [
        "Real-time Order Tracking",
        "Multi-Store Management",
        "Multi-language Support",
        "One-Click Integrations",
        "Inventory Management",
        "Automated Workflows",
      ],
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
    },
    {
      icon: Zap,
      title: "Performance & Analytics",
      description: "Make data-driven decisions with comprehensive analytics",
      items: [
        "Real-time Dashboard",
        "Sales Analytics",
        "Customer Reports",
        "Revenue Tracking",
        "Conversion Optimization",
        "Performance Metrics",
      ],
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
    },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "AI Sales Advisor",
      description:
        "Get real-time recommendations on pricing, inventory, and promotions based on market trends and competitor analysis.",
    },
    {
      icon: MessageSquare,
      title: "AI Message Generator",
      description:
        "Create personalized marketing emails, product descriptions, and customer communications in seconds with AI assistance.",
    },
    {
      icon: Zap,
      title: "AI Pricing Suggestion",
      description:
        "Optimize product pricing dynamically to maximize profit and conversions using machine learning algorithms.",
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
            Powerful Features for Modern eCommerce
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={headerVariants}
          >
            Everything you need to scale your online business. From AI-powered
            automation to comprehensive analytics, we've got you covered.
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
            Core Features
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
            AI-Powered Features
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

