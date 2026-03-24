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
} from "recharts"

const data = [
  { name: "Oct", scans: 12400, users: 4200, detections: 2100 },
  { name: "Nov", scans: 15600, users: 4800, detections: 2800 },
  { name: "Dec", scans: 14200, users: 5100, detections: 2400 },
  { name: "Jan", scans: 18900, users: 5400, detections: 3100 },
  { name: "Feb", scans: 22100, users: 5800, detections: 3800 },
  { name: "Mar", scans: 25400, users: 6200, detections: 4200 },
]

export function AdminStatsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#41b883" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#41b883" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{
            paddingBottom: "20px",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="scans"
          name="Total Scans"
          stroke="#41b883"
          fillOpacity={1}
          fill="url(#colorScans)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="users"
          name="New Users"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorUsers)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="detections"
          name="Detections"
          stroke="#ef4444"
          fillOpacity={1}
          fill="url(#colorDetections)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
