import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://asadullah-galib-al-sadi.vercel.app";
  const routes = ["", "#about", "#reports", "#features", "#photography", "#videos", "#field-work", "#faq", "#contact"];
  return routes.map(path => ({ url: `${base}/${path}`, lastModified: new Date() }));
}