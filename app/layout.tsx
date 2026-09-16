import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asadullah Galib Al Sadi | Journalist & Multimedia Reporter",
  description:
    "Official portfolio website of Asadullah Galib Al Sadi, Journalist & Multimedia Reporter at Daily Ittefaq, Digital Department.",
  keywords: [
    "Asadullah Galib Al Sadi",
    "Al Sadi",
    "Journalist",
    "Multimedia Reporter",
    "Daily Ittefaq",
    "Bangladesh Journalist",
  ],
  authors: [
    {
      name: "Asadullah Galib Al Sadi",
    },
  ],
  creator: "Asadullah Galib Al Sadi",
  metadataBase: new URL(
    "https://asadullah-galib-al-sadi.vercel.app"
  ),
  openGraph: {
    title:
      "Asadullah Galib Al Sadi | Journalist & Multimedia Reporter",
    description:
      "Official portfolio website of Asadullah Galib Al Sadi.",
    type: "website",
    locale: "en_US",
    siteName: "Asadullah Galib Al Sadi",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Asadullah Galib Al Sadi | Journalist & Multimedia Reporter",
    description:
      "Official portfolio website of Asadullah Galib Al Sadi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
