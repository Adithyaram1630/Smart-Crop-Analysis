"use client";

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic";

function AnalysisContent() {
  const searchParams = useSearchParams()
  const searchId = searchParams.get("id")

  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [latestScan, setLatestScan] = useState<any>(null)

  // 🔥 SAFE CLIENT-SIDE DATA LOADING
  useEffect(() => {
    try {
      const stored = localStorage.getItem("scans")
      const parsed = stored ? JSON.parse(stored) : []
      setScans(parsed)
      setLoading(false)
    } catch (e) {
      console.error("Error loading scans:", e)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (scans.length > 0) {
      if (searchId) {
        const found = scans.find((s: any) => s.id?.toString() === searchId)
        setLatestScan(found || scans[0])
      } else {
        setLatestScan(scans[0])
      }
    }
  }, [scans, searchId])

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading analysis...</p>
      </div>
    )
  }

  // ❌ No data UI
  if (!latestScan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-xl font-bold">No Analysis Data</h1>
        <Button asChild>
          <Link href="/upload">
            <Upload className="w-4 h-4 mr-2" />
            Perform Scan
          </Link>
        </Button>
      </div>
    )
  }

  // ✅ SAFE RENDER
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Analysis Result</h1>
      </div>

      <div className="border border-border/50 bg-card/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {latestScan.disease || "Unknown Disease"}
          </h2>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            latestScan.severity === "High" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
          }`}>
            {latestScan.severity || "Medium"}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-1">Crop Type</p>
            <p className="font-semibold">{latestScan.crop || "N/A"}</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-1">Confidence Score</p>
            <p className="font-semibold">{latestScan.confidence || "0"}%</p>
          </div>
        </div>

        {latestScan.summary && (
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
             <p className="text-sm italic">{latestScan.summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Initializing analysis engine...</p>
      </div>
    }>
      <AnalysisContent />
    </Suspense>
  )
}