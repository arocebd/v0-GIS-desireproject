"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Share2, Download, Play, Undo, Redo } from "lucide-react"

export function ChartBuilderHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Input defaultValue="Untitled Visualization" className="w-64 bg-secondary border-border font-medium" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Play className="h-3 w-3" />
            Run Query
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Download className="h-3 w-3" />
            Export
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Share2 className="h-3 w-3" />
            Share
          </Button>

          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Save className="h-3 w-3" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
