import Link from "next/link";
import { ArrowIcon } from "./PortfolioIcons";

const projects = [
  {
    key: "syria-store",
    url: "https://www.syriastoreonline.com/",
    labelAr: "متجر إلكتروني متكامل",
    labelEn: "Full e-commerce platform",
    titleAr: "Syria Store",
    titleEn: "Syria Store",
    descriptionAr: "متجر إلكتروني عملي بواجهة مهيأة للجوال، صفحات منتجات وسلة وطلبات، تحسينات SEO وفهرسة Google وتجربة شراء واضحة.",
    descriptionEn: "A practical e-commerce platform with a mobile-first storefront, product pages, cart and ordering flows, plus SEO and Google indexing improvements.",
    tagsAr: ["متجر إلكتروني", "تجربة جوال", "SEO", "طلبات"],
    tagsEn: ["E-commerce", "Mobile UX", "SEO", "Orders"],
    mark: "SYRIA STORE",
  },
  {
    key: "kokab-fodool",
    url: "https://kokabfodool.com/",
    labelAr: "منصة تعليمية ومشروع تطبيق",
    labelEn: "Educational platform & app project",
    titleAr: "كوكب فضول",
    titleEn: "Kokab Fodool",
    descriptionAr: "منصة تعليمية للأطفال تجمع الموقع وتطبيق Android والألعاب والقصص وأوراق العمل والسلاسل التعليمية ضمن تجربة واحدة.",
    descriptionEn: "A children’s learning platform combining the website, Android app, games, stories, worksheets and educational series in one connected experience.",
    tagsAr: ["موقع", "Android", "ألعاب", "محتوى تعليمي"],
    tagsEn: ["Website", "Android", "Games", "Learning content"],
    mark: "كوكب فضول",
  },
];

export default function DigitalProjects({ language = "ar", compact = false }: { language?: "ar" | "en"; compact?: boolean }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  return (
    <section className={`digital-projects ${compact ? "digital-projects-compact" : ""}`} id="digital-projects" aria-labelledby="digital-projects-title">
      <div className="digital-projects-heading">
        <div>
          <p className="eyebrow">DIGITAL PROJECTS</p>
          <h2 id="digital-projects-title">{en ? "Websites and apps built around real projects" : "مواقع وتطبيقات مبنية لمشاريع حقيقية"}</h2>
        </div>
        <div className="digital-projects-intro">
          <p>{en ? "A complementary digital service alongside my core video work—focused on clear mobile experiences, useful functionality and launch-ready delivery." : "خدمة رقمية مكملة لتخصصي الأساسي في الفيديو، تركّز على تجربة جوال واضحة ووظائف عملية وتسليم جاهز للإطلاق."}</p>
          {!compact && <Link prefetch={false} href={`${prefix}/services/web-app-design`}>{en ? "Explore web & app design" : "استكشف خدمة تصميم المواقع والتطبيقات"}<ArrowIcon /></Link>}
        </div>
      </div>
      <div className="digital-projects-grid">
        {projects.map((project) => {
          const tags = en ? project.tagsEn : project.tagsAr;
          return (
            <article className={`digital-project-card digital-project-${project.key}`} key={project.key}>
              <a className="digital-project-preview" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={en ? `Open ${project.titleEn}` : `فتح مشروع ${project.titleAr}`}>
                <span className="digital-browser-bar" aria-hidden="true"><i /><i /><i /><small>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</small></span>
                <span className="digital-project-mark">{project.mark}</span>
                <span className="digital-project-screen-lines" aria-hidden="true"><i /><i /><i /></span>
              </a>
              <div className="digital-project-copy">
                <small>{en ? project.labelEn : project.labelAr}</small>
                <h3>{en ? project.titleEn : project.titleAr}</h3>
                <p>{en ? project.descriptionEn : project.descriptionAr}</p>
                <div className="digital-project-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a href={project.url} target="_blank" rel="noopener noreferrer">{en ? "View live project" : "شاهد المشروع مباشرة"}<ArrowIcon /></a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
