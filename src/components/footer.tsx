"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();

  return (
    <footer className="px-8 py-10 border-t border-[#1f1f22]">
      <div className="mx-auto max-w-6xl w-full flex items-center justify-end gap-4 text-xs font-mono text-zinc-600">
        <div className="flex items-center gap-6">
          <Link href="/imprint" className="hover:text-zinc-400 transition-colors duration-300">
            {t(lang, "footer.imprint")}
          </Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors duration-300">
            {t(lang, "footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
