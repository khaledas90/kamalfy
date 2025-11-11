"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { FileQuestion, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("notFound")
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 404 number animation
      gsap.from(".number-char", {
        opacity: 0,
        scale: 0,
        rotation: 360,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.to(".number-char", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      })

      // Icon animation
      gsap.from(iconRef.current, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
      })

      gsap.to(iconRef.current, {
        rotation: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Content animation
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.8,
      })

      // Floating particles
      gsap.to(".particle", {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        scale: "random(0.5, 1.5)",
        opacity: "random(0.3, 0.8)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br dark:from-[#041718] dark:via-[#052224] dark:to-[#08383c] from-[#f0f9fa] via-white to-[#ccf2f5] flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-[#33cbd7]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* 404 Number */}
        <div ref={numberRef} className="mb-8">
          <div className="flex justify-center items-center gap-4">
            <span className="number-char text-[120px] md:text-[180px] font-bold text-[#33cbd7] leading-none">4</span>
            <div
              ref={iconRef}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#33cbd7] to-[#33cbd7]/70 flex items-center justify-center shadow-xl shadow-[#33cbd7]/30"
            >
              <FileQuestion className="w-12 h-12 md:w-16 md:h-16 text-[#041718]" />
            </div>
            <span className="number-char text-[120px] md:text-[180px] font-bold text-[#33cbd7] leading-none">4</span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{t("title")}</h1>

          <p className="text-lg text-[#33cbd7]/80 max-w-xl mx-auto">
            {t("description")}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/">
              <Button className="bg-[#33cbd7] hover:bg-[#33cbd7]/90 text-[#041718] font-semibold px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#33cbd7]/30 w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                {t("goHome")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#33cbd7]/20 rounded-full animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 border-4 border-[#33cbd7]/10 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
