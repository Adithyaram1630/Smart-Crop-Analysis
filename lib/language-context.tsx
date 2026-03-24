"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations, Language, TranslationKey } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "te" || savedLang === "hi")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("preferred_language", lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  const t = (key: TranslationKey): string => {
    if (!translations[key]) return key
    return translations[key][language] || translations[key]["en"]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
