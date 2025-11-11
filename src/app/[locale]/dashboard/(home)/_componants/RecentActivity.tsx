"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export default function RecentActivity() {
  const t = useTranslations("dashboard.overview")

  const activities = [
    { id: 1, action: t("recentActivity.actions.orderPlaced"), time: "2 hours ago", amount: "$1,234" },
    { id: 2, action: t("recentActivity.actions.newCustomer"), time: "5 hours ago", amount: "-" },
    { id: 3, action: t("recentActivity.actions.paymentReceived"), time: "1 day ago", amount: "$5,678" },
    { id: 4, action: t("recentActivity.actions.productUpdated"), time: "2 days ago", amount: "-" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {t("recentActivity.title")}
        </CardTitle>
        <CardDescription>{t("recentActivity.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              {activity.amount !== "-" && (
                <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

