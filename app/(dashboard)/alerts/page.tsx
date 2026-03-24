"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  CheckCheck,
  Trash2,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High-Risk Stage Detected",
    message: "Wheat Leaf Rust has reached a critical severity of 78%. Immediate fungicide application is required to prevent crop loss.",
    crop: "Wheat",
    disease: "Leaf Rust",
    time: "2 hours ago",
    read: false,
    action: "View Analysis",
    href: "/analysis",
  },
  {
    id: 2,
    type: "warning",
    title: "Disease Spread Alert",
    message: "Rice Blast disease is spreading. Severity increased from 55% to 68% over the past 7 days. Consider treatment soon.",
    crop: "Rice",
    disease: "Blast",
    time: "6 hours ago",
    read: false,
    action: "View Progression",
    href: "/progression",
  },
  {
    id: 3,
    type: "warning",
    title: "Seasonal Risk Elevated",
    message: "High humidity forecast over the next 3 days increases disease risk for Rice and Wheat. Monitor closely and prepare treatment.",
    crop: "All Crops",
    disease: "Multiple",
    time: "12 hours ago",
    read: false,
    action: "View Forecast",
    href: "/progression",
  },
  {
    id: 4,
    type: "info",
    title: "Recommended Action Timing",
    message: "Optimal window for fungicide application on Wheat: tomorrow morning between 6 AM – 9 AM for best absorption and minimal drift.",
    crop: "Wheat",
    disease: "Leaf Rust",
    time: "1 day ago",
    read: true,
    action: null,
    href: null,
  },
  {
    id: 5,
    type: "success",
    title: "Tomato Field – No Disease Detected",
    message: "Latest scan of your Tomato field shows no disease. Health score: 89/100. Continue regular monitoring.",
    crop: "Tomato",
    disease: "None",
    time: "3 days ago",
    read: true,
    action: "View Report",
    href: "/analysis",
  },
  {
    id: 6,
    type: "info",
    title: "Expert Response Received",
    message: "Agricultural Expert Dr. Priya Sharma has responded to your consultation about Cotton Boll Weevil treatment options.",
    crop: "Cotton",
    disease: "Boll Weevil",
    time: "4 days ago",
    read: true,
    action: "View Response",
    href: "/consultation",
  },
]

const iconMap = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
}

import { useData } from "@/lib/data-context"

const styleMap = {
  critical: {
    icon: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-l-destructive",
    badge: "bg-destructive text-destructive-foreground",
  },
  warning: {
    icon: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-l-amber-400",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  alert: {
    icon: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-l-destructive",
    badge: "bg-destructive text-destructive-foreground",
  },
  info: {
    icon: "text-primary",
    bg: "bg-primary/5",
    border: "border-l-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  success: {
    icon: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-l-chart-3",
    badge: "bg-chart-3/10 text-primary border-primary/20",
  },
}

export default function AlertsPage() {
  const { alerts } = useData()
  const [readIds, setReadIds] = useState<string[]>(alerts.filter((a) => a.read).map((a) => a.id))

  const allAlerts = [...alerts]
  
  const unread = allAlerts.filter((a) => !readIds.includes(a.id))
  const read = allAlerts.filter((a) => readIds.includes(a.id))

  const markAllRead = () => setReadIds(allAlerts.map((a) => a.id))
  const markRead = (id: string) => setReadIds((prev) => [...prev, id])

  function AlertCard({ alert }: { alert: any }) {
    const Icon = iconMap[alert.type as keyof typeof iconMap]
    const style = styleMap[alert.type as keyof typeof styleMap]
    const isRead = readIds.includes(alert.id)

    return (
      <div
        className={cn(
          "flex gap-4 p-4 rounded-xl border-l-4 transition-opacity",
          style.border,
          style.bg,
          isRead && "opacity-70"
        )}
      >
        <div className={`w-9 h-9 rounded-full bg-card flex items-center justify-center shrink-0 border border-border`}>
          <Icon className={`w-4 h-4 ${style.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className={`text-sm font-semibold text-foreground ${!isRead ? "font-bold" : ""}`}>
              {alert.title}
            </p>
            {!isRead && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            )}
            <Badge variant="outline" className={`text-xs shrink-0 ${style.badge}`}>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{alert.message}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {alert.time}
            </span>
            <span className="text-xs text-muted-foreground">
              {alert.crop} {alert.disease !== "None" && alert.disease !== "Multiple" ? `— ${alert.disease}` : ""}
            </span>
            {alert.action && alert.href && (
              <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-primary" asChild>
                <Link href={alert.href}>
                  {alert.action}
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        {!isRead && (
          <button
            onClick={() => markRead(alert.id)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            title="Mark as read"
          >
            <CheckCheck className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Alerts
            {unread.length > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">{unread.length}</Badge>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Disease warnings, action timing alerts, and system notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Critical", count: alerts.filter((a) => a.type === "critical").length, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Warnings", count: alerts.filter((a) => a.type === "warning").length, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Info", count: alerts.filter((a) => a.type === "info").length, color: "text-primary", bg: "bg-primary/10" },
          { label: "Unread", count: unread.length, color: "text-foreground", bg: "bg-secondary" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="p-4 text-center">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <Bell className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unread.length})
          </TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-3">
          {unread.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-medium text-foreground">All caught up!</p>
                <p className="text-sm text-muted-foreground mt-1">No unread alerts at this time.</p>
              </CardContent>
            </Card>
          ) : (
            unread.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </TabsContent>

        <TabsContent value="critical" className="mt-4 space-y-3">
          {alerts
            .filter((a) => a.type === "critical")
            .map((alert) => <AlertCard key={alert.id} alert={alert} />)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
