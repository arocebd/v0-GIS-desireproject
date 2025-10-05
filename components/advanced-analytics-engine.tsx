"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Map, FileJson, FileSpreadsheet, FileText } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const timeSeriesData = [
  { month: "Jan", traffic: 4000, temperature: 32, incidents: 12 },
  { month: "Feb", traffic: 3000, temperature: 35, incidents: 8 },
  { month: "Mar", traffic: 5000, temperature: 45, incidents: 15 },
  { month: "Apr", traffic: 7000, temperature: 58, incidents: 20 },
  { month: "May", traffic: 6000, temperature: 68, incidents: 18 },
  { month: "Jun", traffic: 8000, temperature: 78, incidents: 25 },
  { month: "Jul", traffic: 9000, temperature: 85, incidents: 30 },
  { month: "Aug", traffic: 8500, temperature: 83, incidents: 28 },
  { month: "Sep", traffic: 7000, temperature: 72, incidents: 22 },
  { month: "Oct", traffic: 6000, temperature: 60, incidents: 16 },
  { month: "Nov", traffic: 4500, temperature: 48, incidents: 10 },
  { month: "Dec", traffic: 3500, temperature: 38, incidents: 7 },
]

const heatmapData = [
  { region: "North", density: 85, transactions: 1200 },
  { region: "South", density: 65, transactions: 800 },
  { region: "East", density: 92, transactions: 1500 },
  { region: "West", density: 78, transactions: 1100 },
  { region: "Central", density: 95, transactions: 1800 },
]

export function AdvancedAnalyticsEngine() {
  const [analysisType, setAnalysisType] = useState("timeseries")
  const [exportFormat, setExportFormat] = useState("geojson")

  const handleExport = () => {
    const data = analysisType === "timeseries" ? timeSeriesData : heatmapData
    const filename = `analytics-${analysisType}-${Date.now()}`

    let content = ""
    let mimeType = ""

    switch (exportFormat) {
      case "geojson":
        content = JSON.stringify(
          {
            type: "FeatureCollection",
            features: data.map((item, idx) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [-122.4 + idx * 0.1, 37.8 + idx * 0.1] },
              properties: item,
            })),
          },
          null,
          2,
        )
        mimeType = "application/geo+json"
        break
      case "csv":
        const headers = Object.keys(data[0]).join(",")
        const rows = data.map((item) => Object.values(item).join(","))
        content = [headers, ...rows].join("\n")
        mimeType = "text/csv"
        break
      case "excel":
        content = JSON.stringify(data, null, 2)
        mimeType = "application/json"
        break
      case "pdf":
        content = `Analytics Report\n\n${JSON.stringify(data, null, 2)}`
        mimeType = "text/plain"
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.${exportFormat}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Analytics Engine</h1>
            <p className="text-muted-foreground mt-1">Heatmaps, time-series analysis, and data exports</p>
          </div>
          <div className="flex gap-2">
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geojson">
                  <div className="flex items-center gap-2">
                    <FileJson className="h-4 w-4" />
                    GeoJSON
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    CSV
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={analysisType} onValueChange={setAnalysisType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeseries">
              <TrendingUp className="h-4 w-4 mr-2" />
              Time-Series Analysis
            </TabsTrigger>
            <TabsTrigger value="heatmap">
              <Map className="h-4 w-4 mr-2" />
              Heatmap Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeseries" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Traffic Changes Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Temperature Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="temperature" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Incident Frequency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Bar dataKey="incidents" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Transaction Density by Region</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={heatmapData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Bar dataKey="density" fill="#ef4444" />
                  <Bar dataKey="transactions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {heatmapData.map((region) => (
                <Card key={region.region} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{region.region} Region</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Density</span>
                      <span className="font-semibold">{region.density}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-semibold">{region.transactions}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${region.density}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
