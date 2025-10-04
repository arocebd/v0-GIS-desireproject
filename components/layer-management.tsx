"use client"

import { useState } from "react"
import { LayerManagementHeader } from "./layer-management-header"
import { LayerList } from "./layer-list"
import { LayerProperties } from "./layer-properties"
import { LayerPreview } from "./layer-preview"

export interface Layer {
  id: string
  name: string
  type: "vector" | "raster" | "heatmap" | "cluster" | "3d"
  visible: boolean
  opacity: number
  color: string
  source: string
  features?: number
}

export function LayerManagement() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "1",
      name: "Population Density",
      type: "heatmap",
      visible: true,
      opacity: 0.8,
      color: "#ef4444",
      source: "census_data.geojson",
      features: 1250,
    },
    {
      id: "2",
      name: "Traffic Flow",
      type: "vector",
      visible: true,
      opacity: 0.9,
      color: "#3b82f6",
      source: "traffic_routes.geojson",
      features: 850,
    },
    {
      id: "3",
      name: "Land Use Zones",
      type: "vector",
      visible: false,
      opacity: 0.7,
      color: "#10b981",
      source: "zoning_data.geojson",
      features: 420,
    },
    {
      id: "4",
      name: "Building Heights",
      type: "3d",
      visible: true,
      opacity: 1,
      color: "#8b5cf6",
      source: "buildings_3d.geojson",
      features: 3200,
    },
    {
      id: "5",
      name: "Points of Interest",
      type: "cluster",
      visible: true,
      opacity: 1,
      color: "#f59e0b",
      source: "poi_data.geojson",
      features: 5600,
    },
  ])

  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(layers[0])

  const toggleLayerVisibility = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  const updateLayerOpacity = (id: string, opacity: number) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, opacity } : layer)))
    if (selectedLayer?.id === id) {
      setSelectedLayer({ ...selectedLayer, opacity })
    }
  }

  const updateLayerColor = (id: string, color: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, color } : layer)))
    if (selectedLayer?.id === id) {
      setSelectedLayer({ ...selectedLayer, color })
    }
  }

  const deleteLayer = (id: string) => {
    setLayers(layers.filter((layer) => layer.id !== id))
    if (selectedLayer?.id === id) {
      setSelectedLayer(null)
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <LayerManagementHeader />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Layer List */}
        <div className="w-80 border-r border-border bg-card">
          <LayerList
            layers={layers}
            selectedLayer={selectedLayer}
            onSelectLayer={setSelectedLayer}
            onToggleVisibility={toggleLayerVisibility}
            onDeleteLayer={deleteLayer}
          />
        </div>

        {/* Center Panel - Map Preview */}
        <div className="flex-1">
          <LayerPreview layers={layers} />
        </div>

        {/* Right Panel - Layer Properties */}
        <div className="w-80 border-l border-border bg-card">
          <LayerProperties
            layer={selectedLayer}
            onUpdateOpacity={updateLayerOpacity}
            onUpdateColor={updateLayerColor}
          />
        </div>
      </div>
    </div>
  )
}
