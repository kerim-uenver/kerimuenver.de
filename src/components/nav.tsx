"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { t } from "@/lib/i18n";
import { LangSwitch } from "@/components/lang-switch";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const links = ["/", "/contact"] as const;

export function Nav() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function on() { setScrolled(window.scrollY > 30); }
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const labels = [
    t(lang, "nav.professional"),
    t(lang, "nav.contact"),
  ];

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[var(--bg)]/90 backdrop-blur-xl" : "bg-[var(--bg)]/60"
    }`}>
      <nav className="mx-auto max-w-6xl px-8 py-6 flex items-center justify-between">
        <span />

        <div className="hidden sm:flex items-center gap-10 text-base">
          {links.map((href, i) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" as const : undefined}
              className={`transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 rounded ${
                isActive(href) ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {labels[i]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://github.com/kerim-uenver" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-zinc-500 hover:text-zinc-200 transition-colors duration-300">
              <FaGithub className="w-5 h-5 text-zinc-500 hover:text-zinc-200 transition-colors shrink-0" />
            </a>
            <span className="w-px h-4 bg-zinc-800 ml-1" />
          </div>
          <LangSwitch />
          <button
            onClick={() => setOpen(!open)} aria-label="Menu"
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-zinc-500/50 transition-colors duration-300"
          >
            {open ? <FaTimes className="w-4 h-4 text-zinc-400" /> : <FaBars className="w-4 h-4 text-zinc-400" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="sm:hidden mx-6 mt-2 p-4 rounded-xl bg-[var(--bg-surface2)]/90 border border-[var(--border)] backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {links.map((href, i) => (
              <Link
                key={href} href={href} onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" as const : undefined}
                className={`text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 rounded ${
                  isActive(href) ? "text-zinc-200" : "text-zinc-500"
                }`}
              >
                {labels[i]}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-[var(--border)]">
              <a href="https://github.com/kerim-uenver" target="_blank" rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-200 transition-colors duration-300">
                <FaGithub className="w-5 h-5 text-zinc-500 hover:text-zinc-200 transition-colors shrink-0" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
