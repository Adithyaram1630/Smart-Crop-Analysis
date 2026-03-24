"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const data = [
  { parameter: "Leaf Color", value: 45 },
  { parameter: "Texture", value: 62 },
  { parameter: "Lesion Size", value: 78 },
  { parameter: "Coverage", value: 70 },
  { parameter: "Moisture", value: 55 },
  { parameter: "Structure", value: 48 },
]

export function SeverityRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="parameter"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
        />
        <Radar
          name="Health Score"
          dataKey="value"
          stroke="var(--primary)"
          fill="var(--primary)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`, "Score"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
