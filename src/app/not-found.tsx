"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-medium text-zinc-100 mb-4">{t(lang, "notFound.title")}</p>
        <p className="text-zinc-400 mb-6">{t(lang, "notFound.message")}</p>
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-300">
          {t(lang, "notFound.back")}
        </Link>
      </div>
    </div>
  );
}
