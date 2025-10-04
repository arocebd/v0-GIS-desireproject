"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, GripVertical, Trash2, Layers, Box, Flame, Grid3x3, MapPin } from "lucide-react"
import type { Layer } from "./layer-management"

interface LayerListProps {
  layers: Layer[]
  selectedLayer: Layer | null
  onSelectLayer: (layer: Layer) => void
  onToggleVisibility: (id: string) => void
  onDeleteLayer: (id: string) => void
}

export function LayerList({ layers, selectedLayer, onSelectLayer, onToggleVisibility, onDeleteLayer }: LayerListProps) {
  const getLayerIcon = (type: Layer["type"]) => {
    switch (type) {
      case "vector":
        return Layers
      case "raster":
        return Grid3x3
      case "heatmap":
        return Flame
      case "cluster":
        return MapPin
      case "3d":
        return Box
      default:
        return Layers
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Layers</h3>
        <p className="text-xs text-muted-foreground mt-1">{layers.length} layers in project</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {layers.map((layer) => {
            const Icon = getLayerIcon(layer.type)
            return (
              <Card
                key={layer.id}
                className={`p-3 cursor-pointer transition-all ${
                  selectedLayer?.id === layer.id
                    ? "bg-primary/10 border-primary"
                    : "bg-secondary border-border hover:bg-secondary/80"
                }`}
                onClick={() => onSelectLayer(layer)}
              >
                <div className="flex items-start gap-3">
                  <Button variant="ghost" size="icon" className="h-6 w-6 cursor-grab">
                    <GripVertical className="h-3 w-3 text-muted-foreground" />
                  </Button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground truncate">{layer.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {layer.type}
                      </Badge>
                      {layer.features && (
                        <span className="text-xs text-muted-foreground">
                          {layer.features.toLocaleString()} features
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <div
                        className="h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="text-xs text-muted-foreground">{Math.round(layer.opacity * 100)}% opacity</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleVisibility(layer.id)
                      }}
                    >
                      {layer.visible ? (
                        <Eye className="h-3 w-3 text-foreground" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteLayer(layer.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
