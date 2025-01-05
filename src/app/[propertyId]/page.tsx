import properties from "@/data/properties.json";

// Server-side generation
export function generateStaticParams() {
  return properties.properties.map((property) => ({
    propertyId: property.id,
  }));
}

// Client component in a separate file
import { LanguageSelector } from "./language-selector";
export default async function Page({ 
  params 
}: { 
  params: Promise<{ propertyId: string }> 
}) {
  const resolvedParams = await params;
  return <LanguageSelector params={resolvedParams} />;
} 