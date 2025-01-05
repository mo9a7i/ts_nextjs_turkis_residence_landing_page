import properties from "@/data/properties.json";

export function generateStaticParams() {
  return properties.properties.map((property) => ({
    propertyId: property.id,
  }));
} 