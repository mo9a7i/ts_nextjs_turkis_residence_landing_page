import properties from "@/data/properties.json";

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