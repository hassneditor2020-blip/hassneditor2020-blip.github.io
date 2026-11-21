import type { MetadataRoute } from "next";
import { portfolioProjects, projectPath } from "./projectData";
import { searchContentModified, watchPageModified } from "./contentDates";

const baseUrl = "https://hassneditor.com";
const defaultLastModified = new Date("2026-09-15T00:00:00Z");
const portfolioLastModified = new Date("2026-09-27T00:00:00Z");
const routeModifiedDates: Record<string, Date> = Object.fromEntries([
  "/works",
  "/en/works",
  "/industries",
  "/en/industries",
  "/guides",
  "/en/guides",
  "/services",
  "/en/services",
  "/services/video-editing",
  "/en/services/video-editing",
  "/services/videography",
  "/en/services/videography",
  "/services/content-production",
  "/en/services/content-production",
  "/videographer-ajman",
  "/en/videographer-ajman",
  "/restaurant-videography-uae",
  "/en/restaurant-videography-uae",
  "/guides/restaurant-video-marketing-guide",
  "/en/guides/restaurant-video-marketing-guide",
].map((route) => [route, new Date("2026-09-27T00:00:00Z")]));
for (const route of ["/works", "/en/works", "/videographer-ajman", "/en/videographer-ajman", "/restaurant-videography-uae", "/en/restaurant-videography-uae"]) {
  routeModifiedDates[route] = new Date("2026-09-30T00:00:00Z");
}
for (const route of ["", "/en", "/works", "/en/works", "/services", "/en/services", "/services/videography", "/en/services/videography", "/services/content-production", "/en/services/content-production", "/videographer-ajman", "/en/videographer-ajman", "/restaurant-videography-uae", "/en/restaurant-videography-uae", "/about-hassn-editor", "/en/about-hassn-editor"]) {
  routeModifiedDates[route] = new Date("2026-10-01T00:00:00Z");
}
for (const route of ["", "/en", "/works", "/en/works", "/about-hassn-editor", "/en/about-hassn-editor", "/contact", "/en/contact", "/packages", "/en/packages", "/privacy", "/en/privacy", "/guides/choose-video-editor-uae", "/en/guides/choose-video-editor-uae", "/guides/dental-video-content-guide", "/en/guides/dental-video-content-guide", "/guides/ai-video-production-uae-guide", "/en/guides/ai-video-production-uae-guide"]) {
  routeModifiedDates[route] = new Date("2026-10-06T00:00:00Z");
}
for (const route of ["", "/en", "/services", "/en/services", "/services/ai-video", "/en/services/ai-video", "/services/ai-cartoon-characters", "/en/services/ai-cartoon-characters", "/services/motion-graphics", "/en/services/motion-graphics", "/services/video-editing", "/en/services/video-editing", "/guides/ai-video-production-uae-guide", "/en/guides/ai-video-production-uae-guide", "/guides/ai-cartoon-character-video-guide", "/en/guides/ai-cartoon-character-video-guide"]) {
  routeModifiedDates[route] = new Date("2026-10-15T00:00:00Z");
}
const projectPlayerLastModified = new Date(`${watchPageModified}T00:00:00Z`);

for (const route of ["", "/en", "/works", "/en/works", "/services/ai-video", "/en/services/ai-video", "/services/ai-cartoon-characters", "/en/services/ai-cartoon-characters", "/kokab-fodool", "/en/kokab-fodool"]) {
  routeModifiedDates[route] = new Date("2026-11-05T00:00:00Z");
}

for (const route of ["", "/en"]) {
  routeModifiedDates[route] = new Date("2026-11-10T00:00:00Z");
}

for (const route of ["/about-hassn-editor", "/en/about-hassn-editor", "/services", "/en/services", "/services/motion-graphics", "/en/services/motion-graphics", "/guides", "/en/guides", "/guides/choose-video-editor-uae", "/en/guides/choose-video-editor-uae"]) {
  routeModifiedDates[route] = new Date(`${searchContentModified}T00:00:00Z`);
}
for (const route of ["/showreel", "/en/showreel"]) routeModifiedDates[route] = new Date(`${watchPageModified}T00:00:00Z`);

