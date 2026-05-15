"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Lang } from "@/lib/i18n";

function cookiesAllowed(): boolean {
  return localStorage.getItem("cookies") === "1";
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "de";
  if (cookiesAllowed()) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="))
      ?.split("=")[1];
    if (cookie === "de" || cookie === "en") return cookie;
  }
  return navigator.language.startsWith("de") ? "de" : "en";
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "de", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState(detectLang());
    setReady(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    if (cookiesAllowed()) {
      document.cookie = `lang=${l};path=/;max-age=31536000`;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  if (!ready) return null;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
