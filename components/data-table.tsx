"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"

export function DataTable() {
  const data = [
    { id: 1, location: "Downtown District", population: 45820, area: 12.4, density: 3694 },
    { id: 2, location: "Riverside Zone", population: 32150, area: 18.7, density: 1719 },
    { id: 3, location: "Industrial Park", population: 8940, area: 24.1, density: 371 },
    { id: 4, location: "Suburban North", population: 67230, area: 45.8, density: 1468 },
    { id: 5, location: "Coastal Region", population: 28470, area: 15.2, density: 1873 },
    { id: 6, location: "Mountain View", population: 19850, area: 32.6, density: 609 },
    { id: 7, location: "Tech Campus", population: 12340, area: 8.9, density: 1387 },
    { id: 8, location: "Historic Quarter", population: 23560, area: 6.3, density: 3740 },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Data Explorer</CardTitle>
            <CardDescription className="text-muted-foreground">Browse and analyze geospatial datasets</CardDescription>
          </div>
          <Button variant="outline" className="gap-2 bg-secondary border-border">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search locations..." className="pl-9 bg-secondary border-border" />
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Location</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Population</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Area (km²)</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Density (per km²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground">{row.location}</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">{row.population.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">{row.area}</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">{row.density.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
