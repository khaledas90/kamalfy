"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap, Heart } from "lucide-react";
import {
  headerContainerVariants,
  headerVariants,
  cardVariants,
  containerVariants,
  viewportHeader,
  viewportOnce,
} from "../../../../utils/animations";

export default function AboutUsPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower every eCommerce merchant with AI-powered tools that simplify operations and maximize growth.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      title: "Our Team",
      description:
        "A diverse group of engineers, designers, and business experts passionate about eCommerce innovation.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously push boundaries with cutting-edge AI technology to stay ahead of the curve.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your success is our success. We're committed to providing exceptional support and value.",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
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
            About Boostify
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={headerVariants}
          >
            We're on a mission to revolutionize eCommerce by making AI-powered
            tools accessible to merchants of all sizes. Since our founding, we've
            helped thousands of businesses scale and succeed.
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
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Boostify was born from a simple observation: eCommerce merchants
              were spending too much time on repetitive tasks and not enough time
              growing their businesses. We set out to change that.
            </p>
            <p>
              Founded in 2020, we've grown from a small team of passionate
              developers to a global platform serving over 10,000 merchants
              worldwide. Our AI-powered solutions have helped businesses recover
              millions in lost sales and increase conversion rates by an average
              of 35%.
            </p>
            <p>
              Today, we continue to innovate, bringing cutting-edge AI technology
              to merchants who want to sell smarter and grow faster. Our platform
              combines powerful automation, intelligent analytics, and personalized
              AI assistance to give you everything you need to succeed.
            </p>
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
            What We Stand For
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
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">Active Merchants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                150+
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                35%
              </div>
              <div className="text-sm text-muted-foreground">Avg. Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
