"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import PageHeader from "../_components/Layout/PageHeader"
import StatsCards from "./_componants/StatsCards"
import SalesOverviewChart from "./_componants/SalesOverviewChart"
import RevenueChart from "./_componants/RevenueChart"
import TopProductsChart from "./_componants/TopProductsChart"
import RecentActivity from "./_componants/RecentActivity"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const t = useTranslations("dashboard.overview")

  return (
    <div className="min-h-screen bg-background">
    <PageHeader
        title={""}
        breadcrumbs={[
          { title: "Home", path: "/" },
          { title: t("title"), path: "/dashboard" },
        ]}
      />

      <StatsCards />

      <div className="grid gap-4 md:grid-cols-2">
        <SalesOverviewChart />
        <RevenueChart />
        <TopProductsChart />
      </div>

      <RecentActivity />
    </div>
  )
}
