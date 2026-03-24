"use client"

import { useState } from "react"
import {
  Send,
  Paperclip,
  Star,
  MessageSquare,
  Clock,
  CheckCheck,
  UserCheck,
  Plus,
  ShieldCheck,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useData } from "@/lib/data-context"
import { cn } from "@/lib/utils"

const experts = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Plant Pathologist",
    specialization: "Wheat & Rice Diseases",
    rating: 4.9,
    reviews: 142,
    online: true,
    initials: "PS",
    responseTime: "< 2 hours",
  },
  {
    id: 2,
    name: "Dr. Ramesh Nair",
    title: "Agricultural Expert",
    specialization: "Soil & Pest Management",
    rating: 4.7,
    reviews: 98,
    online: true,
    initials: "RN",
    responseTime: "< 4 hours",
  },
  {
    id: 3,
    name: "Dr. Sunita Patel",
    title: "Agronomist",
    specialization: "Cotton & Oilseeds",
    rating: 4.8,
    reviews: 115,
    online: false,
    initials: "SP",
    responseTime: "Within 1 day",
  },
]

export default function ConsultationPage() {
  const { scans } = useData()
  const latestScan = scans[0] || { crop: "Wheat", disease: "Leaf Rust", severity: "High" }

  const conversations = [
    {
      id: 1,
      expert: "Dr. Priya Sharma",
      initials: "PS",
      topic: `${latestScan.crop} ${latestScan.disease} – Treatment Options`,
      lastMessage: "Apply treatment early morning for best results. Let me know after 7 days.",
      time: "2 hours ago",
      unread: 1,
      status: "active",
    },
    {
      id: 2,
      expert: "Dr. Ramesh Nair",
      initials: "RN",
      topic: "Soil Nutrition Management",
      lastMessage: "Based on the image you shared, I recommend potassium boost.",
      time: "4 days ago",
      unread: 0,
      status: "resolved",
    },
  ]

  const chatMessages = [
    {
      id: 1,
      sender: "user",
      text: `Hello Dr. Sharma, I've been seeing spots on my ${latestScan.crop} leaves. The system detected ${latestScan.disease} at ${latestScan.severity} severity. What should I do urgently?`,
      time: "Yesterday, 3:45 PM",
    },
    {
      id: 2,
      sender: "expert",
      text: `Hello! I reviewed your scan report. At ${latestScan.severity} severity you need to act immediately. I recommend specific fungicide application for ${latestScan.disease}.`,
      time: "Yesterday, 5:10 PM",
    },
    {
      id: 3,
      sender: "expert",
      text: "1. Apply specific fungicides @ 0.1% concentration immediately.\n2. Do the spraying in early morning (6–9 AM) to prevent leaf burn.\n3. Repeat after 14 days if symptoms persist.",
      time: "Yesterday, 5:12 PM",
    },
  ]

  const [message, setMessage] = useState("")
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [messages, setMessages] = useState(chatMessages)

  const sendMessage = () => {
    if (!message.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: message,
        time: "Just now",
      },
    ])
    setMessage("")
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Expert Consultation</h1>
        <p className="text-muted-foreground text-sm md:text-base mt-1.5 font-medium max-w-2xl">
          Connect with world-class plant pathologists for personalized, data-driven agricultural advice.
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50 rounded-2xl mb-6 max-w-md">
          <TabsTrigger value="chat" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold text-sm">My Conversations</TabsTrigger>
          <TabsTrigger value="experts" className="rounded-xl py-2.5 data-[state=active]:bg-background font-bold text-sm">Find Experts</TabsTrigger>
        </TabsList>

        {/* Chat View */}
        <TabsContent value="chat" className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-3 gap-6 h-[700px]">
            {/* Conversation list */}
            <Card className="border-border bg-background/50 backdrop-blur-md flex flex-col overflow-hidden shadow-xl rounded-2xl">
              <CardHeader className="pb-4 border-b border-border/50 bg-muted/20 shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground">Inbox</CardTitle>
                  <Button size="sm" className="h-9 px-3 rounded-xl gap-2 font-bold bg-primary shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    New Chat
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto">
                <div className="divide-y divide-border/30">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConv(conv)}
                      className={cn(
                        "w-full text-left p-5 hover:bg-primary/5 transition-all duration-300 relative group",
                        selectedConv.id === conv.id && "bg-primary/5 border-l-4 border-l-primary"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12 rounded-2xl shadow-md group-hover:scale-105 transition-transform">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-black">
                              {conv.initials}
                            </AvatarFallback>
                          </Avatar>
                          {conv.unread > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-black text-primary-foreground rounded-full flex items-center justify-center border-2 border-background">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-black text-foreground truncate">{conv.expert}</p>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">{conv.time}</span>
                          </div>
                          <p className="text-xs font-bold text-primary truncate mb-1.5 uppercase tracking-tighter">{conv.topic}</p>
                          <p className="text-xs text-muted-foreground truncate leading-relaxed line-clamp-1">{conv.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat window */}
            <Card className="lg:col-span-2 border-border bg-background/50 backdrop-blur-md flex flex-col shadow-2xl rounded-2xl overflow-hidden border-2 border-primary/5">
              {/* Chat header */}
              <CardHeader className="pb-4 border-b border-border/50 bg-muted/10 shrink-0">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 rounded-2xl shadow-inner">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-black">
                      {selectedConv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                       <p className="text-base font-black text-foreground">{selectedConv.expert}</p>
                       <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest h-5">Verified Expert</Badge>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{selectedConv.topic}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-muted text-muted-foreground px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">{selectedConv.status}</Badge>
                    <Button variant="ghost" size="icon" className="rounded-xl"><Search className="w-5 h-5 text-muted-foreground" /></Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-auto p-6 space-y-6 bg-background/20 backdrop-invert-[0.02]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {msg.sender === "expert" && (
                      <Avatar className="w-9 h-9 shrink-0 rounded-xl">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">PS</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-5 py-4 text-sm shadow-sm",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/10"
                          : "bg-card border border-border/50 ring-1 ring-white/10 rounded-tl-none"
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{msg.text}</p>
                      <div
                        className={cn(
                          "text-[10px] mt-2 font-bold uppercase tracking-widest flex items-center gap-2",
                          msg.sender === "user" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                        )}
                      >
                        {msg.time}
                        {msg.sender === "user" && <CheckCheck className="w-3.5 h-3.5 inline text-primary-foreground" />}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-6 border-t border-border/50 bg-background/50 shrink-0">
                <div className="flex gap-4 items-end">
                  <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 rounded-xl hover:bg-primary/5 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Ask your expert a question..."
                      className="resize-none text-sm min-h-0 h-14 py-4 px-5 rounded-2xl bg-card border-border/50 shadow-inner focus-visible:ring-primary/30"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button onClick={sendMessage} className="shrink-0 h-14 w-14 rounded-2xl bg-primary shadow-lg shadow-primary/30 transform hover:scale-105 active:scale-95 transition-all">
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Expert directory */}
        <TabsContent value="experts" className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-foreground">Available Specialists</h3>
              <div className="flex gap-2">
                 <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors uppercase tracking-widest text-[10px] py-1 px-3 rounded-full cursor-pointer">Cereals</Badge>
                 <Badge variant="outline" className="uppercase tracking-widest text-[10px] py-1 px-3 rounded-full cursor-pointer">Legumes</Badge>
                 <Badge variant="outline" className="uppercase tracking-widest text-[10px] py-1 px-3 rounded-full cursor-pointer">Vegetables</Badge>
              </div>
           </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="border-border bg-background/50 backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative">
                      <Avatar className="w-16 h-16 rounded-3xl shadow-lg ring-4 ring-primary/5">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-black">
                          {expert.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-background shadow-sm",
                          expert.online ? "bg-primary animate-pulse" : "bg-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="font-black text-lg text-foreground group-hover:text-primary transition-colors">{expert.name}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{expert.title}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="space-y-1 p-3 rounded-xl bg-muted/30">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Growth</p>
                        <p className="text-sm font-black text-foreground">{expert.specialization}</p>
                     </div>
                     <div className="space-y-1 p-3 rounded-xl bg-muted/30">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Response</p>
                        <p className="text-sm font-black text-foreground">{expert.responseTime}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-1.5 bg-chart-2/10 text-chart-2 px-3 py-1 rounded-full">
                       <Star className="w-3.5 h-3.5 fill-chart-2" />
                       <span className="text-xs font-black">{expert.rating}</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{expert.reviews} verified reviews</span>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 h-12 rounded-xl text-xs sm:text-sm font-black gap-2 bg-primary shadow-lg shadow-primary/20">
                      <MessageSquare className="w-4.5 h-4.5" />
                      Consult Now
                    </Button>
                    <Button variant="outline" className="h-12 w-12 rounded-xl border-border/50 hover:bg-muted/50">
                      <UserCheck className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
