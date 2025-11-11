"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Cell, Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const topProductsData = [
  { name: "productA", value: 400 },
  { name: "productB", value: 300 },
  { name: "productC", value: 200 },
  { name: "productD", value: 100 },
]

export default function TopProductsChart() {
  const t = useTranslations("dashboard.overview")

  const chartConfig = {
    value: {
      label: "Value",
    },
    productA: {
      label: t("charts.topProducts.productA"),
      color: "var(--chart-1)",
    },
    productB: {
      label: t("charts.topProducts.productB"),
      color: "var(--chart-2)",
    },
    productC: {
      label: t("charts.topProducts.productC"),
      color: "var(--chart-3)",
    },
    productD: {
      label: t("charts.topProducts.productD"),
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig
  
  const totalValue = React.useMemo(() => {
    return topProductsData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("charts.topProducts.title")}</CardTitle>
        <CardDescription>{t("charts.topProducts.description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={topProductsData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {topProductsData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={`var(--color-${entry.name})`}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {t("charts.topProducts.total")}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

