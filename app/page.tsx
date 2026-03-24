"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Leaf,
  Shield,
  TrendingUp,
  Bell,
  Upload,
  FlaskConical,
  ArrowRight,
  Check,
  Sprout,
  ScanSearch,
  BarChart3,
  MessageSquare,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: ScanSearch,
    title: "AI Disease Detection",
    description: "Upload crop leaf images and get instant disease diagnosis powered by our CNN model trained on thousands of plant diseases.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Disease Progression Tracking",
    description: "Track how diseases evolve over time with historical comparisons, seasonal risk trends, and recurrence detection.",
    color: "text-accent-foreground",
    bg: "bg-accent/20",
  },
  {
    icon: Bell,
    title: "Smart Alert System",
    description: "Receive timely action alerts when disease risk peaks, so you can take preventive measures before crop damage occurs.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Visualize crop health scores, disease frequency, severity progression, and seasonal patterns at a glance.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    icon: MessageSquare,
    title: "Expert Consultation",
    description: "Connect directly with agricultural experts who can review your crop images and provide personalized advice.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    icon: Sprout,
    title: "AI Recommendations",
    description: "Get tailored treatment suggestions, pesticide recommendations, and fertilizer advice based on your crop condition.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
]

const stats = [
  { value: "50K+", label: "Farmers Served" },
  { value: "98.2%", label: "Detection Accuracy" },
  { value: "120+", label: "Disease Types" },
  { value: "24/7", label: "Monitoring" },
]

const workflow = [
  { step: "01", title: "Capture", desc: "Take a photo of your crop leaf using your phone or camera." },
  { step: "02", title: "Upload", desc: "Upload the image to CropSense through our mobile-friendly interface." },
  { step: "03", title: "Analyze", desc: "Our AI engine detects diseases, assesses severity, and evaluates health status." },
  { step: "04", title: "Track", desc: "Monitor disease progression over time with historical comparisons and alerts." },
  { step: "05", title: "Act", desc: "Follow personalized recommendations to treat and protect your crops." },
]

export default function LandingPage() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-[2px] font-sans selection:bg-primary/30 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-black text-foreground text-lg tracking-tight italic">CropSense</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#stats" className="hover:text-primary transition-colors">Results</Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Simple Language Switcher */}
            <div className="hidden sm:flex items-center bg-muted/30 rounded-full p-1 border border-border/50">
               <Globe className="w-4 h-4 text-muted-foreground mx-2" />
               <button 
                onClick={() => setLanguage("en")}
                className={cn("px-3 py-1 rounded-full text-[10px] font-black transition-all", language === "en" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted/50")}
               >
                 EN
               </button>
               <button 
                onClick={() => setLanguage("te")}
                className={cn("px-3 py-1 rounded-full text-[10px] font-black transition-all", language === "te" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted/50")}
               >
                 తెలుగు
               </button>
               <button 
                onClick={() => setLanguage("hi")}
                className={cn("px-3 py-1 rounded-full text-[10px] font-black transition-all", language === "hi" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted/50")}
               >
                 हिंदी
               </button>
            </div>

            <Button variant="ghost" size="sm" asChild className="font-bold border border-transparent hover:border-border rounded-xl">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="font-bold rounded-xl shadow-lg shadow-primary/20">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <Badge className="mb-6 bg-primary/10 text-primary border-0 hover:bg-primary/20 font-black uppercase tracking-widest text-[10px] py-1 px-3">
                AI-Powered Agricultural Intelligence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] text-balance mb-6">
                {t("hero_title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty font-medium opacity-80 italic">
                {t("hero_subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-black text-base transition-transform hover:scale-105 active:scale-95">
                  <Link href="/login">
                    {t("cta_start")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 rounded-2xl border-2 font-black text-base shadow-sm">
                  <Link href="/login">{t("cta_demo")}</Link>
                </Button>
              </div>
              <ul className="mt-8 flex flex-col gap-2">
                {["No technical expertise required", "Upload from any mobile device", "Results in under 5 seconds"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-background/40 backdrop-blur-md rounded-2xl border border-primary/20 overflow-hidden p-4 shadow-2xl shadow-primary/10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WorkFlow-7IwaZ6aZuvhw9Q3HeYdC9Np1ls3X6P.png"
                  alt="CropSense workflow diagram showing the disease detection and monitoring process"
                  width={500}
                  height={700}
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-primary/40 backdrop-blur-md py-14 ring-1 ring-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">Platform Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Everything you need to protect your crops
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            CropSense combines advanced AI with practical agricultural knowledge to give farmers the tools they need to detect, track, and respond to crop diseases.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-background/40 backdrop-blur-sm border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-primary/5 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              From image to insight in seconds
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                </div>
                {i < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-border" />
                )}
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-primary/40 backdrop-blur-xl rounded-2xl p-10 md:p-14 text-center shadow-2xl shadow-primary/20 ring-1 ring-white/20">
          <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance mb-4">
            Protect your crops. Improve your yield.
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-pretty">
            Join thousands of farmers who rely on CropSense for early disease detection and smarter agricultural decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link href="/register">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
              <Link href="/login">Sign In to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">CropSense</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Smart Crop Health Monitoring &amp; Disease Progression Analysis System
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
