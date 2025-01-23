"use client"

import { Button } from "@/components/ui/button"
import { useLanguageStore } from "@/lib/store/language-store"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="fixed top-4 right-4 z-50"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  )
} 