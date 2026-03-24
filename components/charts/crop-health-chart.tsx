"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data: any[] = []

const COLORS = {
  wheat: "#e07b26",
  rice: "#4a8f4a",
  tomato: "#c0392b",
  cotton: "#2980b9",
}

export function CropHealthChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "11px" }} />
        <Line type="monotone" dataKey="wheat" stroke={COLORS.wheat} strokeWidth={2} dot={false} name="Wheat" />
        <Line type="monotone" dataKey="rice" stroke={COLORS.rice} strokeWidth={2} dot={false} name="Rice" />
        <Line type="monotone" dataKey="tomato" stroke={COLORS.tomato} strokeWidth={2} dot={false} name="Tomato" />
        <Line type="monotone" dataKey="cotton" stroke={COLORS.cotton} strokeWidth={2} dot={false} name="Cotton" />
      </LineChart>
    </ResponsiveContainer>
  )
}
