"use client"

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
  { x: 180, y: 350, z: 450 },
  { x: 130, y: 180, z: 300 },
]

export function ScatterChartComponent() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Data Points",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" dataKey="x" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis type="number" dataKey="y" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <ZAxis type="number" dataKey="z" range={[60, 400]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter data={data} fill="var(--color-value)" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
