"use client"

import { Card } from "@/components/ui/card"
import type { ChartType } from "./chart-builder"
import { BarChartComponent } from "./charts/bar-chart"
import { LineChartComponent } from "./charts/line-chart"
import { AreaChartComponent } from "./charts/area-chart"
import { PieChartComponent } from "./charts/pie-chart"
import { ScatterChartComponent } from "./charts/scatter-chart"
import { HeatMapComponent } from "./charts/heatmap-chart"

interface ChartPreviewProps {
  chartType: ChartType
  fields: string[]
}

export function ChartPreview({ chartType, fields }: ChartPreviewProps) {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChartComponent />
      case "line":
        return <LineChartComponent />
      case "area":
        return <AreaChartComponent />
      case "pie":
        return <PieChartComponent />
      case "scatter":
        return <ScatterChartComponent />
      case "heatmap":
        return <HeatMapComponent />
      case "treemap":
        return <div className="flex items-center justify-center h-full text-muted-foreground">Tree Map Preview</div>
      case "funnel":
        return <div className="flex items-center justify-center h-full text-muted-foreground">Funnel Chart Preview</div>
      default:
        return <div className="flex items-center justify-center h-full text-muted-foreground">Select a chart type</div>
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <Card className="w-full h-full bg-card border-border p-6">
        <div className="h-full flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground capitalize">{chartType} Chart</h3>
            <p className="text-sm text-muted-foreground">
              {fields.length > 0 ? `Using ${fields.length} field(s)` : "Select fields to visualize"}
            </p>
          </div>
          <div className="flex-1">{renderChart()}</div>
        </div>
      </Card>
    </div>
  )
}
