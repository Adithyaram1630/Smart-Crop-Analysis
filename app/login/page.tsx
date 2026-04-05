"use client"

import Link from "next/link"
import { useState } from "react"
import { Leaf, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { getApiUrl } from "@/lib/api-config";

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("ravi@example.com")
  const [password, setPassword] = useState("password")
  const [role, setRole] = useState("farmer")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(getApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("crophealth_token", data.token)
        localStorage.setItem("crophealth_role", data.user?.role || role)
        toast.success(`Welcome back, ${data.user?.name || "there"}!`)
        router.push("/dashboard")
      } else {
        toast.error(data.error || "Login failed")
      }
    } catch (err) {
      toast.error("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background/30 backdrop-blur-[2px] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-1/2 bg-primary/80 backdrop-blur-md flex-col justify-between p-12 ring-1 ring-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">CropSense</span>
        </Link>
        <div>
          <blockquote className="text-2xl font-semibold text-primary-foreground leading-snug text-balance mb-6">
            "Early detection saved my entire wheat harvest last season. CropSense is indispensable."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">MR</span>
            </div>
            <div>
              <p className="font-medium text-primary-foreground text-sm">Mohan Reddy</p>
              <p className="text-primary-foreground/60 text-xs">Farmer, Andhra Pradesh</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "50K+", label: "Farmers" },
            { value: "98.2%", label: "Accuracy" },
            { value: "120+", label: "Diseases" },
            { value: "5s", label: "Analysis Time" },
          ].map((s) => (
            <div key={s.label} className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-primary-foreground">{s.value}</p>
              <p className="text-xs text-primary-foreground/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">CropSense</span>
          </div>

          <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Sign in to your CropSense account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Sign in as</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full" size="lg" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-dashed" 
                  onClick={() => {
                    localStorage.setItem("crophealth_token", "guest-token");
                    localStorage.setItem("crophealth_role", role);
                    router.push("/dashboard");
                  }}
                >
                  Guest Login (Dev only)
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {"Don't have an account? "}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
