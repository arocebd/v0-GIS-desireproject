"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  Share2,
  Settings,
  Ruler,
  MousePointer,
  Hand,
  Circle,
  Square,
} from "lucide-react"

export function MapToolbar() {
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
      {/* Drawing Tools */}
      <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Select">
          <MousePointer className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Pan">
          <Hand className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Measure">
          <Ruler className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Draw">
              <Circle className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem>
              <Circle className="h-4 w-4 mr-2" />
              Circle
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Square className="h-4 w-4 mr-2" />
              Rectangle
            </DropdownMenuItem>
            <DropdownMenuItem>Polygon</DropdownMenuItem>
            <DropdownMenuItem>Line</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Fit to Screen">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Export">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
