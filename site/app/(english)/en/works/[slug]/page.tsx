import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "../../../../ProjectPage";
import { portfolioProjects, projectBySlug, projectRouteBase } from "../../../../projectData";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.filter((project) => projectRouteBase(project) === "works").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "works") return {};
  const arabicUrl = `https://hassneditor.com/works/${project.slug}`;
  const canonicalUrl = `https://hassneditor.com/en/works/${project.slug}`;
  return {
    title: project.metaTitleEn || project.titleEn,
    description: project.metaDescriptionEn || project.summaryEn,
    keywords: project.keywordsEn || ["Industrial Video Editing", "Industrial Promo Video", "Corporate Video Editing", "AI Video Production", "Motion Graphics", "Smart Factory Video", "Industrial Video Editor", "GGBS Smart Factory"],
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: arabicUrl, en: canonicalUrl, "x-default": arabicUrl },
    },
    openGraph: {
      title: `${project.titleEn} | HASSN EDITOR`,
      description: project.metaDescriptionEn || project.summaryEn,
      url: canonicalUrl,
      locale: "en_AE",
      images: [{ url: project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`, width: project.thumbnailFit === "contain" ? 1600 : 480, height: project.thumbnailFit === "contain" ? 900 : 360, alt: project.thumbnailAltEn || project.titleEn }],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.titleEn} | HASSN EDITOR`,
      description: project.metaDescriptionEn || project.summaryEn,
      images: [project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`],
    },
  };
}

export default async function EnglishWorkProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "works") notFound();
  return <ProjectPage project={project} language="en" />;
}
