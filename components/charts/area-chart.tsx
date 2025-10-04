"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", value: 186, forecast: 190 },
  { month: "Feb", value: 205, forecast: 210 },
  { month: "Mar", value: 237, forecast: 240 },
  { month: "Apr", value: 273, forecast: 275 },
  { month: "May", value: 309, forecast: 310 },
  { month: "Jun", value: 314, forecast: 320 },
]

export function AreaChartComponent() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Actual",
          color: "hsl(var(--chart-1))",
        },
        forecast: {
          label: "Forecast",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            fill="var(--color-value)"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="var(--color-forecast)"
            fill="var(--color-forecast)"
            fillOpacity={0.1}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
