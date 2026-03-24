"use client"

import {
  Users,
  Database,
  FileBarChart2,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Activity,
  Sprout,
  Search,
  MoreHorizontal,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminStatsChart } from "../../../components/charts/admin-stats-chart"
import { useData } from "@/lib/data-context"
import { cn } from "@/lib/utils"

const users = [
  { name: "Ravi Kumar", email: "ravi@example.com", role: "Farmer", location: "Andhra Pradesh", scans: 142, status: "active", initials: "RK" },
  { name: "Meena Devi", email: "meena@example.com", role: "Farmer", location: "Telangana", scans: 98, status: "active", initials: "MD" },
  { name: "Dr. Priya Sharma", email: "priya@agri.com", role: "Expert", location: "Delhi", scans: 0, status: "active", initials: "PS" },
  { name: "Suresh Babu", email: "suresh@example.com", role: "Farmer", location: "Tamil Nadu", scans: 56, status: "inactive", initials: "SB" },
  { name: "Arjun Singh", email: "arjun@example.com", role: "Farmer", location: "Punjab", scans: 210, status: "active", initials: "AS" },
  { name: "Dr. Ramesh Nair", email: "ramesh@agri.com", role: "Expert", location: "Kerala", scans: 0, status: "active", initials: "RN" },
]

