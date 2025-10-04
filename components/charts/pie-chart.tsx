"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Residential", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Commercial", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Industrial", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Parks", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 13, color: "hsl(var(--chart-5))" },
]

export function PieChartComponent() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Percentage",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
