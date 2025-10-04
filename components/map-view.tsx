"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 })
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    // Initialize map (using placeholder for now - in production would use Leaflet or Mapbox)
    if (mapRef.current) {
      // Map initialization logic would go here
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-full w-full bg-muted"
        style={{
          backgroundImage: `url('/dark-topographic-map-with-blue-accents.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Map Overlay Info */}
        <Card className="absolute bottom-4 left-4 p-3 bg-card/95 backdrop-blur-sm border-border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Lat:</span>
              <span className="font-mono text-foreground">{coordinates.lat.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Lng:</span>
              <span className="font-mono text-foreground">{coordinates.lng.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Zoom:</span>
              <span className="font-mono text-foreground">{zoom}</span>
            </div>
          </div>
        </Card>

        {/* Scale Bar */}
        <div className="absolute bottom-4 right-4">
          <Card className="p-2 bg-card/95 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 bg-foreground" />
              <span className="text-xs text-muted-foreground">5 km</span>
            </div>
          </Card>
        </div>

        {/* Active Layers Badge */}
        <div className="absolute top-20 right-4">
          <Badge variant="secondary" className="bg-card/95 backdrop-blur-sm">
            3 Active Layers
          </Badge>
        </div>
      </div>
    </div>
  )
}
