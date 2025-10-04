"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Download, Filter, RefreshCw, Settings } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time geospatial intelligence and insights</p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-secondary border-border">
                <Calendar className="h-4 w-4" />
                Last 30 Days
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem>Last Year</DropdownMenuItem>
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="bg-secondary border-border">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="bg-secondary border-border">
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="bg-secondary border-border">
            <Download className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="bg-secondary border-border">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
