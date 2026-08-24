"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "@/lib/constants";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    const saved = localStorage.getItem("fasai_lang");
    if (saved === "en" || saved === "hi") setLang(saved);
  }, []);
  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === "en" ? "hi" : "en";
      localStorage.setItem("fasai_lang", next);
      return next;
    });
  };
  const value = useMemo(() => ({ lang, t: copy[lang], toggleLanguage }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
