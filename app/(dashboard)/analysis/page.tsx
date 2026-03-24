"use client"

import Link from "next/link"
import {
  AlertTriangle,
  CheckCircle2,
  Activity,
  Leaf,
  ArrowLeft,
  Download,
  Share2,
  Droplets,
  FlaskConical,
  Sprout,
  Clock,
  BarChart2,
  ChevronRight,
  ShieldCheck,
  Search,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeverityRadarChart } from "@/components/charts/severity-radar-chart"
import { useData } from "@/lib/data-context"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const symptoms = [
  "Orange-brown pustules on leaf surface",
  "Pustules surrounded by yellow halo",
  "Leaf sheath and stems also affected",
  "Premature leaf senescence observed",
]

const recommendationsData = [
  {
    category: "Fungicide Treatment",
    icon: FlaskConical,
    priority: "Urgent",
    color: "text-destructive",
    bg: "bg-destructive/10",
    actions: [
      "Apply Propiconazole 25% EC @ 0.1% immediately",
      "Repeat application after 14 days if symptoms persist",
      "Apply in early morning to avoid leaf burn",
    ],
  },
  {
    category: "Irrigation Management",
    icon: Droplets,
    priority: "High",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
    actions: [
      "Reduce overhead irrigation to limit spore spread",
      "Switch to furrow or drip irrigation if possible",
      "Avoid irrigation during humid evening hours",
    ],
  },
  {
    category: "Preventive Measures",
    icon: Sprout,
    priority: "Medium",
    color: "text-primary",
    bg: "bg-primary/10",
    actions: [
      "Remove and destroy infected plant residues",
      "Apply potassium fertilizer to boost plant immunity",
      "Monitor neighboring fields for rust spread",
    ],
  },
]

const historicalScansDefault = [
  { date: "Current", severity: 78, label: "Current" },
  { date: "Mar 5", severity: 55, label: "Previous" },
  { date: "Feb 26", severity: 32, label: "" },
  { date: "Feb 19", severity: 18, label: "" },
  { date: "Feb 12", severity: 8, label: "First Detected" },
]

import { useSearchParams } from "next/navigation"