for (const route of ["/services/video-editing", "/services/videography", "/services/content-production", "/dental-motion-graphics", "/product-video-ads", "/kokab-fodool", "/guides", "/guides/video-editing-cost-factors", "/guides/prepare-reels-video-shoot", "/guides/ai-cartoon-character-video-guide", "/video-editing-uae", "/videographer-ajman", "/en/services/video-editing", "/en/services/videography", "/en/services/content-production", "/en/dental-motion-graphics", "/en/product-video-ads", "/en/kokab-fodool", "/en/guides", "/en/guides/video-editing-cost-factors", "/en/guides/prepare-reels-video-shoot", "/en/guides/ai-cartoon-character-video-guide", "/en/video-editing-uae", "/en/videographer-ajman"]) {
  routeModifiedDates[route] = new Date("2026-11-07T00:00:00Z");
}

for (const route of ["/about-hassn-editor", "/en/about-hassn-editor", "/services/video-editing", "/en/services/video-editing", "/services/ai-video", "/en/services/ai-video", "/industrial-video-production-uae", "/en/industrial-video-production-uae"]) {
  routeModifiedDates[route] = new Date("2026-11-10T00:00:00Z");
}

for (const route of ["", "/en", "/works", "/en/works", "/kokab-fodool", "/en/kokab-fodool", "/videographer-sharjah", "/en/videographer-sharjah", "/videographer-dubai", "/en/videographer-dubai"]) {
  routeModifiedDates[route] = new Date("2026-11-14T00:00:00Z");
}

for (const path of ["/industrial-video-production-uae", "/services/ai-video", "/services/motion-graphics", "/guides/video-editing-cost-factors", "/about-hassn-editor", "/industries"]) {
  for (const prefix of ["", "/en"]) routeModifiedDates[`${prefix}${path}`] = new Date("2026-11-15T00:00:00Z");
}

for (const route of ["", "/en", "/services", "/en/services", "/services/web-app-design", "/en/services/web-app-design"]) {
  routeModifiedDates[route] = new Date("2026-11-18T00:00:00Z");
}

