"use client";

import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";

export function SkipLink() {
  const { lang } = useLang();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none"
    >
      {t(lang, "skipLink")}
    </a>
  );
}