export default function AnalysisPage() {
  const { scans } = useData()
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const scanId = searchParams.get("id")
  
  if (scans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-6">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
          <BarChart2 className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-bold">No Analysis Data</h1>
          <p className="text-muted-foreground">You haven't performed any crop scans yet. Upload an image of your crop leaf to get a detailed AI health analysis.</p>
        </div>
        <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
          <Link href="/upload">
            <Upload className="w-4 h-4 mr-2" />
            Perform First Scan
          </Link>
        </Button>
      </div>
    )
  }

  // Find scan by ID or default to latest
  const latestScan = scanId ? (scans.find(s => s.id.toString() === scanId) || scans[0]) : scans[0]
  const severityScore = latestScan.severity === "High" ? 78 : latestScan.severity === "Medium" ? 45 : latestScan.severity === "Low" ? 20 : 5
  const healthScore = 100 - severityScore

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{t("analysis")}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              {latestScan.date} – {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Share2 className="w-4 h-4 mr-2" />
            {t("share")}
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {t("download_pdf")}
          </Button>
        </div>
      </div>

      {/* Result summary */}
      <Card className={cn(
        "border-2 bg-background/50 backdrop-blur-md transition-all",
        latestScan.status === "alert" ? "border-destructive/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : 
        latestScan.status === "warning" ? "border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.1)]" : 
        "border-primary/40 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
      )}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg",
              latestScan.status === "alert" ? "bg-destructive/10" : 
              latestScan.status === "warning" ? "bg-amber-400/10" : "bg-primary/10"
            )}>
              {latestScan.status === "alert" ? (
                <AlertTriangle className="w-10 h-10 text-destructive" />
              ) : latestScan.status === "warning" ? (
                <AlertCircle className="w-10 h-10 text-amber-500" />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-primary" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{latestScan.disease}</h2>
                <Badge className={cn(
                  "text-xs px-2.5 py-0.5 font-bold",
                  latestScan.severity === "High" ? "bg-destructive text-destructive-foreground" : 
                  latestScan.severity === "Medium" ? "bg-amber-500 text-white" : 
                  "bg-primary text-primary-foreground"
                )}>
                  {latestScan.severity} Severity
                </Badge>
                <Badge variant="secondary" className="text-[11px] font-bold bg-muted/50">
                  <ShieldCheck className="w-3 h-3 mr-1 text-primary" />
                  {latestScan.confidence}% AI Confidence
                </Badge>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Detected on <strong className="text-foreground">{latestScan.crop}</strong> &mdash;{" "}
                Grain Filling stage &mdash; <span className="flex-inline items-center gap-1 italic"><MapPin className="w-3 h-3 inline pb-0.5" /> North Field, Kurnool</span>
              </p>
            </div>
            <div className="flex gap-8 shrink-0 justify-around md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-center group">
                <p className={cn(
                  "text-3xl font-black transition-transform group-hover:scale-110",
                  latestScan.severity === "High" ? "text-destructive" : "text-primary"
                )}>{severityScore}%</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Severity</p>
              </div>
              <div className="text-center group">
                <p className="text-3xl font-black text-foreground transition-transform group-hover:scale-110">{healthScore}%</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Health Score</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs md:text-sm">Details</TabsTrigger>
          <TabsTrigger value="recommendations" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs md:text-sm">Recommendations</TabsTrigger>
          <TabsTrigger value="progression" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs md:text-sm">Progression</TabsTrigger>
        </TabsList>

        {/* Disease Details Tab */}
        <TabsContent value="details" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main AI Summary Box */}
          <Card className="border-primary/40 bg-primary/5 shadow-xl shadow-primary/10">
            <CardHeader className="pb-3 border-b border-primary/10">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-primary italic">AI Real-Time Analysis & Smart Relief</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-6">
               <div className="space-y-3">
                 <h4 className="text-xs font-black uppercase tracking-widest text-foreground/50 underline decoration-primary/20 underline-offset-4">1. Crop Assessment Summary:</h4>
                 {(latestScan.summary || "").split('\n').filter(Boolean).map((line, i) => (
                   <p key={i} className={cn(
                     "text-sm md:text-base font-bold leading-relaxed italic border-l-4 border-primary/30 pl-4 py-2 bg-primary/5 rounded-r-xl",
                     line.startsWith('•') ? "ml-2" : ""
                   )}>
                     {line}
                   </p>
                 ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
                  {/* Organic Relief */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> 🌿 2. Organic Control Ways:
                    </h4>
                    <div className="space-y-2">
                      {(latestScan.organicTreatments || []).map((action, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span className="text-xs font-bold leading-snug">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chemical/Pesticide Relief */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                      <FlaskConical className="w-4 h-4" /> 🧪 3. Scientific Pesticide Usage:
                    </h4>
                    <div className="space-y-2">
                      {(latestScan.pesticideUsage || []).map((action, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-950">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <span className="text-xs font-bold leading-snug">{action}</span>
                        </div>
                      ))}
                      {(latestScan.severity === "Healthy") && (
                        <p className="text-[10px] text-muted-foreground italic font-medium">None required for healthy crops.</p>
                      )}
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-primary" />
                  Severity Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {[
                  { label: "Disease Coverage", value: severityScore },
                  { label: "Lesion Density", value: Math.max(0, severityScore - 15) },
                  { label: "Chlorosis Level", value: Math.max(0, severityScore - 25) },
                  { label: "Necrosis Level", value: Math.max(0, severityScore - 38) },
                ].map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                      <span className="text-xs font-black text-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2 group-hover:h-2.5 transition-all" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BarChart2 className="w-4.5 h-4.5 text-primary" />
                  Health Radar
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[200px] flex items-center justify-center">
                  <SeverityRadarChart />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-base font-bold">Observed Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/20 group hover:shadow-sm transition-all">
                    <div className="w-5 h-5 rounded-md bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Crop Condition Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {[
                  { label: "Overall Health", value: `${healthScore}/100`, status: latestScan.severity === "High" ? "Critical" : "Good", color: latestScan.severity === "High" ? "text-destructive" : "text-primary" },
                  { label: "Spread Risk", value: latestScan.severity === "High" ? "High" : "Moderate", status: "Immediate Attention", color: "text-amber-600" },
                  { label: "Yield Impact", value: latestScan.severity === "High" ? "30–40%" : "5–10%", status: "Estimated Loss", color: latestScan.severity === "High" ? "text-destructive" : "text-muted-foreground" },
                  { label: "Recovery Potential", value: "Moderate", status: "With Treatment", color: "text-primary" },
                ].map((item) => (
                  <div key={item.label} className="p-6 text-center hover:bg-muted/30 transition-colors">
                    <p className={cn("text-2xl font-black mb-1", item.color)}>{item.value}</p>
                    <p className="text-xs font-bold text-foreground mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{item.status}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* AI Summary Card */}
          <Card className="border-primary/40 bg-primary/5 shadow-xl shadow-primary/5">
            <CardHeader className="pb-3 border-b border-primary/10">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-primary italic">AI Crop Health Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
               <div className="space-y-2">
                 {(latestScan.summary || "").split('\n').filter(Boolean).map((line, i) => (
                   <p key={i} className={cn(
                     "text-sm md:text-base font-medium leading-relaxed italic",
                     line.startsWith('•') ? "ml-4" : ""
                   )}>
                     {line}
                   </p>
                 ))}
                 {!latestScan.summary && (
                   <p className="text-sm md:text-base font-medium text-foreground leading-relaxed italic">
                     Your plant analysis is complete. Follow the treatments below for optimal recovery.
                   </p>
                 )}
               </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organic Treatments */}
            <Card className="border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-emerald-500/10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                       <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-base font-bold text-emerald-700">Organic Solutions</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {(latestScan.organicTreatments || []).map((action, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                      <span className="text-sm font-medium text-muted-foreground leading-relaxed">{action}</span>
                    </li>
                  ))}
                  {(!latestScan.organicTreatments || latestScan.organicTreatments.length === 0) && (
                    <p className="text-xs text-muted-foreground italic">No specific organic recommendations available.</p>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Scientific Pesticides */}
            <Card className="border-blue-500/20 bg-blue-500/5 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-blue-500/10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                       <FlaskConical className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-base font-bold text-blue-700">Pesticide Usage</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {(latestScan.pesticideUsage || []).map((action, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-blue-500/10 hover:border-blue-500/30 transition-all">
                      <span className="text-sm font-medium text-muted-foreground leading-relaxed">{action}</span>
                    </li>
                  ))}
                  {(!latestScan.pesticideUsage || latestScan.pesticideUsage.length === 0) && (
                    <p className="text-xs text-muted-foreground italic">No specific chemical recommendations available.</p>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/40 bg-primary/5 border-dashed">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">Need personalized guidance?</h4>
                    <p className="text-xs text-muted-foreground">Talk directly to an expert for field-specific recommendations.</p>
                  </div>
                </div>
                <Button size="lg" className="rounded-xl w-full sm:w-auto h-12 px-8 shadow-lg shadow-primary/20 group" asChild>
                  <Link href="/consultation">
                    Chat with Expert
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progression Tab */}
        <TabsContent value="progression" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between gap-3">
                <div>
                   <CardTitle className="text-lg font-bold">Severity Trajectory</CardTitle>
                   <CardDescription className="text-xs font-medium">Wheat – Leaf Rust – History from last 5 scans</CardDescription>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                   <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-destructive bg-destructive/5">Critical Trend</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="space-y-6 max-w-3xl mx-auto">
                {historicalScansDefault.map((scan, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-20 shrink-0 text-right">
                       <p className="text-xs font-black text-muted-foreground group-hover:text-foreground transition-colors">{scan.date}</p>
                    </div>
                    <div className="flex-1 relative">
                      <Progress
                        value={scan.severity}
                        className={cn(
                          "h-4 rounded-full transition-all duration-1000",
                          scan.severity > 70 ? "[&>div]:bg-destructive" : 
                          scan.severity > 40 ? "[&>div]:bg-amber-500" : "[&>div]:bg-primary"
                        )}
                      />
                      {scan.label && (
                        <div className="absolute -top-6 right-0">
                           <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest h-5">{scan.label}</Badge>
                        </div>
                      )}
                    </div>
                    <div className="w-12 shrink-0">
                       <p className="text-sm font-black text-foreground">{scan.severity}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 bg-destructive/10 rounded-2xl border border-destructive/30 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-destructive mb-1">Critical Progression Identified</p>
                  <p className="text-xs text-destructive/80 leading-relaxed font-medium">
                    Severity has increased drastically (46%) over the past 28 days. This indicates an active outbreak that requires immediate fungicide intervention to save the current yield.
                  </p>
                </div>
              </div>
              <Button className="w-full mt-8 h-12 rounded-xl border-border hover:bg-muted font-bold" variant="outline" asChild>
                <Link href="/progression" className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  View Deep Progression Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
