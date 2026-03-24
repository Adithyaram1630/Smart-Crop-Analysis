"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  { week: "W1", wheat: 8, rice: 5, cotton: 12, tomato: 3 },
  { week: "W2", wheat: 15, rice: 8, cotton: 10, tomato: 2 },
  { week: "W3", wheat: 22, rice: 12, cotton: 15, tomato: 4 },
  { week: "W4", wheat: 32, rice: 18, cotton: 12, tomato: 3 },
  { week: "W5", wheat: 45, rice: 28, cotton: 18, tomato: 5 },
  { week: "W6", wheat: 55, rice: 35, cotton: 20, tomato: 4 },
  { week: "W7", wheat: 65, rice: 40, cotton: 22, tomato: 6 },
  { week: "W8", wheat: 72, rice: 45, cotton: 20, tomato: 5 },
  { week: "W9", wheat: 78, rice: 50, cotton: 18, tomato: 4 },
  { week: "W10", wheat: 78, rice: 55, cotton: 22, tomato: 6 },
  { week: "W11", wheat: 75, rice: 62, cotton: 25, tomato: 7 },
  { week: "W12", wheat: 78, rice: 68, cotton: 22, tomato: 6 },
]

export function ProgressionLineChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
        <defs>
          {[
            { id: "wheat", color: "#e07b26" },
            { id: "rice", color: "#c0392b" },
            { id: "cotton", color: "#2980b9" },
            { id: "tomato", color: "#4a8f4a" },
          ].map(({ id, color }) => (
            <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} unit="%" />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(v) => [`${v}%`, ""]}
        />
        <Legend wrapperStyle={{ fontSize: "11px" }} />
        <ReferenceLine y={50} stroke="var(--destructive)" strokeDasharray="4 4" label={{ value: "High Risk", position: "right", fontSize: 10, fill: "var(--destructive)" }} />
        <Area type="monotone" dataKey="wheat" stroke="#e07b26" fill="url(#grad-wheat)" strokeWidth={2} name="Wheat" />
        <Area type="monotone" dataKey="rice" stroke="#c0392b" fill="url(#grad-rice)" strokeWidth={2} name="Rice" />
        <Area type="monotone" dataKey="cotton" stroke="#2980b9" fill="url(#grad-cotton)" strokeWidth={2} name="Cotton" />
        <Area type="monotone" dataKey="tomato" stroke="#4a8f4a" fill="url(#grad-tomato)" strokeWidth={2} name="Tomato" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
