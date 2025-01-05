"use client"

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  contact: string;
}

export function WhatsAppButton({ contact }: WhatsAppButtonProps) {
  return (
    <Button 
      asChild 
      className="w-full bg-[#25D366] hover:bg-[#128C7E] dark:bg-[#25D366] dark:hover:bg-[#128C7E] rounded-xl"
    >
      <a 
        href={`https://wa.me/${contact}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 "
      >
        <MessageCircle className="h-5 w-5" />
        Contact Support via WhatsApp
      </a>
    </Button>
  );
} 