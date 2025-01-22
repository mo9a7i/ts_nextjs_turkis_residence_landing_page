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
  createdAt: string;
}

export function PropertyList() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (user) {
      databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'properties',
        [
          Query.equal('userId', user.$id),
          Query.orderDesc('$createdAt'),
          Query.limit(5)
        ]
      ).then((response) => setProperties(response.documents as unknown as Property[]));
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold">Recent Properties</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/properties">View All</Link>
        </Button>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {properties.length === 0 ? (
          <div className="p-6 text-center">
            <Building2 className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="mt-2 text-sm font-medium">No properties yet</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get started by creating your first property page.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/dashboard/properties/new">
                  Create Property
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          properties.map((property) => (
            <div key={property.$id} className="p-4 flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{property.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Created {new Date(property.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link href={`/${property.slug}`} target="_blank">
                  View <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 