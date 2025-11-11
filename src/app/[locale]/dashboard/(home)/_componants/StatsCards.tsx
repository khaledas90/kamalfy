"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign
} from "lucide-react"

export default function StatsCards() {
  const t = useTranslations("dashboard.overview")

  const stats = [
    {
      title: t("stats.totalRevenue"),
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: t("stats.totalOrders"),
      value: "1,234",
      change: "+12.5%",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: t("stats.totalCustomers"),
      value: "5,678",
      change: "+8.2%",
      icon: Users,
      trend: "up"
    },
    {
      title: t("stats.conversionRate"),
      value: "3.24%",
      change: "+2.4%",
      icon: TrendingUp,
      trend: "up"
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-green-600">{stat.change}</span>
                {t("stats.fromLastMonth")}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

