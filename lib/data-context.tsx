"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_SCANS, INITIAL_ALERTS, Scan, Alert, WeatherData, MarketPrice, AgriInsights } from "./data-store";
import { toast } from "sonner";
import axios from "axios";

interface DataContextType {
  scans: Scan[];
  alerts: Alert[];
  weather: WeatherData | null;
  marketPrice: MarketPrice | null;
  insights: AgriInsights | null;
  addScan: (scan: Omit<Scan, "id" | "date">) => Promise<void>;
  removeScan: (id: string) => void;
  clearAllScans: () => void;
  refreshData: () => Promise<void>;
  fetchVoiceAdvice: (text: string, lang: string) => Promise<string | null>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [scans, setScans] = useState<Scan[]>(INITIAL_SCANS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [marketPrice, setMarketPrice] = useState<MarketPrice | null>(null);
  const [insights, setInsights] = useState<AgriInsights | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("crophealth_token") : "";
      const config = { headers: { "Authorization": `Bearer ${token}` } };

      const [scansRes, weatherRes, marketRes, alertsRes, tipsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/scans`, config).catch(() => ({ data: [] })),
        axios.get(`${API_BASE_URL}/weather`, config).catch(() => ({ data: null })),
        axios.get(`${API_BASE_URL}/market-prices?crop=Rice`, config).catch(() => ({ data: null })),
        axios.get(`${API_BASE_URL}/disease-alerts?crop=Rice`, config).catch(() => ({ data: [] })),
        axios.get(`${API_BASE_URL}/tips?crop=Rice`, config).catch(() => ({ data: "" }))
      ]);
      
      setScans(scansRes.data);
      setWeather(weatherRes.data);
      setMarketPrice(marketRes.data);
      setInsights({
        weatherTrends: [], // Can be expanded
        diseaseAlerts: alertsRes.data,
        advice: tipsRes.data as string
      });

      // Update notifications/alerts
      const notifyRes = await axios.get(`${API_BASE_URL}/notifications`, config).catch(() => ({ data: [] }));
      setAlerts(notifyRes.data.map((n: any) => ({
        id: n.id.toString(),
        type: "info",
        title: "AI Notification",
        message: n.message,
        time: "Recently",
        read: false
      })));

    } catch (error) {
      console.warn("Failed to fetch data from backend. Ensure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addScan = async (newScan: Omit<Scan, "id" | "date">) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("crophealth_token") : "";
      const response = await axios.post(`${API_BASE_URL}/scans`, {
        ...newScan,
        date: new Date().toLocaleDateString(),
        status: newScan.severity === "Healthy" ? "healthy" : newScan.severity === "High" ? "alert" : "warning",
        organicTreatments: (newScan as any).organicTreatments || [],
        pesticideUsage: (newScan as any).pesticideUsage || [],
        summary: (newScan as any).summary || ""
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Scan results saved and analyzed by AI");
        refreshData();
      }
    } catch (error) {
      toast.error("Sync failed. Local update only.");
      const scanWithId: Scan = { ...newScan, id: Date.now().toString(), date: "Just now", status: "warning" } as any;
      setScans([scanWithId, ...scans]);
    }
  };

  const fetchVoiceAdvice = async (text: string, lang: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/voice`, { text, lang });
      return response.data.audio;
    } catch (error) {
      console.error("Voice synthesis failed");
      return null;
    }
  };

  const removeScan = (id: string) => {
    setScans(scans.filter(s => s.id !== id));
  };

  const clearAllScans = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/scans`);
      setScans([]);
      toast.success("All data cleared");
    } catch (error) {
      toast.error("Reset failed");
    }
  };

  return (
    <DataContext.Provider value={{ 
      scans, alerts, weather, marketPrice, insights, 
      addScan, removeScan, clearAllScans, refreshData, fetchVoiceAdvice 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
