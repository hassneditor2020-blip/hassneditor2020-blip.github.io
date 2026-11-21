import Link from "next/link";
import { ArrowIcon } from "./PortfolioIcons";
import { projectBySlug, projectPath } from "./projectData";

const examples: Record<string, string[]> = {
  "video-editing": ["swiss-product-story-ad", "fm-restaurant-ajman-live-event-video"],
  "ai-video": ["ggbs-smart-factory-industrial-promo", "kokab-fodool-arabic-letter-baa"],
};

export default function ServiceProjectNotes({ slug, language }: { slug: string; language: "ar" | "en" }) {
  const slugs = examples[slug];
  if (!slugs) return null;
  const en = language === "en";
  return <section className="service-project-notes" aria-labelledby="project-notes-title">
    <div className="section-heading"><div><p className="eyebrow">BEHIND THE WORK</p><h2 id="project-notes-title">{en ? "How the published projects were made" : "كيف نُفذت هذه المشاريع؟"}</h2></div></div>
    <p className="project-notes-intro">{en ? "Open a project to see my role, the production approach and the finished output, then watch the full video." : "افتح المشروع للتعرّف إلى دوري وطريقة التنفيذ والمخرج النهائي، ثم شاهد الفيديو كاملًا."}</p>
    <div className="project-notes-grid">{slugs.map((projectSlug) => {
      const project = projectBySlug(projectSlug);
      if (!project) return null;
      return <details key={projectSlug}>
        <summary><span><small>{project.collectionSlug === "kokab-fodool" ? (en ? "Independent educational project" : "مشروع تعليمي مستقل") : (en ? project.categoryEn : project.categoryAr)}</small><strong>{en ? project.titleEn : project.titleAr}</strong></span><b aria-hidden="true">+</b></summary>
        <div className="project-notes-content"><dl>
          <div><dt>{en ? "My role" : "دوري في التنفيذ"}</dt><dd>{(en ? project.deliverablesEn : project.deliverablesAr).join(en ? ", " : "، ")}</dd></div>
          <div><dt>{en ? "Production approach" : "طريقة التنفيذ"}</dt><dd>{en ? project.approachEn : project.approachAr}</dd></div>
          <div><dt>{en ? "Finished output" : "المخرج النهائي"}</dt><dd>{en ? project.outcomeEn : project.outcomeAr}</dd></div>
        </dl><Link prefetch={false} href={projectPath(project, language)}>{en ? "Watch the video and project story" : "شاهد الفيديو وقصة المشروع"}<ArrowIcon /></Link></div>
      </details>;
    })}</div>
  </section>;
}
