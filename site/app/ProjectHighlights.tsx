import Link from "next/link";
import { PortfolioProject, projectPath } from "./projectData";
import { videoCoverSource, videoThumbnailSrcSet } from "./videoThumbnails";

export default function ProjectHighlights({ projects, language, heading, showDetails = false }: { projects: PortfolioProject[]; language: "ar" | "en"; heading?: string; showDetails?: boolean }) {
  if (!projects.length) return null;
  const en = language === "en";
  return <section className="project-highlights" aria-label={en ? "Related video projects" : "نماذج أعمال مرتبطة"}>
    <div className="section-heading"><div><p className="eyebrow">FROM THE PORTFOLIO</p><h2>{heading || (en ? "See the work in practice" : "شاهد الخدمة في أعمال حقيقية")}</h2></div></div>
    <div className="project-highlights-grid">{projects.map((project) => <Link prefetch={false} key={project.slug} href={projectPath(project, language)}>
      <picture>
        <source media="(max-width: 600px)" srcSet={videoThumbnailSrcSet(project.videoId, project.thumbnailUrl, 480)} sizes="calc(100vw - 36px)" />
        <img src={videoCoverSource(project.videoId, project.thumbnailUrl)} srcSet={videoThumbnailSrcSet(project.videoId, project.thumbnailUrl)} sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1280px) 46vw, 596px" alt={en ? project.titleEn : project.titleAr} width="480" height="270" loading="lazy" decoding="async" />
      </picture>
      <div><small>{en ? project.categoryEn : project.categoryAr}</small><h3>{en ? project.titleEn : project.titleAr}</h3>{showDetails && <p>{en ? project.summaryEn : project.summaryAr}</p>}<span>{en ? "Watch project" : "شاهد المشروع"}</span></div>
    </Link>)}</div>
  </section>;
}
