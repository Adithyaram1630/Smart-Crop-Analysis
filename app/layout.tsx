import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import AnimatedBackground from '@/components/animated-background'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CropSense - Smart Crop Health Monitoring',
  description: 'AI-powered agricultural monitoring system for disease detection, health analysis, and progression tracking.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { DataProvider } from '@/lib/data-context'
import { LanguageProvider } from '@/lib/language-context'

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <DataProvider>
            <AnimatedBackground />
            <div className="relative z-10">
              {children}
            </div>
            <Toaster richColors position="top-right" />
            <Analytics />
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
