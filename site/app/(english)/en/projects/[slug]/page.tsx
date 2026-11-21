import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "../../../../ProjectPage";
import { portfolioProjects, projectBySlug, projectRouteBase } from "../../../../projectData";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.filter((project) => projectRouteBase(project) === "projects").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "projects") return {};
  const arabicUrl = `https://hassneditor.com/projects/${project.slug}`;
  const canonicalUrl = `https://hassneditor.com/en/projects/${project.slug}`;
  return {
    title: project.metaTitleEn || project.titleEn,
    description: project.metaDescriptionEn || project.summaryEn,
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: arabicUrl, en: canonicalUrl, "x-default": arabicUrl },
    },
    openGraph: {
      title: `${project.titleEn} | HASSN EDITOR`,
      description: project.metaDescriptionEn || project.summaryEn,
      url: `https://hassneditor.com/en/projects/${project.slug}`,
      locale: "en_AE",
      images: [{ url: project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`, width: 480, height: 360, alt: project.titleEn }],
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

export default async function EnglishProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "projects") notFound();
  return <ProjectPage project={project} language="en" />;
}
