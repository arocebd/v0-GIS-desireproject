"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, LineChart, AreaChart, PieChart, ScatterChart, Flame, Grid3x3, Filter } from "lucide-react"
import type { ChartType } from "./chart-builder"

interface ChartTypeSelectorProps {
  selectedType: ChartType
  onSelectType: (type: ChartType) => void
}

export function ChartTypeSelector({ selectedType, onSelectType }: ChartTypeSelectorProps) {
  const chartTypes = [
    { type: "bar" as ChartType, label: "Bar Chart", icon: BarChart3 },
    { type: "line" as ChartType, label: "Line Chart", icon: LineChart },
    { type: "area" as ChartType, label: "Area Chart", icon: AreaChart },
    { type: "pie" as ChartType, label: "Pie Chart", icon: PieChart },
    { type: "scatter" as ChartType, label: "Scatter Plot", icon: ScatterChart },
    { type: "heatmap" as ChartType, label: "Heat Map", icon: Flame },
    { type: "treemap" as ChartType, label: "Tree Map", icon: Grid3x3 },
    { type: "funnel" as ChartType, label: "Funnel Chart", icon: Filter },
  ]

  return (
    <div>
      <h4 className="text-sm font-medium text-foreground mb-3">Chart Type</h4>
      <div className="grid grid-cols-2 gap-2">
        {chartTypes.map((chart) => (
          <Card
            key={chart.type}
            className={`p-3 cursor-pointer transition-all hover:border-primary ${
              selectedType === chart.type ? "bg-primary/10 border-primary" : "bg-secondary border-border"
            }`}
            onClick={() => onSelectType(chart.type)}
          >
            <div className="flex flex-col items-center gap-2">
              <chart.icon
                className={`h-5 w-5 ${selectedType === chart.type ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`text-xs font-medium ${selectedType === chart.type ? "text-primary" : "text-foreground"}`}
              >
                {chart.label}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
