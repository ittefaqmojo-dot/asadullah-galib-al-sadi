import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://asadullah-galib-al-sadi.vercel.app/sitemap.xml"
  };
}