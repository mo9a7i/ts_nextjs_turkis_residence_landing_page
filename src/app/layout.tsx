import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/ui/logo";
import { Metadata, Viewport } from "next";
import properties from "@/data/properties.json";

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdfa" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://turkis-residence.com'),
  title: {
    default: properties.websiteName.en,
    template: `%s | ${properties.websiteName.en}`,
  },
  description: "Experience luxury living in Al Khobar's finest locations. Premium furnished apartments featuring modern amenities, stunning views, and exceptional service.",
  openGraph: {
    type: "website",
    locale: "en_SA",
    alternateLocale: "ar_SA",
    siteName: properties.websiteName.en,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Turkis Residence - Luxury Apartments in Al Khobar"
      }
    ],
    description: "Experience luxury living in Al Khobar's finest locations. Premium furnished apartments featuring modern amenities, stunning views, and exceptional service."
  },
  twitter: {
    card: "summary_large_image",
    title: properties.websiteName.en,
    description: "Experience luxury living in Al Khobar's finest locations. Premium furnished apartments featuring modern amenities, stunning views, and exceptional service.",
    images: ["/images/og-image.jpg"]
  },
  keywords: ["Al Khobar apartments", "luxury residence", "furnished apartments", "Saudi Arabia accommodation", "premium living"],
  authors: [{ name: "Turkis Residence" }],
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          <div className="bg-gradient-to-b from-teal-50 to-blue-100 dark:from-slate-900 dark:to-blue-950 min-h-screen">
            <header className="fixed top-0 w-full border-b border-teal-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
              <div className="container mx-auto px-4 flex h-14 items-center justify-between">
                <Logo />
                <ModeToggle />
              </div>
            </header>
            <main className="pt-14">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