function bilingualAlternates(arabicPath: string, englishPath: string) {
  return {
    languages: {
      ar: `${baseUrl}${arabicPath}`,
      en: `${baseUrl}${englishPath}`,
      "x-default": `${baseUrl}${arabicPath}`,
    },
  };
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", 1],
    ["/en", 0.9],
    ["/about-hassn-editor", 0.9],
    ["/en/about-hassn-editor", 0.8],
    ["/works", 0.9],
    ["/en/works", 0.8],
    ["/kokab-fodool", 0.85],
    ["/en/kokab-fodool", 0.75],
    ["/showreel", 0.9],
    ["/en/showreel", 0.8],
    ["/industries", 0.9],
    ["/en/industries", 0.8],
    ["/services", 0.95],
    ["/en/services", 0.85],
    ["/services/video-editing", 0.8],
    ["/services/videography", 0.9],
    ["/services/motion-graphics", 0.8],
    ["/services/ai-video", 0.8],
    ["/services/ai-cartoon-characters", 0.85],
    ["/services/content-production", 0.8],
    ["/services/web-app-design", 0.72],
    ["/en/services/video-editing", 0.7],
    ["/en/services/videography", 0.8],
    ["/en/services/motion-graphics", 0.7],
    ["/en/services/ai-video", 0.7],
    ["/en/services/ai-cartoon-characters", 0.75],
    ["/en/services/content-production", 0.7],
    ["/en/services/web-app-design", 0.65],
    ["/video-editor-ajman", 0.9],
    ["/videographer-ajman", 0.95],
    ["/videographer-dubai", 0.9],
    ["/en/videographer-dubai", 0.8],
    ["/videographer-sharjah", 0.9],
    ["/en/videographer-sharjah", 0.8],
    ["/video-editing-uae", 0.9],
    ["/dental-motion-graphics", 0.85],
    ["/product-video-ads", 0.85],
    ["/industrial-video-production-uae", 0.9],
    ["/real-estate-video-editing-uae", 0.9],
    ["/restaurant-videography-uae", 0.9],
    ["/en/video-editor-ajman", 0.8],
    ["/en/videographer-ajman", 0.85],
    ["/en/video-editing-uae", 0.8],
    ["/en/dental-motion-graphics", 0.75],
    ["/en/product-video-ads", 0.75],
    ["/en/industrial-video-production-uae", 0.8],
    ["/en/real-estate-video-editing-uae", 0.8],
    ["/en/restaurant-videography-uae", 0.8],
    ["/guides", 0.8],
    ["/guides/prepare-reels-video-shoot", 0.8],
    ["/guides/choose-video-editor-uae", 0.8],
    ["/guides/video-editing-cost-factors", 0.8],
    ["/guides/dental-video-content-guide", 0.8],
    ["/guides/ai-video-production-uae-guide", 0.8],
    ["/guides/industrial-video-production-guide", 0.8],
    ["/guides/real-estate-video-marketing-guide", 0.8],
    ["/guides/restaurant-video-marketing-guide", 0.8],
    ["/guides/ai-cartoon-character-video-guide", 0.8],
    ["/en/guides", 0.7],
    ["/en/guides/prepare-reels-video-shoot", 0.7],
    ["/en/guides/choose-video-editor-uae", 0.7],
    ["/en/guides/video-editing-cost-factors", 0.7],
    ["/en/guides/dental-video-content-guide", 0.7],
    ["/en/guides/ai-video-production-uae-guide", 0.7],
    ["/en/guides/industrial-video-production-guide", 0.7],
    ["/en/guides/real-estate-video-marketing-guide", 0.7],
    ["/en/guides/restaurant-video-marketing-guide", 0.7],
    ["/en/guides/ai-cartoon-character-video-guide", 0.7],
    ["/contact", 0.7],
    ["/en/contact", 0.7],
    ["/packages", 0.7],
    ["/en/packages", 0.7],
    ["/privacy", 0.3],
    ["/en/privacy", 0.3],
  ] as const;

  const standardRoutes = routes.map(([route, priority]) => {
    const isEnglish = route === "/en" || route.startsWith("/en/");
    const arabicPath = isEnglish ? (route === "/en" ? "" : route.slice(3)) : route;
    const englishPath = isEnglish ? route : route === "" ? "/en" : `/en${route}`;
    return {
      url: `${baseUrl}${route}`,
      lastModified: routeModifiedDates[route] || (route.includes("works") ? portfolioLastModified : defaultLastModified),
      changeFrequency: route.endsWith("/privacy") ? "yearly" as const : route.includes("works") || route.includes("guides") ? "weekly" as const : "monthly" as const,
      priority,
      alternates: bilingualAlternates(arabicPath, englishPath),
    };
  });

  const projectRoutes = portfolioProjects.flatMap((project) => {
    const arabicPath = projectPath(project, "ar");
    const englishPath = projectPath(project, "en");
    const contentLastModified = project.lastModified ? new Date(`${project.lastModified}T00:00:00Z`) : defaultLastModified;
    const projectLastModified = new Date(Math.max(contentLastModified.getTime(), projectPlayerLastModified.getTime()));
    return [
      { url: `${baseUrl}${arabicPath}`, lastModified: projectLastModified, changeFrequency: "monthly" as const, priority: 0.8, alternates: bilingualAlternates(arabicPath, englishPath) },
      { url: `${baseUrl}${englishPath}`, lastModified: projectLastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: bilingualAlternates(arabicPath, englishPath) },
    ];
  });

  return [...standardRoutes, ...projectRoutes];
}
