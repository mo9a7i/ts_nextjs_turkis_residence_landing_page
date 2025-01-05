import Link from "next/link";
import Image from "next/image";
import properties from "@/data/properties.json";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 border border-teal-100/20 dark:border-slate-700/20">
        <h1 className="mb-8 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text text-center">
          Welcome to Our Properties
        </h1>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.properties.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-xl border border-teal-100/20 dark:border-slate-700/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-all hover:scale-105"
            >
              <div className="aspect-video relative">
                <Image
                  src={property.images[0]}
                  alt={property.name.en}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text">
                  {property.name.en}
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                  {property.location.address}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg"
                  >
                    <Link href={`/${property.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {property.name.ar}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
