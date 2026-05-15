"use client";

import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";
import { tel, mail, address } from "@/lib/contact-info";
import { NAME } from "@/lib/constants";

export default function ImprintPage() {
  const { lang } = useLang();
  return (
    <div className="px-8 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-8">{t(lang, "imprint.heading")}</h1>
        <p className="text-zinc-500 text-sm mb-6">{t(lang, "imprint.law")}</p>
        <div className="space-y-1 text-zinc-400 text-sm mb-6">
          <p className="font-medium text-zinc-200">{NAME}</p>
          {address().map(l => <p key={l}>{l}</p>)}
          <p>{t(lang, "address.country")}</p>
        </div>
        <div className="space-y-1 text-zinc-400 text-sm">
          <p className="font-medium text-zinc-200">{t(lang, "imprint.contact")}</p>
          <p>{tel()}</p>
          <p>{mail()}</p>
        </div>
      </div>
    </div>
  );
}
