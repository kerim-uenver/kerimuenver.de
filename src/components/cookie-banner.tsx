"use client";

import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";

export function CookieBanner() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies")) setShow(true);
  }, []);

  function accept() { localStorage.setItem("cookies", "1"); setShow(false); }
  function decline() { localStorage.setItem("cookies", "0"); setShow(false); }

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-50 p-4"
        >
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface2)]/95 backdrop-blur-xl">
            <p className="text-zinc-400 text-sm">{t(lang, "cookie.text")}</p>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={decline}
                className="px-4 py-2 rounded-lg text-zinc-400 text-sm hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors duration-200">
                {t(lang, "cookie.decline")}
              </button>
              <button onClick={accept}
                className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors duration-200">
                {t(lang, "cookie.accept")}
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
