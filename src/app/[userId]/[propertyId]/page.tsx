import { databases } from "@/lib/appwrite/config";
import { notFound } from "next/navigation";
import { PropertyDisplay } from "@/components/properties/property-display";

export default async function PropertyPage({
  params: { userId, propertyId }
}: {
  params: { userId: string; propertyId: string }
}) {
  const property = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    'properties',
    propertyId
  );

  if (property.userId !== userId) {
    notFound();
  }

  return <PropertyDisplay property={property} />;
}

export async function generateStaticParams() {
  const properties = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    'properties'
  );

  return properties.documents.map((property) => ({
    userId: property.userId,
    propertyId: property.$id
  }));
} 