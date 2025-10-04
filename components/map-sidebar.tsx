"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Layers, Database, Search, MapPin, TrendingUp, Users, Eye, EyeOff } from "lucide-react"

export function MapSidebar() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Population Density", visible: true, type: "heatmap" },
    { id: 2, name: "Transportation Routes", visible: true, type: "vector" },
    { id: 3, name: "Commercial Zones", visible: true, type: "polygon" },
    { id: 4, name: "Satellite Imagery", visible: false, type: "raster" },
    { id: 5, name: "Weather Data", visible: false, type: "overlay" },
  ])

  const toggleLayer = (id: number) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">GIS Analytics</h2>
        <p className="text-sm text-muted-foreground">Geospatial Intelligence Platform</p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations, datasets..." className="pl-9 bg-secondary border-border" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="layers" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-[calc(100%-2rem)] grid-cols-3 bg-secondary">
          <TabsTrigger value="layers" className="text-xs">
            <Layers className="h-3 w-3 mr-1" />
            Layers
          </TabsTrigger>
          <TabsTrigger value="data" className="text-xs">
            <Database className="h-3 w-3 mr-1" />
            Data
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="layers" className="p-4 space-y-2 mt-0">
            {layers.map((layer) => (
              <Card key={layer.id} className="p-3 bg-secondary border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleLayer(layer.id)}>
                      {layer.visible ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{layer.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{layer.type}</p>
                    </div>
                  </div>
                  <Switch checked={layer.visible} onCheckedChange={() => toggleLayer(layer.id)} />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="data" className="p-4 space-y-2 mt-0">
            <Card className="p-4 bg-secondary border-border">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Connected Datasets</h3>
                  <p className="text-sm text-muted-foreground mt-1">12 active data sources</p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-primary">
                    Manage connections
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-secondary border-border">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Geocoding Service</h3>
                  <p className="text-sm text-muted-foreground mt-1">Convert addresses to coordinates</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="p-4 space-y-2 mt-0">
            <Card className="p-4 bg-secondary border-border">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-chart-1 mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Spatial Analysis</h3>
                  <p className="text-sm text-muted-foreground mt-1">Run proximity, clustering, and heat map analysis</p>
                  <Button size="sm" className="mt-3 bg-primary text-primary-foreground">
                    Open Dashboard
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-secondary border-border">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-chart-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Collaboration</h3>
                  <p className="text-sm text-muted-foreground mt-1">Share insights with your team</p>
                  <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                    Invite Team
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
