"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cloud, Car, Flame, Wind, Plus, RefreshCw, Trash2 } from "lucide-react"

interface DataSource {
  id: string
  name: string
  type: "weather" | "traffic" | "fire" | "wind" | "custom"
  url: string
  refreshInterval: number
  enabled: boolean
  status: "active" | "error" | "pending"
  lastUpdate: Date | null
  dataPoints: number
}

const defaultSources: DataSource[] = [
  {
    id: "1",
    name: "NOAA Weather Data",
    type: "weather",
    url: "https://api.weather.gov/gridpoints",
    refreshInterval: 300,
    enabled: true,
    status: "active",
    lastUpdate: new Date(),
    dataPoints: 1247,
  },
  {
    id: "2",
    name: "Traffic Flow API",
    type: "traffic",
    url: "https://api.traffic.com/v1/flow",
    refreshInterval: 180,
    enabled: true,
    status: "active",
    lastUpdate: new Date(),
    dataPoints: 892,
  },
  {
    id: "3",
    name: "Wildfire Incidents",
    type: "fire",
    url: "https://api.fire.gov/incidents",
    refreshInterval: 600,
    enabled: true,
    status: "active",
    lastUpdate: new Date(),
    dataPoints: 34,
  },
  {
    id: "4",
    name: "Wind Pattern Data",
    type: "wind",
    url: "https://api.wind.com/patterns",
    refreshInterval: 300,
    enabled: false,
    status: "pending",
    lastUpdate: null,
    dataPoints: 0,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "weather":
      return <Cloud className="h-5 w-5" />
    case "traffic":
      return <Car className="h-5 w-5" />
    case "fire":
      return <Flame className="h-5 w-5" />
    case "wind":
      return <Wind className="h-5 w-5" />
    default:
      return <Plus className="h-5 w-5" />
  }
}

export function DataSourcesManager() {
  const [sources, setSources] = useState<DataSource[]>(defaultSources)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSource, setNewSource] = useState({
    name: "",
    type: "custom" as DataSource["type"],
    url: "",
    refreshInterval: 300,
  })

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []

    sources.forEach((source) => {
      if (source.enabled) {
        const interval = setInterval(() => {
          setSources((prev) =>
            prev.map((s) =>
              s.id === source.id
                ? {
                    ...s,
                    lastUpdate: new Date(),
                    dataPoints: s.dataPoints + Math.floor(Math.random() * 10),
                    status: Math.random() > 0.95 ? "error" : "active",
                  }
                : s,
            ),
          )
        }, source.refreshInterval * 1000)

        intervals.push(interval)
      }
    })

    return () => intervals.forEach(clearInterval)
  }, [sources])

  const toggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled, status: !s.enabled ? "active" : "pending" } : s)),
    )
  }

  const refreshSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, lastUpdate: new Date(), dataPoints: s.dataPoints + Math.floor(Math.random() * 50) } : s,
      ),
    )
  }

  const deleteSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id))
  }

  const addSource = () => {
    if (newSource.name && newSource.url) {
      const source: DataSource = {
        id: Date.now().toString(),
        ...newSource,
        enabled: false,
        status: "pending",
        lastUpdate: null,
        dataPoints: 0,
      }
      setSources((prev) => [...prev, source])
      setNewSource({ name: "", type: "custom", url: "", refreshInterval: 300 })
      setShowAddForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Real-Time Data Sources</h1>
            <p className="text-muted-foreground mt-1">Manage live API connections and data feeds</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Source
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-6 border-primary/20">
            <h3 className="text-lg font-semibold mb-4">Add New Data Source</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Source Name</Label>
                <Input
                  id="name"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="My Custom Data Source"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newSource.type}
                  onValueChange={(value: any) => setNewSource({ ...newSource, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather">Weather</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="wind">Wind</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="url">API URL</Label>
                <Input
                  id="url"
                  value={newSource.url}
                  onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                  placeholder="https://api.example.com/data"
                />
              </div>
              <div>
                <Label htmlFor="interval">Refresh Interval (seconds)</Label>
                <Input
                  id="interval"
                  type="number"
                  value={newSource.refreshInterval}
                  onChange={(e) => setNewSource({ ...newSource, refreshInterval: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addSource}>Add Source</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {sources.map((source) => (
            <Card key={source.id} className="p-6 border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-muted">{getIcon(source.type)}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{source.name}</h2>
                    <p className="text-sm text-muted-foreground">{source.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => refreshSource(source.id)}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Switch checked={source.enabled} onCheckedChange={() => toggleSource(source.id)} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      source.status === "active" ? "success" : source.status === "error" ? "destructive" : "default"
                    }
                  >
                    {source.status}
                  </Badge>
                  {source.lastUpdate && (
                    <span className="text-sm text-muted-foreground">
                      Last Update: {source.lastUpdate.toLocaleTimeString()}
                    </span>
                  )}
                </div>
                <Button variant="outline" onClick={() => deleteSource(source.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
