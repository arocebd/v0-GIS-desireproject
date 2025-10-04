"use client"

export function HeatMapComponent() {
  const data = [
    [12, 45, 67, 89, 34, 56, 78],
    [23, 56, 78, 90, 45, 67, 89],
    [34, 67, 89, 12, 56, 78, 90],
    [45, 78, 90, 23, 67, 89, 12],
    [56, 89, 12, 34, 78, 90, 23],
  ]

  const getColor = (value: number) => {
    const intensity = value / 100
    return `rgba(59, 130, 246, ${intensity})`
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="grid grid-cols-7 gap-1">
        {data.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-12 h-12 rounded flex items-center justify-center text-xs font-medium"
              style={{ backgroundColor: getColor(cell), color: cell > 50 ? "white" : "black" }}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
