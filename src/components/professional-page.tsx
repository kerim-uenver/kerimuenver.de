"use client";

import { useLang } from "@/lib/lang-context";
import { t, ta, to } from "@/lib/i18n";
import { NAME, gridGradient } from "@/lib/constants";
import { m, animate } from "motion/react";
import { useEffect, useState } from "react";

function Typewriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); setDone(true); onDone?.(); }
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <span aria-label={text} role="text">{displayed || " "}{!done && <span aria-hidden="true" className="animate-pulse text-zinc-400">|</span>}</span>;
}

function CountUp({ target, label }: { target: number; label: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.5, delay: 0.8, ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target]);

  return (
    <div className="text-center">
      <span className="text-4xl sm:text-5xl md:text-7xl font-black text-zinc-100 tabular-nums">{value}</span>
      <span className="text-zinc-400 text-xs sm:text-sm font-mono block mt-2">{label}</span>
    </div>
  );
}

const projects = [
  { title: "kerimuenver.de", source: "https://github.com/kerim-uenver/kerimuenver.de", image: "/projects/kerimuenver.webp", live: true },
  { title: "tools.kerimuenver.de", source: undefined, image: "/projects/tools.webp", live: false },
];

type TimelineChild = { subtitle: string; note: string };
type TimelineItem = { subtitle: string; children?: TimelineChild[] };

const timelinePeriods = [
  { period: "09.2025 – 02.2026", title: "Werner-von-Siemens-Schule", children: [{ period: "01.09.2025 – 08.12.2025", title: "Agiqon GmbH" }] },
  { period: "09.2023 – 08.2025", title: "Sandhofenrealschule", children: [{ period: "27.11.2023 – 08.12.2023", title: "Exxeta AG" }] },
  { period: "09.2018 – 08.2023", title: "Johanna-Geissmar-Gymnasium" },
];

export function ProfessionalPage() {
  const { lang } = useLang();
  const [secondReady, setSecondReady] = useState(false);

  const descs = ta(lang, "professional.projectDescs");
  const timeline = to<TimelineItem[]>(lang, "professional.timeline");

  return (
    <div className="px-8 pt-24 pb-24">

      <section className="pt-24 pb-16 mb-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={gridGradient} />

        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <p className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-light tracking-tighter text-zinc-100 mb-4 leading-[1.1]">
              <Typewriter text={t(lang, "hero.greeting")} onDone={() => setTimeout(() => setSecondReady(true), 400)} />
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-zinc-100 leading-[0.9] hover:text-white transition-colors duration-500 cursor-default">
              {secondReady ? <Typewriter text={NAME} /> : <span className="invisible">{NAME}</span>}
            </h1>
          </div>

          <div className="relative shrink-0 self-center md:self-auto">
            <div className="absolute -inset-8 rounded-full bg-zinc-500/10 blur-3xl" />
            <img src="/portrait.webp" alt={NAME}
              className="rounded-full w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover object-[50%_15%] relative z-10 ring-1 ring-zinc-700"
              fetchPriority="high" />
          </div>
        </div>

        <div className="flex justify-center gap-8 sm:gap-24 md:gap-72 mt-24">
          <CountUp target={18} label={t(lang, "professional.stats.years")} />
          <CountUp target={3} label={t(lang, "professional.stats.languages")} />
          <CountUp target={projects.length} label={t(lang, "professional.stats.projects")} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl">

        <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-24">
          <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mb-12 text-center">{t(lang, "professional.skillsHeading")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 max-w-3xl mx-auto">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em]">{t(lang, "professional.skillCategories.code")}</span>
              <div className="mt-5 space-y-4">
                {["TypeScript", "JavaScript", "Node.js", "Lua", "Python", "PHP"].map((s) => (
                  <p key={s} className="text-xl font-medium text-zinc-200">{s}</p>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em]">{t(lang, "professional.skillCategories.web")}</span>
              <div className="mt-5 space-y-4">
                {["React", "Next.js", "Vue.js", "Tailwind", "SCSS", "HTML/CSS"].map((s) => (
                  <p key={s} className="text-xl font-medium text-zinc-200">{s}</p>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em]">{t(lang, "professional.skillCategories.systems")}</span>
              <div className="mt-5 space-y-4">
                {["Linux", "Docker", "Git", "MySQL", "REST APIs"].map((s) => (
                  <p key={s} className="text-xl font-medium text-zinc-200">{s}</p>
                ))}
              </div>
            </div>
          </div>
        </m.section>

        <div className="w-full h-px bg-zinc-800/50 mb-24" />

        <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-24">
          <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mb-8 text-center">{t(lang, "professional.projectsHeading")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <div key={p.title} className="rounded-xl border border-zinc-800 bg-[var(--bg-surface)] hover:border-zinc-500/20 transition-colors duration-500 overflow-hidden">
                <div className="aspect-video bg-zinc-900/50 border-b border-zinc-800 relative overflow-hidden flex items-center justify-center">
                  <span className="text-zinc-700 text-xs font-mono">{p.title.split(".")[0]}</span>
                  {p.live && (
                    <img src={p.image} alt={`${lang === "de" ? "Vorschau von" : "Preview of"} ${p.title}`}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{p.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{descs[i]}</p>
                  {p.source && (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-zinc-300 transition-colors duration-300">
                      {t(lang, "professional.source")} ↗
                    </a>
                  )}
                  {!p.live && <span className="text-xs font-mono text-zinc-400">{t(lang, "professional.comingSoon")}</span>}
                </div>
              </div>
            ))}
          </div>
        </m.section>

        <div className="w-full h-px bg-zinc-800/50 mb-24" />

        <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-24">
          <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mb-12 text-center">{t(lang, "professional.timelineHeading")}</h2>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-800" />
            {timelinePeriods.map((item, i) => (
              <div key={i} className={`relative pl-10 ${item.children ? "pb-6" : "pb-12"} last:pb-0`}>
                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-4 border-[#08080a] bg-zinc-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400">{item.period}</span>
                <h3 className="text-zinc-100 font-semibold text-base mt-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">{timeline[i]?.subtitle}</p>
                {item.children && timeline[i]?.children && (
                  <div className="mt-4 ml-4 pl-6 border-l-2 border-zinc-800/50 space-y-4">
                    {item.children.map((child, j) => (
                      <div key={j} className="relative">
                        <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-zinc-600 border-2 border-[#08080a]" />
                        <span className="text-[10px] font-mono text-zinc-400">{child.period}</span>
                        <h4 className="text-zinc-200 font-medium text-sm mt-0.5">{child.title}</h4>
                        <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">{timeline[i].children![j]?.subtitle}</p>
                        {timeline[i].children![j]?.note && (
                          <p className="text-zinc-400 text-[10px] mt-1 italic">{timeline[i].children![j].note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </m.section>

      </div>
    </div>
  );
}
