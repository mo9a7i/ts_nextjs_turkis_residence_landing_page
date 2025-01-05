"use client"

interface WelcomeSectionProps {
  name: {
    en: string;
    ar: string;
  };
  welcomeMessage: {
    en: string;
    ar: string;
  };
  lang: "en" | "ar";
}

export function WelcomeSection({ name, welcomeMessage, lang }: WelcomeSectionProps) {
  return (
    <div className="text-center space-y-3 py-10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text py-5">
        {name[lang]}
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-300">
        {welcomeMessage[lang]}
      </p>
    </div>
  );
} 