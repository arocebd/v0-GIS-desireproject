"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, MapPin, Table } from "lucide-react"

interface ColumnMapping {
  name: string
  type: "latitude" | "longitude" | "address" | "city" | "state" | "zip" | "country" | "data"
  confidence: number
}

interface ImportedData {
  fileName: string
  rowCount: number
  columns: ColumnMapping[]
  preview: any[]
  locationDetected: boolean
}

export function SpreadsheetImporter() {
  const [importedData, setImportedData] = useState<ImportedData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("")

  const detectLocationColumns = (headers: string[]): ColumnMapping[] => {
    const latPatterns = ["lat", "latitude", "y", "coord_y"]
    const lonPatterns = ["lon", "lng", "longitude", "x", "coord_x"]
    const addressPatterns = ["address", "street", "location"]
    const cityPatterns = ["city", "town", "municipality"]
    const statePatterns = ["state", "province", "region"]
    const zipPatterns = ["zip", "postal", "postcode"]
    const countryPatterns = ["country", "nation"]

    return headers.map((header) => {
      const lower = header.toLowerCase()

      if (latPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "latitude", confidence: 0.95 }
      }
      if (lonPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "longitude", confidence: 0.95 }
      }
      if (addressPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "address", confidence: 0.85 }
      }
      if (cityPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "city", confidence: 0.9 }
      }
      if (statePatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "state", confidence: 0.9 }
      }
      if (zipPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "zip", confidence: 0.85 }
      }
      if (countryPatterns.some((p) => lower.includes(p))) {
        return { name: header, type: "country", confidence: 0.9 }
      }

      return { name: header, type: "data", confidence: 1.0 }
    })
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length === 0) {
        setIsProcessing(false)
        return
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const columns = detectLocationColumns(headers)

      const preview = lines.slice(1, 6).map((line) => {
        return line.split(",").map((cell) => cell.trim().replace(/"/g, ""))
      })

      setImportedData({
        fileName: file.name,
        rowCount: lines.length,
        columns: columns,
        preview: preview,
        locationDetected: columns.some((col) => col.type === "latitude" || col.type === "longitude"),
      })

      setIsProcessing(false)
    }

    reader.readAsText(file)
  }, [])

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="file-upload">Upload Spreadsheet</Label>
          <Input id="file-upload" type="file" onChange={handleFileUpload} />
        </div>
        {isProcessing && (
          <div className="flex items-center justify-center">
            <Badge variant="outline">Processing...</Badge>
          </div>
        )}
        {importedData && (
          <div>
            <div className="flex items-center justify-between">
              <Label>File Name</Label>
              <span>{importedData.fileName}</span>
            </div>
            <div className="flex items-center justify-between">
              <Label>Row Count</Label>
              <span>{importedData.rowCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <Label>Location Detected</Label>
              <span>{importedData.locationDetected ? <CheckCircle2 /> : <MapPin />}</span>
            </div>
            <div className="mt-4">
              <Table>
                <thead>
                  <tr>
                    {importedData.columns.map((col, index) => (
                      <th key={index}>{col.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importedData.preview.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
