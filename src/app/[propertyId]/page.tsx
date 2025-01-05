import { Metadata } from "next";
import properties from "@/data/properties.json";
import { LanguageSelector } from "./language-selector";

interface PageParams {
  propertyId: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = properties.properties.find(p => p.id === resolvedParams.propertyId);
  const lang = "en";

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
      locale: "en_SA",
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
    }
  };
}

export function generateStaticParams(): PageParams[] {
  return properties.properties.map((property) => ({
    propertyId: property.id,
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <LanguageSelector params={resolvedParams} />;
} 