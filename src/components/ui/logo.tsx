import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text hover:opacity-90 transition-opacity"
    >
      Turkis Residence
    </Link>
  );
} 