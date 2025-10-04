"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MousePointer,
  StickyNote,
  Type,
  Square,
  ArrowRight,
  Pencil,
  MessageCircle,
  ImageIcon,
  Trash2,
} from "lucide-react"
import type { Tool } from "./collaboration-workspace"

interface CollaborationToolbarProps {
  activeTool: Tool
  onSelectTool: (tool: Tool) => void
}

export function CollaborationToolbar({ activeTool, onSelectTool }: CollaborationToolbarProps) {
  const tools = [
    { id: "select" as Tool, icon: MousePointer, label: "Select" },
    { id: "sticky" as Tool, icon: StickyNote, label: "Sticky Note" },
    { id: "text" as Tool, icon: Type, label: "Text" },
    { id: "shape" as Tool, icon: Square, label: "Shape" },
    { id: "connector" as Tool, icon: ArrowRight, label: "Connector" },
    { id: "draw" as Tool, icon: Pencil, label: "Draw" },
    { id: "comment" as Tool, icon: MessageCircle, label: "Comment" },
  ]

  return (
    <div className="w-16 border-r border-border bg-card flex flex-col items-center py-4 gap-2">
      {tools.map((tool, index) => (
        <div key={tool.id}>
          <Button
            variant={activeTool === tool.id ? "default" : "ghost"}
            size="icon"
            className={`h-10 w-10 ${activeTool === tool.id ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => onSelectTool(tool.id)}
            title={tool.label}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
          {index === 0 && <Separator className="my-2 w-8 mx-auto" />}
        </div>
      ))}

      <div className="flex-1" />

      <Separator className="my-2 w-8 mx-auto" />

      <Button variant="ghost" size="icon" className="h-10 w-10" title="Add Image">
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive" title="Delete">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
