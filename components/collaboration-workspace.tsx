"use client"

import { useState } from "react"
import { CollaborationHeader } from "./collaboration-header"
import { CollaborationToolbar } from "./collaboration-toolbar"
import { CollaborationCanvas } from "./collaboration-canvas"
import { CollaborationSidebar } from "./collaboration-sidebar"
import { Button } from "@/components/ui/button"
import { PanelRight, PanelRightClose } from "lucide-react"

export type Tool = "select" | "sticky" | "text" | "shape" | "connector" | "draw" | "comment"

export function CollaborationWorkspace() {
  const [activeTool, setActiveTool] = useState<Tool>("select")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <CollaborationHeader />

      <div className="flex-1 flex overflow-hidden relative">
        <CollaborationToolbar activeTool={activeTool} onSelectTool={setActiveTool} />

        <div className="flex-1 relative">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>

          <CollaborationCanvas activeTool={activeTool} />
        </div>

        <div
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } transition-all duration-300 overflow-hidden border-l border-border bg-card`}
        >
          <CollaborationSidebar />
        </div>
      </div>
    </div>
  )
}
