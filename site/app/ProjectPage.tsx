import { ArrowIcon } from "./PortfolioIcons";
import SiteHeader from "./SiteHeader";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";
import ProjectVideo from "./ProjectVideo";
import { watchPageModified } from "./contentDates";
import { videoCoverSource, videoThumbnailSrcSet } from "./videoThumbnails";
import { portfolioProjects, projectBySlug, projectPath, type PortfolioProject } from "./projectData";

export default function ProjectPage({ project, language }: { project: PortfolioProject; language: "ar" | "en" }) {
  const en = language === "en";
  const title = en ? project.titleEn : project.titleAr;
  const summary = en ? project.summaryEn : project.summaryAr;
  const extendedDescription = en ? project.extendedDescriptionEn : project.extendedDescriptionAr;
  const approach = en ? project.approachEn : project.approachAr;
  const objective = en ? project.objectiveEn : project.objectiveAr;
  const outcome = en ? project.outcomeEn : project.outcomeAr;
  const challenge = en ? project.challengeEn : project.challengeAr;
  const solution = en ? project.solutionEn : project.solutionAr;
  const deliverables = en ? project.deliverablesEn : project.deliverablesAr;
  const relatedProject = project.relatedProjectSlug ? projectBySlug(project.relatedProjectSlug) : undefined;
  const serviceLabels: Record<string, { ar: string; en: string }> = {
    "videography": { ar: "خدمة تصوير الفيديو الاحترافي", en: "Professional videography service" },
    "ai-video": { ar: "خدمة إنتاج فيديوهات الذكاء الاصطناعي", en: "AI video production service" },
    "ai-cartoon-characters": { ar: "خدمة إنتاج الشخصيات الكرتونية بالذكاء الاصطناعي", en: "AI cartoon character production service" },
    "motion-graphics": { ar: "خدمة الموشن جرافيك", en: "Motion graphics service" },
    "content-production": { ar: "خدمة إنتاج المحتوى المتكامل", en: "Full content production service" },
    "video-editing": { ar: "خدمة مونتاج الفيديو", en: "Video editing service" },
  };
  const serviceSlugs = project.serviceSlugs || [project.serviceSlug];
  const projectTopic = `${project.categoryEn} ${project.industryEn || ""}`.toLowerCase();
  const isDentalProject = projectTopic.includes("dental");
  const isRealEstateProject = projectTopic.includes("real estate") || projectTopic.includes("real-estate");
  const isIndustrialProject = projectTopic.includes("industrial") || project.slug === "ggbs-smart-factory-industrial-promo";
  const isRestaurantProject = project.slug === "fm-restaurant-ajman-live-event-video" || projectTopic.includes("restaurant");
  const industryHub = isRestaurantProject
    ? { route: "restaurant-videography-uae", id: "local-content", ar: "خدمة تصوير ومونتاج المطاعم والفعاليات", en: "Restaurant and event videography service" }
    : isIndustrialProject
    ? { route: "industries", id: "industrial", ar: "قطاع الفيديو الصناعي وفيديوهات الشركات", en: "Industrial and corporate video industry" }
    : isRealEstateProject
      ? { route: "industries", id: "real-estate", ar: "قطاع الفيديو العقاري", en: "Real-estate video industry" }
      : isDentalProject
        ? { route: "industries", id: "dental", ar: "قطاع الدينتال والمحتوى الطبي", en: "Dental and medical content industry" }
        : project.serviceSlug === "ai-video"
          ? { route: "industries", id: "ai-video", ar: "قطاع إنتاج فيديو بالذكاء الاصطناعي", en: "AI video production industry" }
          : { route: "industries", id: "product", ar: "قطاع إعلانات المنتجات", en: "Product advertising industry" };
  const relatedGuide = isRealEstateProject
    ? { slug: "real-estate-video-marketing-guide", ar: "دليل صناعة فيديو عقاري فعّال", en: "Real-estate video marketing guide" }
    : isIndustrialProject
      ? { slug: "industrial-video-production-guide", ar: "دليل صناعة فيديو صناعي واضح", en: "Industrial video production guide" }
      : isRestaurantProject
        ? { slug: "restaurant-video-marketing-guide", ar: "دليل صناعة فيديو مطعم يجذب الزوار", en: "Restaurant video marketing guide" }
      : project.serviceSlug === "ai-video"
        ? { slug: "ai-video-production-uae-guide", ar: "دليل إنتاج فيديو AI احترافي", en: "Professional AI video production guide" }
        : isDentalProject
      ? { slug: "dental-video-content-guide", ar: "دليل صناعة فيديوهات طبية واضحة", en: "Guide to clear, engaging dental videos" }
      : project.serviceSlug === "content-production"
        ? { slug: "video-editing-cost-factors", ar: "دليل عوامل تكلفة مونتاج الفيديو", en: "Guide to video editing cost factors" }
        : { slug: "choose-video-editor-uae", ar: "دليل اختيار مونتير فيديو في الإمارات", en: "Guide to choosing a video editor in the UAE" };
  const projectIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];
  const seenRelatedProjects = new Set<string>();
  const relatedProjectCards = [
    relatedProject,
    ...portfolioProjects.filter((candidate) => candidate.slug !== project.slug && (candidate.serviceSlug === project.serviceSlug || candidate.serviceSlugs?.some((serviceSlug) => serviceSlugs.includes(serviceSlug)))),
    nextProject,
  ].filter((candidate): candidate is PortfolioProject => {
    if (!candidate || candidate.slug === project.slug || seenRelatedProjects.has(candidate.slug)) return false;
    seenRelatedProjects.add(candidate.slug);
    return true;
  }).slice(0, 2);
  const base = en ? "/en" : "";
  const currentPath = projectPath(project, language);
  const alternatePath = projectPath(project, en ? "ar" : "en");
  const canonicalUrl = `https://hassneditor.com${currentPath}`;
  const youtubeUrl = project.videoFormat === "landscape" ? `https://www.youtube.com/watch?v=${project.videoId}` : `https://www.youtube.com/shorts/${project.videoId}`;
  const absoluteThumbnailUrl = project.thumbnailUrl
    ? (project.thumbnailUrl.startsWith("http") ? project.thumbnailUrl : `https://hassneditor.com${project.thumbnailUrl}`)
    : `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
  const whatsappText = en
    ? `Hello Hassn, I viewed your project “${project.titleEn}” and would like to discuss a similar video.`
    : `مرحبًا حسن، شاهدت مشروع «${project.titleAr}» وأرغب في مناقشة تنفيذ فيديو مشابه.`;
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const videoId = `${canonicalUrl}#video`;
  const caseStudyId = `${canonicalUrl}#case-study`;
  const projectDescription = en ? (project.metaDescriptionEn || summary) : (project.metaDescriptionAr || summary);
  const projectKeywords = en
    ? (project.keywordsEn || [project.categoryEn, project.industryEn, project.projectTypeEn, project.roleEn].filter((value): value is string => Boolean(value)))
    : (project.keywordsAr || [project.categoryAr, project.industryAr, project.projectTypeAr, project.roleAr].filter((value): value is string => Boolean(value)));
  const pageSchema: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: projectDescription,
    inLanguage: en ? "en" : "ar",
    breadcrumb: { "@id": breadcrumbId },
    isPartOf: { "@id": "https://hassneditor.com/#website" },
    dateModified: watchPageModified,
    author: { "@id": "https://hassneditor.com/#hassn-editor" },
    mainEntity: { "@id": project.uploadDate ? videoId : caseStudyId },
    potentialAction: { "@type": "WatchAction", target: canonicalUrl },
  };
  pageSchema.primaryImageOfPage = { "@type": "ImageObject", url: absoluteThumbnailUrl };

  const structuredGraph: Record<string, unknown>[] = [
    pageSchema,
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${base || "/"}` },
        { "@type": "ListItem", position: 2, name: en ? "Portfolio" : "الأعمال", item: `https://hassneditor.com${base}/works` },
        { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": caseStudyId,
      name: title,
      description: projectDescription,
      abstract: summary,
      url: canonicalUrl,
      inLanguage: en ? "en" : "ar",
      image: absoluteThumbnailUrl,
      creator: { "@id": "https://hassneditor.com/#hassn-editor" },
      about: { "@type": "Thing", name: en ? (project.industryEn || project.categoryEn) : (project.industryAr || project.categoryAr) },
      keywords: projectKeywords,
      isPartOf: { "@id": `${canonicalUrl}#webpage` },
      ...(project.uploadDate ? { associatedMedia: { "@id": videoId } } : {}),
    },
  ];

  if (project.uploadDate) {
    structuredGraph.push({
      "@type": "VideoObject",
      "@id": videoId,
      name: title,
      description: projectDescription,
      thumbnailUrl: [absoluteThumbnailUrl],
      uploadDate: project.uploadDate,
      ...(project.durationSeconds ? { duration: `PT${project.durationSeconds}S` } : {}),
      embedUrl: `https://www.youtube-nocookie.com/embed/${project.videoId}`,
      url: canonicalUrl,
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      inLanguage: en ? "en" : "ar",
      potentialAction: { "@type": "WatchAction", target: canonicalUrl },
      isFamilyFriendly: true,
      publisher: {
        "@type": "Organization",
        "@id": project.collectionSlug === "kokab-fodool" ? `${project.uploaderUrl}#organization` : "https://hassneditor.com/#business",
        name: project.collectionSlug === "kokab-fodool" ? "Kokab Fodool" : "HASSN EDITOR",
        ...(project.uploaderUrl ? { url: project.uploaderUrl } : {}),
        ...(project.collectionSlug !== "kokab-fodool" ? { logo: { "@type": "ImageObject", url: "https://hassneditor.com/hassn-logo.png" } } : {}),
      },
      creator: { "@id": "https://hassneditor.com/#hassn-editor" },
    });
  }

  const structuredData = { "@context": "https://schema.org", "@graph": structuredGraph };

  return (
    <main data-contact-page="project" data-contact-service={project.serviceSlug} data-contact-project={project.slug} className={`site project-page project-page-refined watch-page ${en ? "en" : "ar"}`} dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={alternatePath} />

      <a className="skip-link" href="#watch-video">{en ? "Skip to video" : "انتقل إلى الفيديو"}</a>
      <article className="project-detail">
        <nav className="project-breadcrumb" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={base || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><Link prefetch={false} href={`${base}/works`}>{en ? "Works" : "الأعمال"}</Link><span>/</span><span>{title}</span></nav>
        <header className="project-heading">
          <p className="eyebrow">{en ? "WATCH VIDEO / HASSN EDITOR" : "شاهد الفيديو / HASSN EDITOR"}</p>
          <h1>{title}</h1>
        </header>
        <section id="watch-video" className="project-watch-stage" aria-label={en ? "Watch the full video" : "شاهد الفيديو كاملًا"}>
          <div className={`project-video${project.videoFormat === "landscape" ? " project-video-landscape" : ""}`}><ProjectVideo videoId={project.videoId} title={title} language={language} format={project.videoFormat} priority /></div>
        </section>
        <div className="project-watch-caption">
          <div className="project-copy">
            {project.collectionSlug === "kokab-fodool" && <p className="kokab-project-context"><Link prefetch={false} href={`${base}/kokab-fodool`}>{en ? "Part of Kokab Fodool · Explore all four series" : "ضمن كوكب فضول · استكشف السلاسل الأربع"} <ArrowIcon /></Link></p>}
            <section className="project-video-summary" aria-labelledby="project-video-summary-title">
              <h2 id="project-video-summary-title">{en ? "Video summary" : "ملخص الفيديو"}</h2>
              <p className="project-summary">{summary}</p>
            </section>
            <div className="project-actions">
              <a className="primary-button" data-contact-placement="project_primary" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Request a similar video" : "اطلب فيديو مشابهًا"} <span><ArrowIcon /></span></a>
              <a className="text-link" href={youtubeUrl} target="_blank" rel="noreferrer">{en ? "Watch on YouTube" : "مشاهدة على يوتيوب"} <span><ArrowIcon /></span></a>
            </div>
            <div className="watch-quick-facts">
              {project.durationSeconds && <span dir="ltr">{Math.floor(project.durationSeconds / 60)}:{String(project.durationSeconds % 60).padStart(2, "0")}</span>}
              <span>{project.videoFormat === "landscape" ? "16:9" : "9:16"}</span>
              <a href="#project-details">{en ? "About this work" : "عن هذا العمل"}</a>
            </div>
          </div>
        </div>
        <details className="project-story" id="project-details">
          <summary>{en ? "Project details and production process" : "تفاصيل العمل وطريقة التنفيذ"}<span aria-hidden="true">+</span></summary>
          <div className="project-story-content">
            {(project.client || project.industryEn || project.roleEn || project.projectTypeEn || project.durationSeconds || project.uploadDate) && <dl className="project-facts">
              {project.durationSeconds && <div><dt>{en ? "Video duration" : "مدة الفيديو"}</dt><dd>{project.durationSeconds} {en ? "seconds" : "ثانية"}</dd></div>}
              {project.uploadDate && <div><dt>{en ? "Published on YouTube" : "تاريخ النشر على YouTube"}</dt><dd><time dateTime={project.uploadDate}>{new Intl.DateTimeFormat(en ? "en-GB" : "ar-AE", { day: "numeric", month: "long", year: "numeric", calendar: "gregory", timeZone: "Asia/Dubai" }).format(new Date(project.uploadDate))}</time></dd></div>}
              {project.client && <div><dt>{en ? "Client" : "العميل"}</dt><dd>{project.client}</dd></div>}
              {(project.industryAr || project.industryEn) && <div><dt>{en ? "Industry" : "المجال"}</dt><dd>{en ? project.industryEn : project.industryAr}</dd></div>}
              {(project.roleAr || project.roleEn) && <div><dt>{en ? "Role" : "الدور"}</dt><dd>{en ? project.roleEn : project.roleAr}</dd></div>}
              {(project.projectTypeAr || project.projectTypeEn) && <div><dt>{en ? "Project type" : "نوع المشروع"}</dt><dd>{en ? project.projectTypeEn : project.projectTypeAr}</dd></div>}
            </dl>}
        {extendedDescription && <div className="project-description project-context">{extendedDescription.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}

        <div className="project-notes">
          <section><small>{en ? "PROJECT OBJECTIVE" : "هدف المشروع"}</small><h2>{en ? "What the video needed to achieve" : "ماذا كان يجب أن يحقق الفيديو؟"}</h2><p>{objective}</p></section>
          <section><small>{challenge ? (en ? "CHALLENGE & SOLUTION" : "التحدي والحل") : (en ? "CREATIVE APPROACH" : "منهج التنفيذ")}</small><h2>{challenge ? (en ? "From the brief to the visual solution" : "من المطلوب إلى الحل البصري") : (en ? "How the project was shaped" : "كيف بُني المشروع")}</h2>{challenge && solution ? <dl className="project-challenge"><div><dt>{en ? "The challenge" : "التحدي"}</dt><dd>{challenge}</dd></div><div><dt>{en ? "The solution" : "الحل"}</dt><dd>{solution}</dd></div></dl> : <p>{approach}</p>}</section>
          <section><small>{en ? "DELIVERABLES" : "نطاق العمل"}</small><h2>{en ? "What this project included" : "ما شمله هذا المشروع"}</h2><ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><small>{en ? "FINAL OUTCOME" : "النتيجة النهائية"}</small><h2>{en ? "A clear, publish-ready result" : "نتيجة واضحة وجاهزة للنشر"}</h2><p>{outcome}</p></section>
        </div>
          </div>
        </details>
        <section className="project-related-showcase" aria-labelledby="related-projects-title">
          <header><small>RELATED WORK</small><h2 id="related-projects-title">{en ? "Explore related projects" : "استكشف مشاريع مرتبطة"}</h2></header>
          <div>{relatedProjectCards.map((candidate) => <Link prefetch={false} key={candidate.slug} href={projectPath(candidate, language)}><span className="related-project-image"><img src={videoCoverSource(candidate.videoId, candidate.thumbnailUrl)} srcSet={videoThumbnailSrcSet(candidate.videoId, candidate.thumbnailUrl)} sizes="(max-width: 600px) 112px, (max-width: 900px) 180px, 220px" alt={en ? (candidate.thumbnailAltEn || candidate.titleEn) : (candidate.thumbnailAltAr || candidate.titleAr)} width="480" height="360" loading="lazy" decoding="async" /></span><span className="related-project-copy"><small>{en ? candidate.categoryEn : candidate.categoryAr}</small><strong>{en ? candidate.titleEn : candidate.titleAr}</strong><b>{en ? "View case study" : "مشاهدة دراسة الحالة"} <i><ArrowIcon /></i></b></span></Link>)}</div>
        </section>
        <nav className="project-related-links" aria-label={en ? "Related service and projects" : "الخدمة والمشاريع المرتبطة"}>
          <Link prefetch={false} href={isIndustrialProject ? `${base}/industrial-video-production-uae#hse-video-production` : `${base}/${industryHub.route}#${industryHub.id}`}>{en ? industryHub.en : industryHub.ar} <span><ArrowIcon /></span></Link>
          {serviceSlugs.map((slug) => {
            const label = serviceLabels[slug] || serviceLabels["video-editing"];
            return <Link prefetch={false} key={slug} href={`${base}/services/${slug}`}>{en ? label.en : label.ar} <span><ArrowIcon /></span></Link>;
          })}
          <Link prefetch={false} href={`${base}/guides/${relatedGuide.slug}`}>{en ? relatedGuide.en : relatedGuide.ar} <span><ArrowIcon /></span></Link>
        </nav>
        <div className="project-next"><div><small>{en ? "START A PROJECT" : "ابدأ مشروعًا"}</small><strong>{en ? (project.ctaEn || "Let’s shape your next video.") : (project.ctaAr || "لنصنع فيديوك القادم.")}</strong>{project.client && <div className="project-contact-links"><a href="tel:+971505918238">{en ? "Call & WhatsApp: +971 50 591 8238" : "اتصال وواتساب: ‎+971 50 591 8238"}</a><a href="https://www.hassneditor.com">www.hassneditor.com</a></div>}</div><a href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Let’s work together" : "لنعمل معًا"} <span><ArrowIcon /></span></a></div>
      </article>

      <footer><span>© 2026 HASSN EDITOR</span><a href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}
