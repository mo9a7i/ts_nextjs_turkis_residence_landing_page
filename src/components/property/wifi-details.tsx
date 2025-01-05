"use client"

import { QRCodeSVG } from "qrcode.react";
import { BaseCard } from "@/components/cards/base-card";
import type { WiFiDetails } from "@/types/property";

interface WiFiCardProps {
  wifi: WiFiDetails;
  lang: "en" | "ar";
}

export function WiFiCard({ wifi, lang }: WiFiCardProps) {
  const wifiQRValue = `WIFI:T:WPA;S:${wifi.ssid};P:${wifi.password};;`;
  
  return (
    <BaseCard>
      <h2 className="text-xl font-semibold text-center">Get Connected (Wifi Details)</h2>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-4">
        {wifi.description[lang]}
      </p>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <QRCodeSVG 
            value={wifiQRValue}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="text-base text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <span>📱</span> Scan to connect to WiFi
        </p>
      </div>
    </BaseCard>
  );
} 