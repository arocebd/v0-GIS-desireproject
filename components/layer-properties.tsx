"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Layer } from "./layer-management"

interface LayerPropertiesProps {
  layer: Layer | null
  onUpdateOpacity: (id: string, opacity: number) => void
  onUpdateColor: (id: string, color: string) => void
}

export function LayerProperties({ layer, onUpdateOpacity, onUpdateColor }: LayerPropertiesProps) {
  if (!layer) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <p className="text-sm text-muted-foreground text-center">Select a layer to view properties</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Properties</h3>
        <p className="text-xs text-muted-foreground mt-1">{layer.name}</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Basic Information</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Layer Name</Label>
                <Input value={layer.name} className="bg-background border-border" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Badge variant="secondary" className="capitalize">
                  {layer.type}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Source</Label>
                <p className="text-sm text-foreground font-mono">{layer.source}</p>
              </div>

              {layer.features && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Features</Label>
                  <p className="text-sm text-foreground">{layer.features.toLocaleString()}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Appearance */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Appearance</h4>
            <Card className="p-3 bg-secondary border-border space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Opacity</Label>
                  <span className="text-xs text-foreground">{Math.round(layer.opacity * 100)}%</span>
                </div>
                <Slider
                  value={[layer.opacity * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => onUpdateOpacity(layer.id, value[0] / 100)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={layer.color}
                    onChange={(e) => onUpdateColor(layer.id, e.target.value)}
                    className="w-16 h-10 p-1 bg-background border-border cursor-pointer"
                  />
                  <Input value={layer.color} className="flex-1 bg-background border-border font-mono" readOnly />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Visible</Label>
                <Switch checked={layer.visible} />
              </div>
            </Card>
          </div>

          {/* Rendering */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Rendering</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Blend Mode</Label>
                <Select defaultValue="normal">
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="multiply">Multiply</SelectItem>
                    <SelectItem value="screen">Screen</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Min Zoom</Label>
                <Input type="number" defaultValue="0" className="bg-background border-border" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Max Zoom</Label>
                <Input type="number" defaultValue="22" className="bg-background border-border" />
              </div>
            </Card>
          </div>

          {/* Data Filters */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Data Filters</h4>
            <Card className="p-3 bg-secondary border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Filter Expression</Label>
                <Input
                  placeholder="e.g., population > 1000"
                  className="bg-background border-border font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Enable Clustering</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Show Labels</Label>
                <Switch defaultChecked />
              </div>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Statistics</h4>
            <Card className="p-3 bg-secondary border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Memory Usage</span>
                <span className="text-xs text-foreground font-medium">2.4 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Render Time</span>
                <span className="text-xs text-foreground font-medium">45 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last Updated</span>
                <span className="text-xs text-foreground font-medium">2 hours ago</span>
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
