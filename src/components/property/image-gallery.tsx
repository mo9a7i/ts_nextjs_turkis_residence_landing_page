"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import React from "react";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const displayLimit = {
    default: 3,
    large: 5
  };

  const visibleImages = images.slice(0, displayLimit.default);
  const visibleImagesLg = images.slice(0, displayLimit.large);
  const remainingCount = images.length - displayLimit.default;
  const remainingCountLg = images.length - displayLimit.large;

  const slides = images.map((image) => ({
    src: image,
    width: 3840,
    height: 2560,
  }));

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {images.length > displayLimit.large ? visibleImagesLg.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[4/3] group md:block hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
        )) : images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[4/3] group md:block hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
        ))}
        {/* Mobile images */}
        {images.length > displayLimit.default ? visibleImages.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[4/3] group md:hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
        )) : images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[4/3] group md:hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
        ))}
        {/* View more buttons */}
        {remainingCountLg > 0 && (
          <div 
            className="relative aspect-[4/3] md:block hidden cursor-pointer"
            onClick={() => handleImageClick(displayLimit.large)}
          >
            <Button 
              variant="outline" 
              className="absolute inset-0 w-full h-full rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Plus className="h-8 w-8" />
                <span className="text-lg font-medium">
                  +{remainingCountLg} more
                </span>
              </div>
            </Button>
          </div>
        )}
        {remainingCount > 0 && (
          <div 
            className="relative aspect-[4/3] md:hidden cursor-pointer"
            onClick={() => handleImageClick(displayLimit.default)}
          >
            <Button 
              variant="outline" 
              className="absolute inset-0 w-full h-full rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Plus className="h-8 w-8" />
                <span className="text-lg font-medium">
                  +{remainingCount} more
                </span>
              </div>
            </Button>
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
} 