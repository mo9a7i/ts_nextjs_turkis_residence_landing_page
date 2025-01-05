"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { QRCodeSVG } from "qrcode.react";
import properties from "@/data/properties.json";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";

export function generateStaticParams() {
  return properties.properties.flatMap((property) => [
    {
      propertyId: property.id,
      lang: "en",
    },
    {
      propertyId: property.id,
      lang: "ar",
    },
  ]);
}

export default function PropertyDetails({
  params,
}: {
  params: Promise<{ propertyId: string; lang: "en" | "ar" }>;
}) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const resolvedParams = use(params);
  const property = properties.properties.find(
    (p) => p.id === resolvedParams.propertyId
  );

  if (!property) {
    notFound();
  }

  const { lang } = resolvedParams;
  const { name, welcomeMessage, location, wifi, advertisement, houseRules, supportContact } = property;

  const wifiQRValue = `WIFI:T:WPA;S:${wifi.ssid};P:${wifi.password};;`;

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text">
            {name[lang]}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {welcomeMessage[lang]}
          </p>
        </div>

        {/* Location Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-4 border border-teal-100/20 dark:border-slate-700/20">
          <h2 className="text-xl font-semibold">Location</h2>
          <div className="overflow-hidden rounded-lg border border-teal-100/20 dark:border-slate-700/20 bg-white/60 dark:bg-slate-900/60">
            <a 
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video relative w-full max-h-[25vh] hover:opacity-95 transition-opacity"
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.coordinates.lng-0.01}%2C${location.coordinates.lat-0.01}%2C${location.coordinates.lng+0.01}%2C${location.coordinates.lat+0.01}&layer=mapnik&marker=${location.coordinates.lat}%2C${location.coordinates.lng}`}
                style={{ border: 0, pointerEvents: 'none' }}
                className="absolute inset-0"
              />
            </a>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span className="text-slate-600 dark:text-slate-300">
                  {location.address}
                </span>
              </div>
              <Button
                asChild
                variant="outline"
                className="ml-4"
              >
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Get Directions
                  <MapPin className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="px-4 pb-4 pt-2 border-t border-teal-100/20 dark:border-slate-700/20">
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {location.directions[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="grid gap-4 md:grid-cols-3">
          {property.nearbyAttractions.map((attraction, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-xl">
              <div 
                className="relative bg-cover bg-center p-8 min-h-[25vh] flex items-end" 
                style={{ backgroundImage: `url(${attraction.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                <div className="relative z-10 text-white">
                  <h2 className="text-xl font-semibold mb-2">{attraction.title[lang]}</h2>
                  <p className="mb-2 text-sm opacity-90">{attraction.description[lang]}</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {attraction.distance[lang]}
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="mt-4 bg-white/10 hover:bg-white/20 border-white/20"
                  >
                    <a href={attraction.link} target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WiFi Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-4 border border-teal-100/20 dark:border-slate-700/20">
          <h2 className="text-xl font-semibold text-center">WiFi Details</h2>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <QRCodeSVG 
                value={wifiQRValue}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span>📱</span> Scan to connect to WiFi
            </p>
          </div>
        </div>

        {/* Advertisement Card */}
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div 
            className="relative bg-cover bg-center p-8 min-h-[25vh] flex items-center" 
            style={{ backgroundImage: `url(${advertisement.image})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-white">
              <h2 className="text-xl font-semibold">{advertisement.title[lang]}</h2>
              <p className="mb-4">{advertisement.description[lang]}</p>
              <Button asChild>
                <a href={advertisement.link} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* House Rules Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-4 border border-teal-100/20 dark:border-slate-700/20">
          <h2 className="text-xl font-semibold">House Rules</h2>
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {houseRules.map((rule, index) => (
              <li key={index} className="flex items-start space-x-3 rounded-lg border border-teal-100/20 dark:border-slate-700/20 bg-white/60 dark:bg-slate-900/60 p-4">
                <span className="text-2xl">{rule.icon}</span>
                <div>
                  <strong className="block">{rule.title}</strong>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{rule.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Button */}
        <Button 
          asChild 
          className="w-full bg-[#25D366] hover:bg-[#128C7E] dark:bg-[#25D366] dark:hover:bg-[#128C7E]"
        >
          <a 
            href={`https://wa.me/${supportContact}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Support via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
} 