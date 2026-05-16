"use client";

import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";
import { m } from "motion/react";
import { useState, useRef } from "react";
import { tel, mail, mailHref } from "@/lib/contact-info";
import { WEB3FORMS_KEY } from "@/lib/constants";

export function ContactPage() {
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const mounted = useRef(Date.now());

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    if (Date.now() - mounted.current < 3000) return;

    setStatus("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("website")?.toString().length) {
      setStatus("sent");
      form.reset();
      return;
    }

    try {
      fd.append("access_key", WEB3FORMS_KEY);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) { setStatus("sent"); form.reset(); }
      else { setStatus("error"); setErrMsg(data.message || "Failed to send"); }
    } catch { setStatus("error"); setErrMsg("Network error"); }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg bg-[var(--bg-surface)] border border-zinc-800 text-zinc-200 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500/50 transition-colors duration-300";

  return (
    <div className="px-8 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">

        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">{t(lang, "contact.heading")}</span>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-100 mt-2">
            {t(lang, "contact.title")}
          </h1>
        </m.div>

        <m.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4 mb-12 max-w-xl mx-auto">
          <input name="website" type="text" tabIndex={-1} autoComplete="off"
            className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
          <input name="name" type="text" required maxLength={200} placeholder={t(lang, "contact.name")} className={inputClass} />
          <input name="email" type="email" required maxLength={200} placeholder={t(lang, "contact.email")} className={inputClass} />
          <textarea name="message" required rows={5} maxLength={2000} placeholder={t(lang, "contact.message")} className={`${inputClass} resize-none`} />
          <button type="submit" disabled={status === "sending" || status === "sent"}
            className="w-full px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300">
            {status === "idle" && t(lang, "contact.send")}
            {status === "sending" && t(lang, "contact.sending")}
            {status === "sent" && t(lang, "contact.sent")}
            {status === "error" && t(lang, "contact.error")}
          </button>
          {errMsg && <p className="text-xs text-red-400/70 text-center mt-2">{errMsg}</p>}
        </m.form>

        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center space-y-3 text-sm">
          <p className="text-zinc-500">{t(lang, "contact.or")}</p>
          <a href={mailHref()} className="block text-zinc-400 hover:text-zinc-300 transition-colors duration-300 text-base">
            {mail()}
          </a>
          <p className="text-zinc-500">{tel()}</p>
        </m.div>

      </div>
    </div>
  );
}
