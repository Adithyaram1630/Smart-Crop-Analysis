"use client"

import Link from "next/link"
import {
  Leaf,
  Droplets,
  CloudRain,
  Wind,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Waves,
  Calendar,
  Thermometer,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Volume2,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useData } from "@/lib/data-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { CropHealthChart } from "@/components/charts/crop-health-chart"
import { DiseaseFrequencyChart } from "@/components/charts/disease-frequency-chart"
import AnimatedBackground from "@/components/animated-background"

export default function DashboardPage() {
  const { scans, weather, marketPrice, insights, fetchVoiceAdvice, refreshData } = useData()

  const handleVoiceAdvice = async () => {
    if (!insights?.advice) return
    const audioContent = await fetchVoiceAdvice(insights.advice, "en-US")
    if (audioContent) {
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
      audio.play()
    } else {
      toast.error("Voice synthesis failed")
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight italic">
            Dashboard <span className="text-muted-foreground/30 font-thin not-italic inline-block ml-2">Overview</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm mt-1">Real-time agricultural insights and crop health analytics</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-dashed h-11 px-5 text-[11px] font-black uppercase tracking-widest gap-2 bg-background/50 backdrop-blur-md"
            onClick={() => {
              toast.promise(refreshData(), {
                loading: 'Syncing with Satellite...',
                success: 'Data Refreshed',
                error: 'Sync Failed'
              })
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Sync
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 h-11 px-6 text-[11px] font-black uppercase tracking-widest" asChild>
            <Link href="/upload">
              <Plus className="w-4 h-4 mr-2" />
              New Scan
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Live Weather Card */}
        <Card className="border-border bg-background/50 backdrop-blur-sm group hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {weather?.forecast?.toLowerCase().includes("rain") ? (
                  <CloudRain className="w-5 h-5 text-primary animate-bounce-subtle" />
                ) : weather?.temperature && weather.temperature > 30 ? (
                  <Thermometer className="w-5 h-5 text-orange-500 animate-pulse" />
                ) : (
                  <Wind className="w-5 h-5 text-primary animate-drift" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-0 text-[9px] font-black uppercase tracking-tighter">Live Satellite</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-[9px] uppercase font-black tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {weather?.city || "Hyderabad"} Weather
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black tabular-nums tracking-tighter">
                  {weather?.temperature?.toFixed(1) || "28.5"}°C
                </p>
                <Badge variant="outline" className="text-[10px] h-5 border-primary/20 text-primary font-bold bg-primary/5">
                  {weather?.forecast || "Optimal"}
                </Badge>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/10 pt-4">
              <div className="flex items-center gap-1.5 group/hum">
                <Droplets className="w-3 h-3 text-primary/60 group-hover/hum:text-primary transition-colors" />
                <span className="text-[9px] font-bold text-muted-foreground">{weather?.humidity || "65"}% Humidity</span>
              </div>
              <div className="flex items-center gap-1.5 group/rain">
                <CloudRain className="w-3 h-3 text-primary/60 group-hover/rain:text-primary transition-colors" />
                <span className="text-[9px] font-bold text-muted-foreground">{weather?.rainfall || "0.0"}mm Prep.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Price Card */}
        <Card className="border-border bg-background/50 backdrop-blur-sm group hover:border-chart-2/50 transition-colors cursor-pointer overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-chart-2/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-chart-2/10 transition-colors" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
              <Badge variant="secondary" className="bg-chart-2/5 text-chart-2 border-0 text-[10px] font-black uppercase">Market</Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Rice Price (per Qtl)</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black">₹{marketPrice?.price || "2,450"}</p>
                <p className="text-xs font-bold text-chart-2">+1.2%</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/50 pt-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-chart-2/60" />
                <span className="text-[10px] font-bold text-muted-foreground">Updated Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-chart-2/60" />
                <span className="text-[10px] font-bold text-muted-foreground">Gov. Verified</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className="lg:col-span-2 border-border bg-primary/40 backdrop-blur-xl relative overflow-hidden group border-0 shadow-2xl shadow-primary/20 ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <CardContent className="pt-8 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between relative">
              <div className="space-y-2">
                <Badge className="bg-primary-foreground/10 text-primary-foreground border-0 text-[9px] font-black uppercase tracking-widest px-3">Agri AI Recommendation</Badge>
                <h3 className="text-2xl font-black text-primary-foreground leading-tight italic">
                  {insights?.diseaseAlerts && insights.diseaseAlerts.length > 0 ? "⚠️ High Risk Detected" : "Optimizing Yield Potential"}
                </h3>
                <p className="text-primary-foreground/70 text-sm font-medium leading-relaxed max-w-md line-clamp-2">
                  {insights?.advice || "Your current weather conditions are ideal for Rice cultivation. Monitor nitrogen levels in the northern sector identified by satellite scans."}
                </p>
              </div>
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Volume2 className="w-8 h-8 text-primary-foreground opacity-80" />
              </div>
            </div>
            <div className="flex gap-4 items-center mt-6 relative">
              <Button 
                variant="secondary" 
                className="rounded-xl h-12 px-6 shadow-xl font-black text-[11px] uppercase tracking-widest gap-2 min-w-[180px]"
                onClick={handleVoiceAdvice}
              >
                <MessageSquare className="w-4 h-4" />
                Listen to Guide
              </Button>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-primary-foreground/20 flex items-center justify-center text-[10px] font-black text-primary-foreground">
                    AI
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black text-primary-foreground/60 uppercase tracking-widest">Active Insight Engine</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 italic">Crop Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                 <CropHealthChart />
              </CardContent>
            </Card>
            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 italic">Disease Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                 <DiseaseFrequencyChart />
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 italic">Recent Scans</CardTitle>
                <CardDescription className="text-xs">Database audit trail</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-[10px] font-black uppercase tracking-widest text-primary">
                <Link href="/analysis">View All Records <ChevronRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border/50">
                  {scans.slice(0, 4).map((scan, i) => (
                    <Link href={`/analysis?id=${scan.id}`} key={scan.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors group">
                       <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0 border border-border/50 group-hover:border-primary/30 transition-colors">
                          <img src={scan.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=100&auto=format&fit=crop"} alt={scan.crop} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-xs font-black uppercase tracking-wide">{scan.crop}</p>
                            <Badge className={cn("text-[9px] px-1.5 py-0 uppercase font-black", scan.severity === "Healthy" ? "bg-primary/20 text-primary border-0" : "bg-destructive/10 text-destructive border-0")}>
                               {scan.severity}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 font-medium italic opacity-70">{scan.disease}</p>
                       </div>
                       <div className="text-right shrink-0">
                          <p className="text-[10px] font-black text-foreground">{scan.date}</p>
                          <p className="text-[9px] font-bold text-muted-foreground tabular-nums uppercase">{scan.confidence}% CONFIDENCE</p>
                       </div>
                       <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-6">
          <Card className="border-border bg-background/50 backdrop-blur-sm bg-gradient-to-br from-destructive/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-destructive/80 italic">Active Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights?.diseaseAlerts.map((alert: string, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-destructive/5 border border-destructive/10 animate-in fade-in slide-in-from-right duration-500">
                   <p className="text-[11px] font-bold text-foreground leading-relaxed">{alert}</p>
                   <div className="flex justify-between items-center mt-2 pt-2 border-t border-destructive/10">
                      <span className="text-[9px] font-black text-destructive uppercase tracking-widest">High Risk</span>
                      <Button variant="link" className="h-auto p-0 text-[10px] text-primary font-black uppercase tracking-widest">Protocol <ArrowRight className="w-3 h-3 ml-1" /></Button>
                   </div>
                </div>
              ))}
              {(!insights?.diseaseAlerts || insights.diseaseAlerts.length === 0) && (
                <div className="text-center py-6">
                   <ShieldCheck className="w-8 h-8 text-primary/30 mx-auto mb-2" />
                   <p className="text-xs font-bold text-muted-foreground italic">No immediate threats detected</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-background/50 backdrop-blur-sm overflow-hidden">
             <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 italic">Field Operations</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="p-4 space-y-4">
                   <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-foreground uppercase tracking-wider">Hydration Level</span>
                        <span className="text-[10px] font-bold text-primary">82%</span>
                      </div>
                      <Progress value={82} className="h-1.5" />
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-foreground uppercase tracking-wider">Nitrogen Content</span>
                        <span className="text-[10px] font-bold text-chart-2">64%</span>
                      </div>
                      <Progress value={64} className="h-1.5 bg-chart-2/10" />
                   </div>
                   <div className="pt-2">
                       <Button variant="secondary" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest h-10 shadow-sm">
                          System Diagnostics
                       </Button>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
