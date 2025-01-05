import { Metadata } from "next";
import properties from "@/data/properties.json";

interface GenerateMetadataProps {
  params: Promise<{ propertyId: string; lang: "en" | "ar" }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = properties.properties.find(p => p.id === resolvedParams.propertyId);
  const { lang } = resolvedParams;

  if (!property) return {
    title: "Not Found",
  };

  return {
    title: {
      default: `${property.name[lang]} | Turkis Residence`,
      template: `%s | Turkis Residence`,
    },
    description: property.seo.description[lang],
    openGraph: {
      title: property.name[lang],
      description: property.seo.description[lang],
      images: property.seo.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt[lang]
      })),
      locale: lang === "ar" ? "ar_SA" : "en_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: property.name[lang],
      description: property.seo.description[lang],
      images: property.seo.images.map(img => ({
        url: img.url,
        alt: img.alt[lang]
      })),
    },
    alternates: {
      languages: {
        "en": `/en/${property.id}`,
        "ar": `/ar/${property.id}`,
      }
    }
  };
}

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

import { PropertyDetails } from "./property-details";
export default async function Page({ 
  params 
}: { 
  params: Promise<{ propertyId: string; lang: "en" | "ar" }> 
}) {
  const resolvedParams = await params;
  return <PropertyDetails params={resolvedParams} />;
} 