const diseaseReports = [
  { disease: "Leaf Rust", crop: "Wheat", reports: 18420, severity: "High", trend: "up" },
  { disease: "Rice Blast", crop: "Rice", reports: 14820, severity: "High", trend: "up" },
  { disease: "Boll Weevil", crop: "Cotton", reports: 9240, severity: "Medium", trend: "stable" },
  { disease: "Early Blight", crop: "Tomato", reports: 7630, severity: "Medium", trend: "down" },
  { disease: "Powdery Mildew", crop: "Wheat", reports: 6210, severity: "Low", trend: "down" },
  { disease: "Brown Spot", crop: "Rice", reports: 5840, severity: "Low", trend: "stable" },
]

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    High: "bg-destructive/10 text-destructive border-destructive/20",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-primary/10 text-primary border-primary/20",
    Healthy: "bg-primary/10 text-primary border-primary/20",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-black border ${styles[severity] ?? ""}`}>
      {severity}
    </span>
  )
}

export default function AdminPage() {
  const { scans, alerts } = useData()

  const totalScans = 482930 + scans.length
  const diseaseReportsCount = 92450 + scans.filter(s => s.severity !== "Healthy").length

  const adminStats = [
    { label: "Total Users", value: "50,142", change: "+1,240 this month", icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Scans", value: totalScans.toLocaleString(), change: `+${scans.length} recent`, icon: Activity, color: "text-chart-3", bg: "bg-chart-3/10" },
    { label: "Disease Reports", value: diseaseReportsCount.toLocaleString(), change: `+${scans.filter(s => s.severity !== "Healthy").length} recent`, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Active Experts", value: "148", change: "+12 this month", icon: ShieldCheck, color: "text-chart-2", bg: "bg-chart-2/10" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
               <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            Admin Hub
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1.5 font-medium">
            System-wide monitoring, user governance, and global disease surveillance
          </p>
        </div>
        <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20 bg-primary h-12 px-6">
          <UserPlus className="w-4.5 h-4.5 mr-2" />
          Add Expert
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-background/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                    <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 mt-1.5">
                       <TrendingUp className="w-3 h-3 text-primary" />
                       {stat.change}
                    </p>
                  </div>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg)}>
                    <Icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Analytics Chart */}
      <Card className="border-border bg-background/50 backdrop-blur-md overflow-hidden">
        <CardHeader className="pb-2 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 text-primary" />
                Global Platform Intelligence
              </CardTitle>
              <CardDescription className="text-xs font-medium">Real-time platform activity across 12 countries</CardDescription>
            </div>
            <div className="flex gap-2">
               <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold uppercase tracking-widest text-[9px]">Live Stream</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px] w-full">
             <AdminStatsChart />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for user/data management */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto p-1 bg-muted/50 rounded-2xl mb-6">
          <TabsTrigger value="users" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold">User Management</TabsTrigger>
          <TabsTrigger value="diseases" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold">Global Reports</TabsTrigger>
          <TabsTrigger value="dataset" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold">Model Datasets</TabsTrigger>
        </TabsList>

        {/* Users */}
        <TabsContent value="users" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-primary" />
                  Active Registry ({users.length.toLocaleString()})
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search records..." className="pl-9 h-10 text-sm w-full sm:w-72 rounded-xl border-border/50 bg-background/50" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">User Details</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Designation</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Territory</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Activity</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                      <th className="px-4 py-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {users.map((user) => (
                      <tr key={user.email} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 rounded-xl border-2 border-background shadow-sm">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-black">
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{user.name}</p>
                              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge
                            variant="secondary"
                            className={cn("text-[9px] px-2 py-0.5 font-black uppercase tracking-widest rounded-full",
                               user.role === "Expert" ? "bg-chart-2/10 text-chart-2" : "bg-primary/10 text-primary"
                            )}
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-muted-foreground uppercase tracking-tight">{user.location}</td>
                        <td className="px-4 py-4 text-sm font-black text-foreground">{user.scans > 0 ? user.scans : "—"}</td>
                        <td className="px-4 py-4">
                          <span
                            className={cn("inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                              user.status === "active" ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            <span
                              className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
                                user.status === "active" ? "bg-primary" : "bg-muted-foreground"
                              )}
                            />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/50">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-2 w-48 shadow-xl">
                              <DropdownMenuItem className="rounded-lg py-2 cursor-pointer font-medium">View detailed profile</DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg py-2 cursor-pointer font-medium">Edit permissions</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive rounded-lg py-2 cursor-pointer font-bold">Restrict access</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Disease Reports */}
        <TabsContent value="diseases" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <FileBarChart2 className="w-4.5 h-4.5 text-primary" />
                Aggregated Disease Surveillance
              </CardTitle>
              <CardDescription className="text-xs font-medium">Global identification statistics and severity trends</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Disease Strain</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Crops At Risk</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified Detections</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Threat Level</th>
                      <th className="text-left px-4 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Dynamic Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {diseaseReports.map((report) => (
                      <tr key={`${report.disease}-${report.crop}`} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">{report.disease}</p>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest h-5 rounded-full">{report.crop}</Badge>
                        </td>
                        <td className="px-4 py-4 font-black text-foreground">
                          {report.reports.toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <SeverityBadge severity={report.severity} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                             <TrendingUp className={cn("w-4 h-4", 
                               report.trend === "up" ? "text-destructive" : 
                               report.trend === "down" ? "text-primary" : "text-muted-foreground"
                             )} />
                             <span
                               className={cn("text-[10px] font-black uppercase tracking-widest",
                                 report.trend === "up" ? "text-destructive" : 
                                 report.trend === "down" ? "text-primary" : "text-muted-foreground"
                               )}
                             >
                               {report.trend === "up" ? "Expanding" : report.trend === "down" ? "Contained" : "Stable"}
                             </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dataset */}
        <TabsContent value="dataset" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-background/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-primary" />
                  Neural Training Corpus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {[
                  { crop: "Wheat", diseases: 24, images: "12,450", trend: "+5%" },
                  { crop: "Rice", diseases: 18, images: "10,820", trend: "+2%" },
                  { crop: "Cotton", diseases: 16, images: "8,640", trend: "+8%" },
                  { crop: "Tomato", diseases: 22, images: "11,230", trend: "+4%" },
                  { crop: "Maize", diseases: 14, images: "7,890", trend: "+1%" },
                  { crop: "Potato", diseases: 20, images: "9,560", trend: "+6%" },
                ].map((row) => (
                  <div key={row.crop} className="flex items-center justify-between p-4 rounded-xl border border-border/30 hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Sprout className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-tight">{row.crop}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{row.diseases} sub-classes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-foreground">{row.images}</p>
                      <p className="text-[10px] font-bold text-primary flex items-center justify-end gap-1">
                         <TrendingUp className="w-3 h-3" />
                         {row.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-base font-bold">Inference Engine Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {[
                    { metric: "Detection Accuracy", value: "98.2%", bar: 98 },
                    { metric: "Average Confidence", value: "97.8%", bar: 98 },
                    { metric: "Latency (P95)", value: "142ms", bar: 97 },
                    { metric: "Recall Efficiency", value: "97.1%", bar: 97 },
                  ].map((m) => (
                    <div key={m.metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{m.metric}</span>
                        <span className="text-sm font-black text-primary">{m.value}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-primary rounded-full group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all animate-in slide-in-from-left duration-1000"
                          style={{ width: `${m.bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-primary/40 bg-primary/5 border-dashed overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4">
                   <Database className="w-20 h-20 text-primary/5 -mr-4 -mt-4 transform group-hover:scale-125 transition-transform duration-700" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-base font-black text-foreground tracking-tight">System Infrastructure</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Data Lake Status</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Total Corpus", value: "60,590", sub: "Indexed Images" },
                      { label: "Active Nodes", value: "12", sub: "Global Clusters" },
                      { label: "AI Versions", value: "v4.2.0", sub: "Production Stable" },
                      { label: "Last Optimized", value: "Mar 10", sub: "Weights Updated" },
                    ].map((item) => (
                      <div key={item.label} className="bg-background/80 rounded-2xl p-4 border border-border/30 hover:shadow-md transition-all">
                        <p className="text-lg font-black text-foreground">{item.value}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight mb-0.5">{item.label}</p>
                        <p className="text-[9px] font-medium text-muted-foreground opacity-60 italic">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
