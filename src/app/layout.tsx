import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/ui/logo";

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cairo.className}>
      <body className={`bg-gradient-to-b from-teal-50 to-blue-100 dark:from-slate-900 dark:to-blue-950 min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed top-0 w-full border-b border-teal-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 flex h-14 items-center justify-between">
              <Logo />
              <ModeToggle />
            </div>
          </header>
          <main className="pt-14">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
