"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Upload, Download, Save, Settings } from "lucide-react"

export function LayerManagementHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">Layer Management</h2>
          <Input placeholder="Search layers..." className="w-64 bg-secondary border-border" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Upload className="h-3 w-3" />
            Import
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Download className="h-3 w-3" />
            Export
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Settings className="h-3 w-3" />
            Settings
          </Button>

          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-3 w-3" />
            Add Layer
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
