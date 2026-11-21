import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: [
      "https://hassneditor.com/sitemap.xml",
      "https://hassneditor.com/video-sitemap.xml",
    ],
    host: "https://hassneditor.com",
  };
}
