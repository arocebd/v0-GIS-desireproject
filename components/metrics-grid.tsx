"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Users, MapPin, Activity, Database } from "lucide-react"

export function MetricsGrid() {
  const metrics = [
    {
      title: "Total Data Points",
      value: "2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: Database,
      color: "text-chart-1",
    },
    {
      title: "Active Locations",
      value: "18,429",
      change: "+8.2%",
      trend: "up",
      icon: MapPin,
      color: "text-chart-2",
    },
    {
      title: "Population Covered",
      value: "4.2M",
      change: "+3.1%",
      trend: "up",
      icon: Users,
      color: "text-chart-3",
    },
    {
      title: "Analysis Jobs",
      value: "1,284",
      change: "-2.4%",
      trend: "down",
      icon: Activity,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {metric.trend === "up" ? (
                <ArrowUp className="h-3 w-3 text-accent" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${metric.trend === "up" ? "text-accent" : "text-destructive"}`}>
                {metric.change}
              </span>
              <span className="text-xs text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
