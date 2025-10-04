"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Clock, Send } from "lucide-react"

export function CollaborationSidebar() {
  const comments = [
    {
      user: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      time: "2 min ago",
      content: "Great analysis on the population density patterns!",
    },
    {
      user: "Sarah Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      time: "5 min ago",
      content: "Should we add more data points for the traffic analysis?",
    },
    {
      user: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      time: "10 min ago",
      content: "The heat map visualization looks perfect for this dataset.",
    },
  ]

  const activities = [
    { user: "Alex Chen", action: "added a sticky note", time: "1 min ago" },
    { user: "Sarah Kim", action: "created a connector", time: "3 min ago" },
    { user: "Mike Johnson", action: "uploaded an image", time: "7 min ago" },
    { user: "Alex Chen", action: "commented on Population Analysis", time: "12 min ago" },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Collaboration</h3>
        <p className="text-xs text-muted-foreground mt-1">Team activity and discussions</p>
      </div>

      <Tabs defaultValue="comments" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-[calc(100%-2rem)] grid-cols-3 bg-secondary">
          <TabsTrigger value="comments" className="text-xs">
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="team" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            Team
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Activity
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="comments" className="p-4 space-y-4 mt-0">
            {comments.map((comment, i) => (
              <Card key={i} className="p-3 bg-secondary border-border">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {comment.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">{comment.user}</p>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1 bg-background border-border" />
              <Button size="icon" className="bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="team" className="p-4 space-y-2 mt-0">
            <Card className="p-3 bg-secondary border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">Alex Chen</p>
                    <p className="text-xs text-muted-foreground">Project Lead</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent">
                  Active
                </Badge>
              </div>
            </Card>

            <Card className="p-3 bg-secondary border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-primary text-primary-foreground">SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sarah Kim</p>
                    <p className="text-xs text-muted-foreground">Data Analyst</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent">
                  Active
                </Badge>
              </div>
            </Card>

            <Card className="p-3 bg-secondary border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-primary text-primary-foreground">MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">Mike Johnson</p>
                    <p className="text-xs text-muted-foreground">GIS Specialist</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  Idle
                </Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="p-4 space-y-3 mt-0">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
