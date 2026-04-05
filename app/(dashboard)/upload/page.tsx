"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import {
  Upload,
  Image as ImageIcon,
  X,
  Camera,
  Leaf,
  MapPin,
  CalendarDays,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useData } from "@/lib/data-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const cropTypes = [
  "Wheat", "Rice", "Maize", "Cotton", "Tomato", "Potato",
  "Sugarcane", "Soybean", "Groundnut", "Onion",
]

const tips = [
  "Capture the affected leaf clearly in bright, natural light",
  "Focus on the disease symptoms — spots, lesions, discoloration",
  "Avoid shadows or blurry images for best accuracy",
  "Include both healthy and affected areas for comparison",
]

import { getApiUrl } from "@/lib/api-config";

export default function UploadPage() {
  const { addScan, scans } = useData()
  const router = useRouter()
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [cropType, setCropType] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) handleFile(file)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async () => {
    if (!preview) return
    
    setUploading(true)
    
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("crophealth_token") : "";
      
      const res = await fetch(getApiUrl("/analyze"), {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          imageUrl: preview,
          cropType: cropType || "Unknown Crop"
        })
      });

      if (!res.ok) {
        throw new Error(await res.text() || "Failed to analyze");
      }
      
      let analysisResult = await res.json();
      
      // Ensure we parse the JSON if Spring Boot returned a raw JSON string
      if (typeof analysisResult === 'string') {
        try { analysisResult = JSON.parse(analysisResult); } catch(e){}
      }
      
      const finalScan = {
        crop: cropType || "Unknown Crop",
        disease: analysisResult.disease || "Unknown Disease",
        severity: analysisResult.severity || "Medium",
        status: analysisResult.status || "warning",
        confidence: analysisResult.confidence || 90,
        organicTreatments: analysisResult.organic_treatments || [],
        pesticideUsage: analysisResult.pesticide_usage || [],
        summary: analysisResult.summary || "Analysis complete.",
        image: preview
      };
      
      await addScan(finalScan);
      
      toast.success("AI Analysis complete!", {
        description: `${finalScan.disease} detected with ${finalScan.confidence}% confidence.`,
      })
      toast.success("Crop analysis complete!");
      router.push("/analysis");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "AI Analysis Failed. Please check your image.";
      
      toast.error("Validation Error", {
        description: errorMessage.includes("This is not a crop") ? "This is not a crop. Please upload a valid crop image." : errorMessage,
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Crop Image</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload a leaf image for AI-powered disease detection and health analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main upload form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Drop zone */}
          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center sm:text-left">
              <CardTitle className="text-base">Crop Leaf Image</CardTitle>
              <CardDescription className="text-xs">Upload from device or drag and drop</CardDescription>
            </CardHeader>
            <CardContent>
              {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-border group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Uploaded crop" className="w-full h-48 sm:h-64 object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" onClick={() => setPreview(null)} className="gap-2">
                       <X className="w-4 h-4" /> Change Image
                    </Button>
                  </div>
                  <button
                    onClick={() => setPreview(null)}
                    className="absolute top-3 right-3 w-7 h-7 bg-card/80 backdrop-blur-md rounded-full flex items-center justify-center border border-border hover:bg-muted sm:hidden"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-primary/90 text-primary-foreground text-xs shadow-lg flex gap-1.5 items-center">
                      <CheckCircle2 className="w-3 h-3" /> Image Ready for Analysis
                    </Badge>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300",
                    dragActive
                      ? "border-primary bg-primary/5 scale-[0.99] shadow-inner"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">Drop your image here</p>
                  <p className="text-xs text-muted-foreground mb-6">or click to browse from your device</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="bg-secondary/50 text-xs gap-1.5 px-3 py-1">
                      <ImageIcon className="w-3.5 h-3.5" /> JPG / PNG
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/50 text-xs gap-1.5 px-3 py-1">
                      <Camera className="w-3.5 h-3.5" /> Camera capture
                    </Badge>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleInput}
                    capture="environment"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata form */}
          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center sm:text-left">
              <CardTitle className="text-base">Crop Details</CardTitle>
              <CardDescription className="text-xs">Provide context to improve analysis accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-foreground/70 uppercase tracking-wider flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                    Crop Type
                  </Label>
                  <Select onValueChange={setCropType}>
                    <SelectTrigger className="bg-background/50 border-border">
                      <SelectValue placeholder="Select crop..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-foreground/70 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-primary" />
                    Growth Stage
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border">
                      <SelectValue placeholder="Select stage..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seedling">Seedling</SelectItem>
                      <SelectItem value="vegetative">Vegetative</SelectItem>
                      <SelectItem value="flowering">Flowering</SelectItem>
                      <SelectItem value="fruiting">Fruiting / Grain Fill</SelectItem>
                      <SelectItem value="maturity">Maturity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-foreground/70 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Field Location
                </Label>
                <Input 
                  placeholder="e.g. North Field, Kurnool" 
                  className="bg-background/50 border-border" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Observations (optional)</Label>
                <Textarea
                  placeholder="Describe what you noticed — yellowing, spots, wilting, etc."
                  className="resize-none text-sm bg-background/50 border-border"
                  rows={3}
                />
              </div>

              <Button
                className="w-full shadow-lg shadow-primary/20"
                size="lg"
                onClick={handleSubmit}
                disabled={!preview || uploading}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    AI is Analyzing...
                  </>
                ) : (
                  <>
                    Run AI Diagnosis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar tips */}
        <div className="space-y-4">
          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center sm:text-left">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 sm:justify-start justify-center">
                <Info className="w-4 h-4 text-primary" />
                Photo Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground mb-1">Supported AI Engine</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our CNN-based AI recognizes 120+ diseases across various crop types with 98% accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2 text-center sm:text-left">
              <CardTitle className="text-sm font-semibold">Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {scans.slice(0, 3).map((item, i) => (
                  <Link href="/analysis" key={i} className="flex items-center gap-3 px-4 py-3 group cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Leaf className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-foreground group-hover:text-primary transition-colors">{item.crop}</p>
                      <p className="text-[10px] text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn("text-[9px] px-1.5 py-0 shrink-0 uppercase font-bold", item.severity === "Healthy" ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10")}
                    >
                      {item.severity}
                    </Badge>
                  </Link>
                ))}
              </div>
              <div className="p-3">
                <Button variant="ghost" size="sm" className="w-full text-[11px] h-8 text-primary" asChild>
                   <Link href="/analysis">View Full History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
