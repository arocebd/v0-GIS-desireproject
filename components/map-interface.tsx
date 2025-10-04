"use client"

import { useState } from "react"
import { MapView } from "./map-view"
import { MapSidebar } from "./map-sidebar"
import { MapToolbar } from "./map-toolbar"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeft } from "lucide-react"

export function MapInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="relative h-full w-full flex bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 overflow-hidden border-r border-border bg-card`}
      >
        <MapSidebar />
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* Toolbar */}
        <MapToolbar />

        {/* Sidebar Toggle */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>

        {/* Map */}
        <MapView />
      </div>
    </div>
  )
}
