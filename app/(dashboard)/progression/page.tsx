"use client"

import {
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Sun,
  Activity,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressionLineChart } from "@/components/charts/progression-line-chart"
import { SeasonalRiskChart } from "@/components/charts/seasonal-risk-chart"
import { useData } from "@/lib/data-context"
import { cn } from "@/lib/utils"

const riskStages = [
  {
    stage: "Low Risk",
    range: "0–25%",
    description: "Disease presence minimal; routine monitoring sufficient.",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    stage: "Moderate Risk",
    range: "26–50%",
    description: "Visible symptoms emerging; schedule preventive treatment.",
    color: "bg-chart-2/10 border-chart-2/30 text-amber-600",
  },
  {
    stage: "High Risk",
    range: "51–75%",
    description: "Significant spread; immediate fungicide application required.",
    color: "bg-destructive/10 border-destructive/30 text-destructive",
  },
  {
    stage: "Critical Stage",
    range: "76–100%",
    description: "Severe crop damage; emergency intervention needed.",
    color: "bg-destructive/20 border-destructive text-destructive",
  },
]

export default function ProgressionPage() {
  const { scans, alerts } = useData()

  // Calculate dynamic stats
  const activeDiseases = Array.from(new Set(scans.filter(s => s.severity !== "Healthy").map(s => s.disease))).length
  const recurringDiseases = activeDiseases > 2 ? 3 : 1 
  const highRiskCrops = scans.filter(s => s.severity === "High").length
  const avgRiskScore = scans.length > 0 
    ? Math.round(scans.reduce((acc, s) => acc + (s.severity === "High" ? 85 : s.severity === "Medium" ? 50 : s.severity === "Low" ? 20 : 5), 0) / scans.length)
    : 0

  const recurrenceData = scans.length > 0 ? scans.map(s => ({
    crop: s.crop,
    disease: s.disease,
    occurrences: scans.filter(sc => sc.disease === s.disease && sc.crop === s.crop).length,
    lastSeen: s.date,
    trend: s.severity === "High" ? "up" : s.severity === "Low" ? "down" : "stable",
    riskScore: s.severity === "High" ? 94 : s.severity === "Medium" ? 65 : 25
  })).filter((v, i, a) => a.findIndex(t => (t.disease === v.disease && t.crop === v.crop)) === i) : []

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Disease Progression Tracking</h1>
        <p className="text-muted-foreground text-sm md:text-base mt-1.5 max-w-2xl">
          Detailed historical data comparison, seasonal risk trends, and high-risk stage identification across all monitored plots.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Diseases", value: activeDiseases.toString(), sub: "Across all fields", icon: Activity, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Recurring Issues", value: recurringDiseases.toString(), sub: "Seasonal patterns", icon: RefreshCw, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "High-Risk Crops", value: highRiskCrops.toString(), sub: highRiskCrops > 0 ? "Action required" : "All fields stable", icon: AlertTriangle, color: highRiskCrops > 0 ? "text-destructive" : "text-primary", bg: highRiskCrops > 0 ? "bg-destructive/10" : "bg-primary/10" },
          { label: "Avg. Risk Score", value: `${avgRiskScore}%`, sub: "Historical average", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs font-medium text-muted-foreground">{stat.sub}</p>
                  </div>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform", stat.bg)}>
                    <Icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="progression" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto p-1 bg-muted/50 rounded-2xl mb-6">
          <TabsTrigger value="progression" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold text-xs sm:text-sm">Severity Progression</TabsTrigger>
          <TabsTrigger value="seasonal" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold text-xs sm:text-sm">Seasonal Risk Trends</TabsTrigger>
          <TabsTrigger value="recurrence" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold text-xs sm:text-sm">Recurrence Detection</TabsTrigger>
        </TabsList>

        {/* Severity Progression */}
        <TabsContent value="progression" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-md">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-lg font-bold">Severity Trajectory Analysis</CardTitle>
                   <CardDescription className="text-xs">Continuous severity monitoring across last 12 weeks</CardDescription>
                </div>
                <Badge variant="outline" className="hidden sm:flex bg-primary/5 text-primary border-primary/20">Updated Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[350px] w-full">
                <ProgressionLineChart />
              </div>
            </CardContent>
          </Card>

          {/* Risk stage guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskStages.map((stage) => (
              <div key={stage.stage} className={cn(
                "rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md",
                stage.color
              )}>
                <p className="text-sm font-black uppercase tracking-wider mb-1">{stage.stage}</p>
                <div className="h-1 w-8 bg-current/30 rounded-full mb-3" />
                <p className="text-xl font-bold mb-2">Severity: {stage.range}</p>
                <p className="text-xs font-medium leading-relaxed opacity-90">{stage.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Seasonal Risk */}
        <TabsContent value="seasonal" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-md">
            <CardHeader className="pb-2 border-b border-border/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                Seasonal Disease Risk Distribution
              </CardTitle>
              <CardDescription className="text-xs">Predictive risk analysis based on atmospheric humidity and temperature trends</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[350px] w-full">
                <SeasonalRiskChart />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-base font-bold">Predictive Risk Timeline</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  { month: "July–August", risk: "Very High", diseases: "Rice Blast, Leaf Rust", color: "text-destructive", bg: "bg-destructive/10" },
                  { month: "October–November", risk: "High", diseases: "Powdery Mildew, Blight", color: "text-amber-600", bg: "bg-amber-100/50" },
                  { month: "March–April", risk: "Moderate", diseases: "Leaf Rust, Boll Weevil", color: "text-primary", bg: "bg-primary/10" },
                ].map((item) => (
                  <div key={item.month} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30 group hover:shadow-sm transition-all">
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-foreground uppercase tracking-tight">{item.month}</p>
                      <p className="text-xs font-medium text-muted-foreground">{item.diseases}</p>
                    </div>
                    <Badge
                      className={cn("px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full", item.bg, item.color)}
                    >
                      {item.risk} RISK
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-base font-bold">Intelligent Forecast Alerts</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  {
                    alert: "Rice Blast risk rising next week due to high humidity forecast",
                    type: "warning",
                    icon: AlertTriangle
                  },
                  {
                    alert: "Ideal conditions for Leaf Rust spore spread expected over 3 days",
                    type: "critical",
                    icon: AlertCircle
                  },
                  {
                    alert: "Cotton Boll Weevil risk decreasing as temperature drops",
                    type: "info",
                    icon: Sun
                  },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl p-4 flex gap-4 border shadow-sm transition-all hover:-translate-y-1 duration-300",
                        item.type === "critical" ? "bg-destructive/5 border-destructive/20 text-destructive" :
                        item.type === "warning" ? "bg-amber-500/5 border-amber-500/20 text-amber-700" :
                        "bg-primary/5 border-primary/20 text-primary"
                      )}
                    >
                      <div className="shrink-0">
                         <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold leading-relaxed">{item.alert}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recurrence Detection */}
        <TabsContent value="recurrence" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-md overflow-hidden">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Intelligent Recurrence Analysis
              </CardTitle>
              <CardDescription className="text-xs">
                History-based detection of recurring diseases to predict future outbreaks
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recurrenceData.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {recurrenceData.map((item, idx) => (
                    <div key={`${item.disease}-${idx}`} className="px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:bg-muted/30 transition-colors">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <p className="text-base font-black text-foreground tracking-tight">{item.disease}</p>
                          <Badge variant="secondary" className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-muted-foreground/10 uppercase tracking-widest">{item.crop}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                           <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> {item.occurrences} instances</span>
                           <span>Last seen: {item.lastSeen}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 justify-between sm:justify-end">
                        <div className="text-right group-hover:scale-110 transition-transform">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Risk Score</p>
                          <p className={cn("text-2xl font-black", 
                            item.riskScore > 75 ? "text-destructive" : 
                            item.riskScore > 50 ? "text-amber-500" : "text-primary"
                          )}>
                            {item.riskScore}%
                          </p>
                        </div>
                        <Badge
                          className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border-none shadow-sm",
                            item.trend === "up" ? "bg-destructive/10 text-destructive" :
                            item.trend === "down" ? "bg-primary/10 text-primary" :
                            "bg-amber-400/10 text-amber-700"
                          )}
                        >
                          {item.trend === "up" ? "Worsening trend" : item.trend === "down" ? "Improving health" : "Stable condition"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center space-y-4">
                   <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-muted-foreground/40" />
                   </div>
                   <h3 className="text-lg font-bold text-foreground">No recurrence data yet</h3>
                   <p className="text-sm text-muted-foreground max-w-xs mx-auto">Upload more scans regularly to build your field's disease recurrence profile.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
