"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Boostify increased our conversion rate by 35% in the first month. The AI recommendations are incredibly accurate.",
      author: "Sarah Chen",
      role: "Owner",
      company: "StyleHub Store",
      avatar: "/professional-avatar-woman.jpg",
      rating: 5,
    },
    {
      quote:
        "The abandoned cart recovery feature alone has recovered $50K in lost sales. Truly a game-changer for our business.",
      author: "Michael Torres",
      role: "Founder",
      company: "TechGear Co",
      avatar: "/professional-avatar-man.jpg",
      rating: 5,
    },
    {
      quote:
        "Managing multiple stores is now effortless. The multi-store management feature has saved us countless hours.",
      author: "Emily Rodriguez",
      role: "Operations Manager",
      company: "Fashion Forward",
      avatar: "/professional-avatar-woman-smiling.jpg",
      rating: 5,
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
    <section className="w-full py-12" aria-label="Customer Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Trusted by 10,000+ Merchants</h2>
          <p className="text-base text-muted-foreground">See what successful eCommerce entrepreneurs have to say</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 flex flex-col h-full"
              variants={cardVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-foreground/20 text-foreground/20" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="font-medium text-sm text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
