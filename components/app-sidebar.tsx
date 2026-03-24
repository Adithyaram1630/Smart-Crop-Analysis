"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  FlaskConical,
  TrendingUp,
  Bell,
  MessageSquare,
  ShieldCheck,
  Leaf,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/lib/language-context"
import { TranslationKey } from "@/lib/translations"

const navItems: { href: string; labelKey: TranslationKey; icon: any; badge?: number }[] = [
  { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/upload", labelKey: "upload_image", icon: Upload },
  { href: "/analysis", labelKey: "analysis", icon: FlaskConical },
  { href: "/progression", labelKey: "progression", icon: TrendingUp },
  { href: "/alerts", labelKey: "alerts", icon: Bell, badge: 3 },
  { href: "/consultation", labelKey: "consultation", icon: MessageSquare },
  { href: "/admin", labelKey: "admin", icon: ShieldCheck },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const { t, language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Sidebar className="border-r border-border bg-sidebar/80 backdrop-blur-xl" />
  }

  return (
    <Sidebar className="border-r border-border bg-sidebar/80 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">CropSense</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-tight">Health Monitor</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-2">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-4">
          {t("main_menu")}
        </p>
        <SidebarMenu className="gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary font-bold shadow-sm" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => setOpenMobile(false)}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex-1 text-sm">{t(item.labelKey)}</span>
                    {item.badge && (
                      <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 h-4.5 min-w-4.5 flex items-center justify-center rounded-full border-2 border-background">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border space-y-4">
        {/* Language Switcher */}
        <div className="px-3 py-2 bg-muted/30 rounded-xl border border-border/50">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-1">{t("language_select")}</p>
          <div className="flex gap-1">
             <button 
               onClick={() => setLanguage("en")}
               className={cn("flex-1 py-1 rounded-lg text-[10px] font-black transition-all", language === "en" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50")}
             >
               EN
             </button>
             <button 
               onClick={() => setLanguage("te")}
               className={cn("flex-1 py-1 rounded-lg text-[10px] font-black transition-all", language === "te" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50")}
             >
               తెలుగు
             </button>
             <button 
               onClick={() => setLanguage("hi")}
               className={cn("flex-1 py-1 rounded-lg text-[10px] font-black transition-all", language === "hi" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50")}
             >
               हिंदी
             </button>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border group">
              <Avatar className="w-8 h-8 rounded-lg border border-border">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">Ravi Kumar</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold truncate">Premium Farmer</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56 p-2 rounded-xl">
            <DropdownMenuItem className="rounded-lg py-2 cursor-pointer">
              <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
              {t("settings")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive rounded-lg py-2 cursor-pointer">
              <LogOut className="w-4 h-4 mr-3" />
              {t("sign_out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
