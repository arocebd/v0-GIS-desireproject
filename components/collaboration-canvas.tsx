"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import type { Tool } from "./collaboration-workspace"

interface CollaborationCanvasProps {
  activeTool: Tool
}

interface CanvasItem {
  id: string
  type: "sticky" | "text" | "shape"
  x: number
  y: number
  content: string
  color: string
}

export function CollaborationCanvas({ activeTool }: CollaborationCanvasProps) {
  const [items, setItems] = useState<CanvasItem[]>([
    {
      id: "1",
      type: "sticky",
      x: 100,
      y: 100,
      content: "Population Analysis",
      color: "bg-yellow-500/20 border-yellow-500",
    },
    {
      id: "2",
      type: "sticky",
      x: 300,
      y: 100,
      content: "Traffic Patterns",
      color: "bg-blue-500/20 border-blue-500",
    },
    {
      id: "3",
      type: "sticky",
      x: 500,
      y: 100,
      content: "Land Use Distribution",
      color: "bg-green-500/20 border-green-500",
    },
    {
      id: "4",
      type: "sticky",
      x: 200,
      y: 300,
      content: "Key Insights:\n- High density in downtown\n- Traffic peaks at 5pm",
      color: "bg-purple-500/20 border-purple-500",
    },
    {
      id: "5",
      type: "text",
      x: 100,
      y: 500,
      content: "Next Steps: Review data sources and validate findings",
      color: "text-foreground",
    },
  ])

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === "sticky") {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newItem: CanvasItem = {
        id: Date.now().toString(),
        type: "sticky",
        x,
        y,
        content: "New Note",
        color: "bg-yellow-500/20 border-yellow-500",
      }

      setItems([...items, newItem])
    }
  }

  return (
    <div
      className="h-full w-full bg-muted/30 relative overflow-auto"
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--border)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
      onClick={handleCanvasClick}
    >
      {/* Canvas Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute cursor-move"
          style={{
            left: item.x,
            top: item.y,
          }}
        >
          {item.type === "sticky" && (
            <Card className={`w-48 h-32 p-3 ${item.color} border-2 shadow-lg`}>
              <p className="text-sm text-foreground whitespace-pre-wrap">{item.content}</p>
            </Card>
          )}
          {item.type === "text" && <p className={`text-sm ${item.color} max-w-md`}>{item.content}</p>}
        </div>
      ))}

      {/* Cursor Indicator */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
        <p className="text-xs text-muted-foreground">
          Active Tool: <span className="text-foreground font-medium capitalize">{activeTool}</span>
        </p>
      </div>
    </div>
  )
}
