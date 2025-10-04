"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", volume: 1200 },
  { time: "04:00", volume: 800 },
  { time: "08:00", volume: 4500 },
  { time: "12:00", volume: 5200 },
  { time: "16:00", volume: 6100 },
  { time: "20:00", volume: 3800 },
  { time: "23:59", volume: 1500 },
]

export function LineChartComponent() {
  return (
    <ChartContainer
      config={{
        volume: {
          label: "Traffic Volume",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="volume" stroke="var(--color-volume)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
