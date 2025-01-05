"use client"

import { notFound } from "next/navigation";
import { useTheme } from "next-themes";
import properties from "@/data/properties.json";
import { WelcomeSection } from "@/components/property/welcome-section";
import { LocationMap } from "@/components/property/location-map";
import { WiFiCard } from "@/components/property/wifi-details";
import { NearbyAttractions } from "@/components/property/nearby-attractions";
import { Advertisement } from "@/components/property/advertisement";
import { HouseRules } from "@/components/property/house-rules";
import { WhatsAppButton } from "@/components/property/whatsapp-button";
import { ImageGallery } from "@/components/property/image-gallery";
import { AmenitiesSection } from "@/components/property/amenities-section";

export function PropertyDetails({
  params,
}: {
  params: { propertyId: string; lang: "en" | "ar" };
}) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const property = properties.properties.find(
    (p) => p.id === params.propertyId
  );

  if (!property) {
    notFound();
  }

  const { lang } = params;
  const { name, welcomeMessage, location, wifi, advertisement, houseRules, supportContact, amenities = [] } = property;

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <div className="container mx-auto px-4 pb-8 pt-0 space-y-8">
        <WelcomeSection name={name} welcomeMessage={welcomeMessage} lang={lang} />
        <ImageGallery images={property.images} />
        <LocationMap location={location} lang={lang} />
        <AmenitiesSection amenities={amenities} lang={lang} />
        <NearbyAttractions attractions={property.nearbyAttractions} lang={lang} />
        <WiFiCard wifi={wifi} lang={lang} />
        <Advertisement ad={advertisement} lang={lang} />
        <HouseRules rules={houseRules} />
        <WhatsAppButton contact={supportContact} />
      </div>
    </div>
  );
} 