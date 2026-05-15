import { NAME } from "@/lib/constants";

export type Lang = "de" | "en";

type Dict = Record<string, unknown>;

const dict: Record<Lang, Dict> = {
  de: {
    siteTitle: `${NAME} - Entwickler`,
    siteDescription: `Portfolio von ${NAME} - Fachinformatiker für Anwendungsentwicklung`,
    skipLink: "Zum Inhalt springen",
    nav: { professional: "Professionell", contact: "Kontakt", imprint: "Impressum", privacy: "Datenschutz" },
    hero: { greeting: "Hey, ich bin", role: "Selbstgelernter Anwendungsentwickler", tagline: "Ich baue schnelle, saubere Software." },
    professional: {
      skillsHeading: "Skills",
      skillCategories: { code: "Code", web: "Web", systems: "Systems" },
      stats: { years: "Jahre", languages: "Sprachen", projects: "Projekte" },
      projectsHeading: "Projekte",
      source: "Quellcode",
      comingSoon: "Coming soon",
      projectDescs: [
        "Portfolio-Website. Next.js, TypeScript, Tailwind. Eigenes Design.",
        "Kostenlose Tools. Hintergrund entfernen, YouTube Download, MP4 zu MP3 und mehr.",
      ],
      timelineHeading: "Werdegang",
      timeline: [
        { subtitle: "Berufsschule - Fachinformatiker für Anwendungsentwicklung", children: [{ subtitle: "Ausbildung zum Fachinformatiker · Shopware Fullstack", note: "Betriebsbedingt vorzeitig beendet" }] },
        { subtitle: "Mittlere Reife (Ø 2.7) · 1.0 in Informatik", children: [{ subtitle: "Schulpraktikum · Softwareentwicklung & Architektur", note: "" }] },
        { subtitle: "Gymnasiale Schulbildung (Klasse 5-8) · Python AG & Schach AG" },
      ],
    },
    contact: { heading: "Kontakt", title: "Schreib mir", name: "Name", email: "E-Mail", message: "Nachricht", send: "Senden", sending: "Wird gesendet...", sent: "Nachricht gesendet. Ich melde mich.", error: "Fehler beim Senden. Versuche es per E-Mail.", or: "oder direkt" },
    imprint: { heading: "Impressum", law: "Angaben gemäß § 5 TMG", contact: "Kontakt" },
    privacy: {
      heading: "Datenschutzerklärung",
      intro: "Diese Website erhebt keine personenbezogenen Daten. Es werden keine Cookies zu Tracking-Zwecken gesetzt, keine Analysetools eingesetzt und keine Daten an Dritte weitergegeben.",
      contactHeading: "Verantwortliche Stelle",
      hostingHeading: "Hosting",
      hostingText: "Diese Website wird auf einem externen Server gehostet. Beim Besuch werden serverseitig Logdateien temporär verarbeitet und nach 7 Tagen gelöscht.",
      formHeading: "Kontaktformular",
      formText: "Eingegebene Daten werden per E-Mail an den Betreiber gesendet und nur zur Beantwortung verwendet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.",
      rightsHeading: "Ihre Rechte",
      rightsText: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Kontaktieren Sie mich unter der oben genannten E-Mail-Adresse.",
      cookie: "Diese Website verwendet keine Tracking-Cookies. Ein technisch notwendiger Cookie wird für die Sprachauswahl gesetzt.",
    },
    cookie: { text: "Diese Website verwendet einen Cookie für die Sprachauswahl. Kein Tracking.", decline: "Ablehnen", accept: "Akzeptieren" },
    notFound: { title: "404", message: "Seite nicht gefunden", back: "Zurück" },
    footer: { imprint: "Impressum", privacy: "Datenschutz" },
    address: { country: "Deutschland" },
  },
  en: {
    siteTitle: `${NAME} - Developer`,
    siteDescription: `Portfolio of ${NAME} - Application Development Specialist`,
    skipLink: "Skip to content",
    nav: { professional: "Professional", contact: "Contact", imprint: "Imprint", privacy: "Privacy" },
    hero: { greeting: "Hey, I'm", role: "Self-taught Application Developer", tagline: "I build fast, clean software." },
    professional: {
      skillsHeading: "Skills",
      skillCategories: { code: "Code", web: "Web", systems: "Systems" },
      stats: { years: "years", languages: "languages", projects: "projects" },
      projectsHeading: "Projects",
      source: "Source",
      comingSoon: "Coming soon",
      projectDescs: [
        "Portfolio website. Next.js, TypeScript, Tailwind. Custom design.",
        "Free tools. Background remover, YouTube download, MP4 to MP3 and more.",
      ],
      timelineHeading: "Timeline",
      timeline: [
        { subtitle: "Vocational school - IT specialist for application development", children: [{ subtitle: "Apprenticeship as IT specialist · Shopware Fullstack", note: "Ended early due to operational reasons" }] },
        { subtitle: "Secondary school diploma (GPA 2.7) · 1.0 in Computer Science", children: [{ subtitle: "School internship · Software development & architecture", note: "" }] },
        { subtitle: "Grammar school (grades 5-8) · Python club & chess club" },
      ],
    },
    contact: { heading: "Contact", title: "Get in touch", name: "Name", email: "Email", message: "Message", send: "Send", sending: "Sending...", sent: "Message sent.", error: "Failed to send. Try email instead.", or: "or directly" },
    imprint: { heading: "Imprint", law: "Information according to § 5 TMG (German Telemedia Act)", contact: "Contact" },
    privacy: {
      heading: "Privacy Policy",
      intro: "This website does not collect personal data. No tracking cookies are set, no analytics tools are used, and no data is shared with third parties.",
      contactHeading: "Responsible Party",
      hostingHeading: "Hosting",
      hostingText: "This website is hosted on an external server. Server log files are temporarily processed and deleted after 7 days.",
      formHeading: "Contact Form",
      formText: "Submitted data is sent via email to the operator and used solely to respond. Legal basis: Art. 6(1)(f) GDPR.",
      rightsHeading: "Your Rights",
      rightsText: "You have the right to access, correct, delete, and restrict processing of your personal data. Contact me via the email address above.",
      cookie: "This website does not use tracking cookies. A technically necessary cookie is set for language selection.",
    },
    cookie: { text: "This website uses one cookie for language preference. No tracking.", decline: "Decline", accept: "Accept" },
    notFound: { title: "404", message: "Page not found", back: "Go back" },
    footer: { imprint: "Imprint", privacy: "Privacy" },
    address: { country: "Germany" },
  },
};

export function t(lang: Lang, key: string): string {
  const parts = key.split(".");
  let value: unknown = dict[lang];
  for (const p of parts) {
    if (value == null || typeof value !== "object") return key;
    value = (value as Record<string, unknown>)[p];
  }
  return typeof value === "string" ? value : key;
}

export function ta(lang: Lang, key: string): string[] {
  const parts = key.split(".");
  let value: unknown = dict[lang];
  for (const p of parts) {
    if (value == null || typeof value !== "object") return [];
    value = (value as Record<string, unknown>)[p];
  }
  return Array.isArray(value) ? (value as unknown as string[]) : [];
}

export function to<T = unknown>(lang: Lang, key: string): T {
  const parts = key.split(".");
  let value: unknown = dict[lang];
  for (const p of parts) {
    if (value == null || typeof value !== "object") return undefined as unknown as T;
    value = (value as Record<string, unknown>)[p];
  }
  return value as T;
}

export function getLangFromAcceptLanguage(header: string | null): Lang {
  if (!header) return "de";
  if (header.includes("de")) return "de";
  return "en";
}
