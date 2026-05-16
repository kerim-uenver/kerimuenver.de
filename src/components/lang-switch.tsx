"use client";

import { useLang } from "@/lib/lang-context";
import { IoLanguage } from "react-icons/io5";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const next = lang === "de" ? "en" : "de";

  return (
    <button
      onClick={() => setLang(next)}
      aria-label={lang === "de" ? "Switch to English" : "Wechsel zu Deutsch"}
      className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-300"
    >
      <IoLanguage className="w-4 h-4" />
      <span className="text-[10px] font-mono tracking-wider uppercase">{lang}</span>
    </button>
  );
}
