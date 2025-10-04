"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Hash, Calendar, MapPin, Type } from "lucide-react"

interface DataFieldSelectorProps {
  selectedFields: string[]
  onSelectFields: (fields: string[]) => void
}

export function DataFieldSelector({ selectedFields, onSelectFields }: DataFieldSelectorProps) {
  const fields = [
    { name: "population", label: "Population", type: "number", icon: Hash },
    { name: "location", label: "Location", type: "string", icon: MapPin },
    { name: "date", label: "Date", type: "date", icon: Calendar },
    { name: "density", label: "Density", type: "number", icon: Hash },
    { name: "region", label: "Region", type: "string", icon: Type },
    { name: "area", label: "Area (km²)", type: "number", icon: Hash },
  ]

  const toggleField = (fieldName: string) => {
    if (selectedFields.includes(fieldName)) {
      onSelectFields(selectedFields.filter((f) => f !== fieldName))
    } else {
      onSelectFields([...selectedFields, fieldName])
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground">Data Fields</h4>
        <Badge variant="secondary" className="text-xs">
          {selectedFields.length} selected
        </Badge>
      </div>

      <div className="space-y-2">
        {fields.map((field) => (
          <Card
            key={field.name}
            className="p-3 bg-secondary border-border cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => toggleField(field.name)}
          >
            <div className="flex items-center gap-3">
              <Checkbox checked={selectedFields.includes(field.name)} onCheckedChange={() => toggleField(field.name)} />
              <field.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{field.label}</p>
                <p className="text-xs text-muted-foreground capitalize">{field.type}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
