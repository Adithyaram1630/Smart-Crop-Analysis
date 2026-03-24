export interface Scan {
  id: string;
  crop: string;
  disease: string;
  severity: "High" | "Medium" | "Low" | "Healthy";
  date: string;
  status: "alert" | "warning" | "healthy";
  confidence: number;
  image?: string;
  recommendations?: string[];
  organicTreatments?: string[];
  pesticideUsage?: string[];
  summary?: string;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
  crop?: string;
  disease?: string;
  action?: string;
  href?: string;
}

export interface CropStat {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  bg: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
}

export interface MarketPrice {
  crop: string;
  price: number;
  market: string;
}

export interface AgriInsights {
  weatherTrends: string[];
  diseaseAlerts: string[];
  advice: string;
}

export const INITIAL_SCANS: Scan[] = [];
export const INITIAL_ALERTS: Alert[] = [];
export const INITIAL_CROP_STATS = [
  { label: "Total Scans", value: "0", change: "Starting fresh", icon: "Activity", color: "text-primary", bg: "bg-primary/10" },
  { label: "Diseases Detected", value: "0", change: "No issues yet", icon: "AlertTriangle", color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Healthy Crops", value: "0%", change: "N/A", icon: "Leaf", color: "text-chart-3", bg: "bg-chart-3/10" },
  { label: "Avg. Health Score", value: "0/10", change: "No data", icon: "TrendingUp", color: "text-chart-2", bg: "bg-chart-2/10" },
];
