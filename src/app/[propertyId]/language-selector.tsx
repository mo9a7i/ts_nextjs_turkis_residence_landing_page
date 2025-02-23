"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import properties from "@/data/properties.json";

export function LanguageSelector({
  params,
}: {
  params: { propertyId: string };
}) {
  const property = properties.properties.find(p => p.id === params.propertyId);
  
  if (!property) {
    redirect("/");
  }

  const handleLanguageSelect = (lang: 'en' | 'ar') => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    window.location.href = `${basePath}/${params.propertyId}/${lang}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Language Selection */}
      <div className="flex-1 flex items-start justify-center px-4 py-8 container mx-auto">
        <div className="w-full max-w-4xl">
          {/* Hero Image Card */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={property.images[0]}
                alt={property.name.en}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-teal-100/20 dark:border-slate-700/20">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text">
                Hello! مرحباً
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Please select your preferred language
              </p>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 justify-center">
              <Button
                size="lg"
                className="min-w-[200px] bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg transform transition-all hover:scale-105 rounded-xl"
                onClick={() => handleLanguageSelect('en')}
              >
                Continue in English
              </Button>
              <Button
                size="lg"
                className="min-w-[200px] bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 shadow-lg transform transition-all hover:scale-105 rounded-xl"
                onClick={() => handleLanguageSelect('ar')}
              >
                متابعة باللغة العربية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 