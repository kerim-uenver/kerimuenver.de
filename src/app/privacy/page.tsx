"use client";

import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";
import { mail, address } from "@/lib/contact-info";
import { NAME } from "@/lib/constants";

export default function PrivacyPage() {
  const { lang } = useLang();
  return (
    <div className="px-8 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-8">{t(lang, "privacy.heading")}</h1>
        <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
          <p>{t(lang, "privacy.intro")}</p>
          <p className="text-zinc-600 text-xs">{t(lang, "privacy.cookie")}</p>
          <section>
            <h2 className="text-base font-medium text-zinc-200 mb-2">{t(lang, "privacy.contactHeading")}</h2>
            <p className="font-medium">{NAME}</p>
            {address().map(l => <p key={l}>{l}</p>)}
            <p>{t(lang, "address.country")}</p>
            <p>{mail()}</p>
          </section>
          <section>
            <h2 className="text-base font-medium text-zinc-200 mb-2">{t(lang, "privacy.hostingHeading")}</h2>
            <p>{t(lang, "privacy.hostingText")}</p>
          </section>
          <section>
            <h2 className="text-base font-medium text-zinc-200 mb-2">{t(lang, "privacy.formHeading")}</h2>
            <p>{t(lang, "privacy.formText")}</p>
          </section>
          <section>
            <h2 className="text-base font-medium text-zinc-200 mb-2">{t(lang, "privacy.rightsHeading")}</h2>
            <p>{t(lang, "privacy.rightsText")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
