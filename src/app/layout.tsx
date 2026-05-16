import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { NAME } from "@/lib/constants";
import { LangProvider } from "@/lib/lang-context";
import { ClientLayout } from "@/components/client-layout";
import { SkipLink } from "@/components/skip-link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: NAME,
  description: `Portfolio von ${NAME}`,
  robots: { index: false, follow: false },
  other: { "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={GeistMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.web3forms.com" />
        <link rel="preload" as="image" href="/portrait.webp" fetchPriority="high" />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
        <LangProvider>
          <SkipLink />
          <ClientLayout>
            <Nav />
            <main id="main" className="flex-1 overflow-x-hidden" tabIndex={-1}>{children}</main>
            <Footer />
            <CookieBanner />
          </ClientLayout>
        </LangProvider>
      </body>
    </html>
  );
}
