"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Share2, Download, Users, Video, MessageSquare } from "lucide-react"

export function CollaborationHeader() {
  const collaborators = [
    { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", status: "active" },
    { name: "Sarah Kim", avatar: "/placeholder.svg?height=32&width=32", status: "active" },
    { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", status: "idle" },
  ]

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Input defaultValue="GIS Strategy Session" className="w-64 bg-secondary border-border font-medium" />
          <Badge variant="secondary" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Collaborators */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {collaborators.map((user, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
              <Users className="h-3 w-3" />
              Invite
            </Button>
          </div>

          <div className="w-px h-6 bg-border" />

          {/* Actions */}
          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Video className="h-3 w-3" />
            Call
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <MessageSquare className="h-3 w-3" />
            Chat
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border">
            <Download className="h-3 w-3" />
            Export
          </Button>

          <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
            <Share2 className="h-3 w-3" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
