"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import type { ChartType } from "./chart-builder"

interface ChartConfigPanelProps {
  chartType: ChartType
}

export function ChartConfigPanel({ chartType }: ChartConfigPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Configuration</h3>
        <p className="text-xs text-muted-foreground mt-1">Customize your visualization</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Title & Labels */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Title & Labels</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Chart Title</Label>
                <Input placeholder="Enter title..." className="bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">X-Axis Label</Label>
                <Input placeholder="X-axis label..." className="bg-background border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Y-Axis Label</Label>
                <Input placeholder="Y-axis label..." className="bg-background border-border" />
              </div>
            </Card>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Colors</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Color Scheme</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue Scale</SelectItem>
                    <SelectItem value="green">Green Scale</SelectItem>
                    <SelectItem value="warm">Warm Colors</SelectItem>
                    <SelectItem value="cool">Cool Colors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* Display Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Display Options</h4>
            <Card className="p-3 bg-secondary border-border space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Show Legend</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Show Grid</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Show Tooltips</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Animate</Label>
                <Switch />
              </div>
            </Card>
          </div>

          {/* Size & Spacing */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Size & Spacing</h4>
            <Card className="p-3 bg-secondary border-border space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Bar Width</Label>
                  <span className="text-xs text-foreground">50%</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Padding</Label>
                  <span className="text-xs text-foreground">20px</span>
                </div>
                <Slider defaultValue={[20]} max={50} step={1} className="w-full" />
              </div>
            </Card>
          </div>

          {/* Data Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Data Options</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Sort By</Label>
                <Select defaultValue="none">
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Limit Results</Label>
                <Input type="number" placeholder="10" className="bg-background border-border" />
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
