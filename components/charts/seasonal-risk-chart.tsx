"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts"

const data = [
  { month: "Jan", risk: 25 },
  { month: "Feb", risk: 30 },
  { month: "Mar", risk: 48 },
  { month: "Apr", risk: 55 },
  { month: "May", risk: 62 },
  { month: "Jun", risk: 70 },
  { month: "Jul", risk: 88 },
  { month: "Aug", risk: 92 },
  { month: "Sep", risk: 75 },
  { month: "Oct", risk: 68 },
  { month: "Nov", risk: 58 },
  { month: "Dec", risk: 35 },
]

function getRiskColor(value: number) {
  if (value >= 75) return "#c0392b"
  if (value >= 50) return "#e07b26"
  return "#4a8f4a"
}

export function SeasonalRiskChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} unit="%" />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`, "Risk Level"]}
        />
        <Bar dataKey="risk" radius={[4, 4, 0, 0]} name="Disease Risk">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
