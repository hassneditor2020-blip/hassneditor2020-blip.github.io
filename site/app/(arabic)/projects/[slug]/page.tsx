import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "../../../ProjectPage";
import { portfolioProjects, projectBySlug, projectRouteBase } from "../../../projectData";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.filter((project) => projectRouteBase(project) === "projects").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "projects") return {};
  const canonicalUrl = `https://hassneditor.com/projects/${project.slug}`;
  const englishUrl = `https://hassneditor.com/en/projects/${project.slug}`;
  return {
    title: project.metaTitleAr || project.titleAr,
    description: project.metaDescriptionAr || project.summaryAr,
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: canonicalUrl, en: englishUrl, "x-default": canonicalUrl },
    },
    openGraph: {
      title: `${project.titleAr} | HASSN EDITOR`,
      description: project.metaDescriptionAr || project.summaryAr,
      url: `https://hassneditor.com/projects/${project.slug}`,
      images: [{ url: project.thumbnailUrl || `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`, width: 480, height: 360, alt: project.titleAr }],
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

export default async function ArabicProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project || projectRouteBase(project) !== "projects") notFound();
  return <ProjectPage project={project} language="ar" />;
}
