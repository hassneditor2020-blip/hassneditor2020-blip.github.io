import { portfolioProjects, projectPath } from "../../projectData";
import { showreelData } from "../showreel/ShowreelPage";

const baseUrl = "https://hassneditor.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

type VideoEntry = {
  pageUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  publicationDate?: string;
  playerUrl?: string;
  contentUrl?: string;
  duration?: number;
  uploaderUrl: string;
  uploaderName?: string;
};

function renderVideoEntry(entry: VideoEntry) {
  const location = entry.contentUrl
    ? `<video:content_loc>${escapeXml(entry.contentUrl)}</video:content_loc>`
    : `<video:player_loc allow_embed="yes">${escapeXml(entry.playerUrl || "")}</video:player_loc>`;
  const duration = entry.duration ? `<video:duration>${entry.duration}</video:duration>` : "";
  // Publication date is optional in a video sitemap. Do not invent dates.
  const publicationDate = entry.publicationDate ? `<video:publication_date>${escapeXml(entry.publicationDate)}</video:publication_date>` : "";

  return `<url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(entry.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(entry.title)}</video:title>
      <video:description>${escapeXml(entry.description)}</video:description>
      ${location}
      ${publicationDate}
      ${duration}
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${escapeXml(entry.uploaderUrl)}">${escapeXml(entry.uploaderName || "HASSN EDITOR")}</video:uploader>
    </video:video>
  </url>`;
}

export const dynamic = "force-static";

export function GET() {
  const showreelEntries: VideoEntry[] = [
    {
      pageUrl: `${baseUrl}/showreel`,
      thumbnailUrl: `${baseUrl}/hassn-editor-showreel-cover.jpg`,
      title: showreelData.titleAr,
      description: showreelData.descriptionAr,
      publicationDate: showreelData.uploadDate,
      contentUrl: `${baseUrl}/hassn-editor-showreel.mp4`,
      duration: 20,
      uploaderUrl: `${baseUrl}/about-hassn-editor`,
    },
    {
      pageUrl: `${baseUrl}/en/showreel`,
      thumbnailUrl: `${baseUrl}/hassn-editor-showreel-cover.jpg`,
      title: showreelData.titleEn,
      description: showreelData.descriptionEn,
      publicationDate: showreelData.uploadDate,
      contentUrl: `${baseUrl}/hassn-editor-showreel.mp4`,
      duration: 20,
      uploaderUrl: `${baseUrl}/en/about-hassn-editor`,
    },
  ];

  const projectEntries = portfolioProjects.flatMap<VideoEntry>((project) => {
    const thumbnailUrl = project.thumbnailUrl
      ? new URL(project.thumbnailUrl, baseUrl).href
      : `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
    return [
      {
        pageUrl: `${baseUrl}${projectPath(project, "ar")}`,
        thumbnailUrl,
        title: project.titleAr,
        description: project.metaDescriptionAr || project.summaryAr,
        publicationDate: project.uploadDate,
        duration: project.durationSeconds,
        playerUrl: `https://www.youtube-nocookie.com/embed/${project.videoId}`,
        uploaderUrl: project.uploaderUrl || `${baseUrl}/about-hassn-editor`,
        ...(project.collectionSlug === "kokab-fodool" ? { uploaderName: "Kokab Fodool" } : {}),
      },
      {
        pageUrl: `${baseUrl}${projectPath(project, "en")}`,
        thumbnailUrl,
        title: project.titleEn,
        description: project.metaDescriptionEn || project.summaryEn,
        publicationDate: project.uploadDate,
        duration: project.durationSeconds,
        playerUrl: `https://www.youtube-nocookie.com/embed/${project.videoId}`,
        uploaderUrl: project.uploaderUrl || `${baseUrl}/en/about-hassn-editor`,
        ...(project.collectionSlug === "kokab-fodool" ? { uploaderName: "Kokab Fodool" } : {}),
      },
    ];
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${[...showreelEntries, ...projectEntries].map(renderVideoEntry).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
