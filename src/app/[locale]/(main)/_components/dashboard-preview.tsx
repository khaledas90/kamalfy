"use client"

import { motion } from "framer-motion"

export function DashboardPreview() {
  const stats = [
    { label: "Total Revenue", value: "$245K", suffix: "+12% this month" },
    { label: "Total Orders", value: "1.2K", suffix: "+8% this month" },
    { label: "Conversion Rate", value: "3.8%", suffix: "+0.5% this month" },
    { label: "Active Customers", value: "5.6K", suffix: "+15% this month" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="dashboard" className="w-full py-12" aria-label="Dashboard Preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Powerful Dashboard, Beautiful Design
          </h2>
          <p className="text-base text-muted-foreground">Everything you need to manage your store at a glance</p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-card rounded-xl overflow-hidden border border-border">
            <div className="bg-muted px-6 py-3 flex items-center gap-3 border-b border-border">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">dashboard.boostify.app</span>
            </div>
            <div className="p-6 bg-background min-h-96">
              <img
                src="/analytics-dashboard-with-charts-revenue-metrics-an.jpg"
                alt="Boostify admin dashboard with analytics charts and metrics"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-lg p-5 text-center"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.suffix}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
