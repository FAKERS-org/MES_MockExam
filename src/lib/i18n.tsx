import React, { createContext, useContext, useEffect, useState } from "react";
import kh from "@/locales/kh.json";
import en from "@/locales/en.json";

export type Lang = "kh" | "en";

export const translations: Record<Lang, Record<string, string>> = { kh, en };

export type TranslationKey = keyof typeof kh;

export type TranslateFn = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANG_KEY = "lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "kh";
  const stored = window.localStorage.getItem(LANG_KEY);
  return stored === "en" ? "en" : "kh";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t: TranslateFn = (key, params) => {
    let str = translations[lang][key] ?? translations.kh[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };

  const toggleLang = () => setLang((l) => (l === "kh" ? "en" : "kh"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}