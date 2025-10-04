"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnalyticsHeader } from "./analytics-header"
import { MetricsGrid } from "./metrics-grid"
import { DataTable } from "./data-table"
import { AreaChartComponent } from "./charts/area-chart"
import { BarChartComponent } from "./charts/bar-chart"
import { LineChartComponent } from "./charts/line-chart"
import { PieChartComponent } from "./charts/pie-chart"
import { LayoutGrid, Table, TrendingUp, Map } from "lucide-react"

export function AnalyticsDashboard() {
  const [view, setView] = useState<"overview" | "detailed">("overview")

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <AnalyticsHeader />

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <div className="border-b border-border px-6">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="spatial" className="gap-2">
                <Map className="h-4 w-4" />
                Spatial Analysis
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2">
                <Table className="h-4 w-4" />
                Data Explorer
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <TabsContent value="overview" className="p-6 space-y-6 mt-0">
              <MetricsGrid />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Population Growth</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Year-over-year population trends by region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AreaChartComponent />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Regional Distribution</CardTitle>
                    <CardDescription className="text-muted-foreground">Population density across zones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartComponent />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Traffic Patterns</CardTitle>
                    <CardDescription className="text-muted-foreground">Daily traffic volume over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChartComponent />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Land Use Distribution</CardTitle>
                    <CardDescription className="text-muted-foreground">Breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChartComponent />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spatial" className="p-6 space-y-6 mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Proximity Analysis</CardTitle>
                    <CardDescription className="text-muted-foreground">Distance-based insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Within 1km</span>
                        <span className="text-2xl font-bold text-chart-1">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Within 5km</span>
                        <span className="text-2xl font-bold text-chart-2">12,394</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Within 10km</span>
                        <span className="text-2xl font-bold text-chart-3">28,561</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Cluster Detection</CardTitle>
                    <CardDescription className="text-muted-foreground">Hot spot identification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">High Density</span>
                        <span className="text-2xl font-bold text-destructive">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Medium Density</span>
                        <span className="text-2xl font-bold text-chart-3">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Low Density</span>
                        <span className="text-2xl font-bold text-chart-2">23</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Coverage Analysis</CardTitle>
                    <CardDescription className="text-muted-foreground">Service area metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Area</span>
                        <span className="text-2xl font-bold text-foreground">847 km²</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Covered</span>
                        <span className="text-2xl font-bold text-accent">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Gaps</span>
                        <span className="text-2xl font-bold text-muted-foreground">8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Heat Map Analysis</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Intensity distribution across regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChartComponent />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="p-6 space-y-6 mt-0">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Historical Trends</CardTitle>
                  <CardDescription className="text-muted-foreground">Long-term pattern analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChartComponent />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Seasonal Patterns</CardTitle>
                    <CardDescription className="text-muted-foreground">Quarterly comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartComponent />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Growth Forecast</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Projected trends for next 12 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AreaChartComponent />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data" className="p-6 space-y-6 mt-0">
              <DataTable />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}
