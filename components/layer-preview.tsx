"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Layer } from "./layer-management"

interface LayerPreviewProps {
  layers: Layer[]
}

export function LayerPreview({ layers }: LayerPreviewProps) {
  const visibleLayers = layers.filter((layer) => layer.visible)

  return (
    <div className="h-full w-full bg-muted/30 relative">
      {/* Map Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Layer Visualization */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <Card className="w-full max-w-4xl h-full bg-card/95 backdrop-blur-sm border-border p-6">
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Map Preview</h3>
              <p className="text-sm text-muted-foreground">
                {visibleLayers.length} of {layers.length} layers visible
              </p>
            </div>

            <div className="flex-1 relative bg-muted/50 rounded-lg overflow-hidden">
              {/* Simulated Map Layers */}
              {visibleLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: layer.opacity,
                    zIndex: visibleLayers.length - index,
                  }}
                >
                  {layer.type === "heatmap" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-96 h-96 rounded-full blur-3xl"
                        style={{
                          background: `radial-gradient(circle, ${layer.color}80 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                  )}

                  {layer.type === "vector" && (
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d="M 100 200 Q 200 100 300 200 T 500 200"
                        stroke={layer.color}
                        strokeWidth="3"
                        fill="none"
                        opacity={layer.opacity}
                      />
                      <path
                        d="M 150 300 Q 250 200 350 300 T 550 300"
                        stroke={layer.color}
                        strokeWidth="3"
                        fill="none"
                        opacity={layer.opacity}
                      />
                    </svg>
                  )}

                  {layer.type === "cluster" && (
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: layer.color,
                            left: `${20 + i * 10}%`,
                            top: `${30 + (i % 3) * 20}%`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {layer.type === "3d" && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="relative"
                          style={{
                            width: "40px",
                            height: `${80 + i * 20}px`,
                            backgroundColor: layer.color,
                            transform: "perspective(500px) rotateY(20deg)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {visibleLayers.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">No visible layers</p>
                </div>
              )}
            </div>

            {/* Layer Stack Indicator */}
            <div className="mt-4 flex flex-wrap gap-2">
              {visibleLayers.map((layer) => (
                <Badge key={layer.id} variant="secondary" className="gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: layer.color }} />
                  {layer.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
