import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asadullah-galib-al-sadi.vercel.app"),
  title: {
    default: "Asadullah Galib Al Sadi | Journalist & Multimedia Reporter",
    template: "%s | Asadullah Galib Al Sadi"
  },
  description:
    "Official portfolio of Asadullah Galib Al Sadi, Bangladesh-based journalist and multimedia reporter at Daily Ittefaq, Digital Department.",
  alternates: {
    canonical: "/"
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Asadullah Galib Al Sadi | Journalist & Multimedia Reporter",
    description:
      "Bangladesh-based journalist and multimedia reporter covering politics, national affairs, field reporting and major events.",
    type: "website",
    locale: "en_BD"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}