import { MetadataRoute } from "next";

const ALLOWED_PATHS = [
  "/",
  "/blog/",
  "/services",
  "/services/*",
  "/about",
  "/case-studies",
  "/case-studies/*",
  "/contact",
  "/overview",
  "/pricing",
  "/privacy",
  "/team",
  "/terms",
];

const DISALLOWED_PATHS = [
  "/api/",
  "/_next/",
  "/static/",
  "/tmp/",
  "/admin/",
  "/account/",
  "/*?*", // Prevents crawling non-canonical tracking URLs
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ALLOWED_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      {
        // ChatGPT scraper: Allow reading your blog/insights, keep system folders private
        userAgent: "GPTBot",
        allow: ALLOWED_PATHS,
        disallow: ["/api/", "/_next/"],
      },
      {
        // Claude / Anthropic Crawler configurations
        userAgent: "ClaudeBot",
        allow: ALLOWED_PATHS,
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://kinetous.com/sitemap.xml",
  };
}
