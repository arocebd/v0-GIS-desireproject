"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartBuilderHeader } from "./chart-builder-header"
import { ChartTypeSelector } from "./chart-type-selector"
import { DataFieldSelector } from "./data-field-selector"
import { ChartPreview } from "./chart-preview"
import { ChartConfigPanel } from "./chart-config-panel"
import { PanelLeftClose, PanelLeft } from "lucide-react"

export type ChartType = "bar" | "line" | "area" | "pie" | "scatter" | "heatmap" | "treemap" | "funnel"

export function ChartBuilder() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [selectedChartType, setSelectedChartType] = useState<ChartType>("bar")
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <ChartBuilderHeader />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chart Types & Data */}
        <div
          className={`${
            leftPanelOpen ? "w-80" : "w-0"
          } transition-all duration-300 overflow-hidden border-r border-border bg-card`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Chart Builder</h3>
              <p className="text-xs text-muted-foreground mt-1">Design custom visualizations</p>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                <ChartTypeSelector selectedType={selectedChartType} onSelectType={setSelectedChartType} />
                <DataFieldSelector selectedFields={selectedFields} onSelectFields={setSelectedFields} />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Center Panel - Chart Preview */}
        <div className="flex-1 relative bg-background">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 left-4 z-10"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          >
            {leftPanelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          >
            {rightPanelOpen ? (
              <PanelLeftClose className="h-4 w-4 rotate-180" />
            ) : (
              <PanelLeft className="h-4 w-4 rotate-180" />
            )}
          </Button>

          <ChartPreview chartType={selectedChartType} fields={selectedFields} />
        </div>

        {/* Right Panel - Configuration */}
        <div
          className={`${
            rightPanelOpen ? "w-80" : "w-0"
          } transition-all duration-300 overflow-hidden border-l border-border bg-card`}
        >
          <ChartConfigPanel chartType={selectedChartType} />
        </div>
      </div>
    </div>
  )
}
