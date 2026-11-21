import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "../../../ProjectPage";
import { portfolioProjects, projectBySlug, projectRouteBase } from "../../../projectData";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.filter((project) => projectRouteBase(project) === "works").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "works") return {};
  const canonicalUrl = `https://hassneditor.com/works/${project.slug}`;
  const englishUrl = `https://hassneditor.com/en/works/${project.slug}`;
  return {
    title: project.metaTitleAr || project.titleAr,
    description: project.metaDescriptionAr || project.summaryAr,
    keywords: project.keywordsAr || ["مونتاج فيديو صناعي", "فيديو ترويجي صناعي", "فيديو شركات", "إنتاج فيديو بالذكاء الاصطناعي", "موشن جرافيك", "مصنع GGBS الذكي"],
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: canonicalUrl, en: englishUrl, "x-default": canonicalUrl },
    },
    openGraph: {
      title: `${project.titleAr} | HASSN EDITOR`,
      description: project.metaDescriptionAr || project.summaryAr,
      url: canonicalUrl,
      images: [{ url: project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`, width: project.thumbnailFit === "contain" ? 1600 : 480, height: project.thumbnailFit === "contain" ? 900 : 360, alt: project.thumbnailAltAr || project.titleAr }],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.titleAr} | HASSN EDITOR`,
      description: project.metaDescriptionAr || project.summaryAr,
      images: [project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`],
    },
  };
}

export default async function ArabicWorkProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "works") notFound();
  return <ProjectPage project={project} language="ar" />;
}
