"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";
import Link from "next/link";
import { Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Property {
  $id: string;
  name: string;
  slug: string;
  location: string;
  images: string;
  createdAt: string;
}

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'properties',
        [Query.equal('userId', user.$id)]
      ).then(response => {
        const formattedProperties = response.documents.map(doc => ({
          ...doc,
          location: JSON.parse(doc.location),
          images: JSON.parse(doc.images),
        }));
        setProperties(formattedProperties);
      });
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Properties</h2>
      <div className="space-y-2">
        {properties.map((property) => (
          <div
            key={property.$id}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow"
          >
            {property.images?.[0] && (
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{property.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Created {new Date(property.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href={`/dashboard/properties/${property.$id}`}>
                View <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 