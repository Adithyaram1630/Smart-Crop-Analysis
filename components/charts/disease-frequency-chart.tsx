"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

import { useData } from "@/lib/data-context"

const COLORS = ["#c0392b", "#e07b26", "#2980b9", "#4a8f4a", "#8e44ad", "#16a085"]

export function DiseaseFrequencyChart() {
  const { scans } = useData()
  
  // Calculate frequencies
  const frequencies = scans.reduce((acc: any, scan) => {
    if (scan.severity === 'Healthy') return acc
    acc[scan.disease] = (acc[scan.disease] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(frequencies).map(([disease, count]) => ({
    disease,
    count
  })).sort((a: any, b: any) => b.count - a.count).slice(0, 6)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis
          type="category"
          dataKey="disease"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          width={55}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value} cases`, "Frequency"]}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
