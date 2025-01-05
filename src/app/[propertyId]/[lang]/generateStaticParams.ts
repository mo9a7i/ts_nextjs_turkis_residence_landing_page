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