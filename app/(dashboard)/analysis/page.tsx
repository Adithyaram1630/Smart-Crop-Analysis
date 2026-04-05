"use client";

export const dynamic = "force-dynamic";

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalysisPage() {
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
        const found = scans.find((s) => s.id?.toString() === searchId)
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
        <h1 className="text-2xl font-bold">Analysis</h1>
      </div>

      <div className="border p-4 rounded-xl">
        <h2 className="text-xl font-semibold">
          {latestScan.disease || "Unknown Disease"}
        </h2>
        <p>Crop: {latestScan.crop || "N/A"}</p>
        <p>Severity: {latestScan.severity || "N/A"}</p>
        <p>Confidence: {latestScan.confidence || "0"}%</p>
      </div>
    </div>
  )
}