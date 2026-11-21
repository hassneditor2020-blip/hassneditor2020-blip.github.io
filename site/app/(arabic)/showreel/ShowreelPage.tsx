import { ArrowIcon } from "../../PortfolioIcons";
import SiteHeader from "../../SiteHeader";
import Link from "next/link";
import PrivacySettingsButton from "../../PrivacySettingsButton";
import { watchPageModified } from "../../contentDates";

type Language = "ar" | "en";

export const showreelData = {
  titleAr: "الفيديو التعريفي لحسن إيديتور",
  titleEn: "HASSN EDITOR Introduction Showreel",
  descriptionAr: "فيديو تعريفي مختصر يعرض خدمات حسن إيديتور في المونتاج وإنتاج المحتوى والموشن جرافيك وفيديوهات الذكاء الاصطناعي داخل الإمارات.",
  descriptionEn: "A concise introduction to HASSN EDITOR video editing, full content production, motion graphics and AI video services in the UAE.",
  uploadDate: "2026-08-03",
  duration: "PT20S",
};

export default function ShowreelPage({ language = "ar" }: { language?: Language }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const alternatePath = en ? "/showreel" : "/en/showreel";
  const pageUrl = `https://hassneditor.com${prefix}/showreel`;
  const title = en ? showreelData.titleEn : showreelData.titleAr;
  const description = en ? showreelData.descriptionEn : showreelData.descriptionAr;
  const whatsappText = en
    ? "Hello Hassn, I watched your introduction video and would like to discuss a project."
    : "مرحبًا حسن، شاهدت الفيديو التعريفي وأرغب في مناقشة مشروع فيديو.";
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: title,
    description,
    thumbnailUrl: ["https://hassneditor.com/hassn-editor-showreel-cover.jpg"],
    uploadDate: showreelData.uploadDate,
    duration: showreelData.duration,
    contentUrl: "https://hassneditor.com/hassn-editor-showreel.mp4",
    url: pageUrl,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    inLanguage: en ? "en-AE" : "ar-AE",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "HASSN EDITOR",
      logo: { "@type": "ImageObject", url: "https://hassneditor.com/hassn-logo.png" },
    },
    potentialAction: { "@type": "WatchAction", target: pageUrl },
  };
  const watchPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    dateModified: watchPageModified,
    inLanguage: language,
    mainEntity: { "@id": `${pageUrl}#video` },
    potentialAction: { "@type": "WatchAction", target: pageUrl },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
      { "@type": "ListItem", position: 2, name: title, item: pageUrl },
    ],
  };

  return (
    <main className={`site showreel-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([watchPageStructuredData, videoStructuredData, breadcrumbStructuredData]) }} />
      <a className="skip-link" href="#showreel-content">{en ? "Skip to video" : "انتقل إلى الفيديو"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={alternatePath} />

      <section className="showreel-watch" id="showreel-content">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><b>{en ? "Introduction video" : "الفيديو التعريفي"}</b></nav>
        <div className="showreel-heading">
          <div><p className="eyebrow">SHOWREEL / 2026</p><h1>{title}</h1></div>
        </div>
        <div className="showreel-player">
          <video controls playsInline preload="metadata" poster="/hassn-editor-showreel-cover.webp" aria-label={title}>
            <source src="/hassn-editor-showreel.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="showreel-description">{description}</p>
        <div className="showreel-summary">
          <span><strong>00:20</strong><small>{en ? "Duration" : "المدة"}</small></span>
          <span><strong>UAE</strong><small>{en ? "Based in Ajman" : "مقيم في عجمان"}</small></span>
          <span><strong>360°</strong><small>{en ? "Concept to publishing" : "من الفكرة إلى النشر"}</small></span>
        </div>
        <div className="showreel-actions"><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss your project" : "ناقش مشروعك معي"} <span><ArrowIcon /></span></a><Link prefetch={false} className="secondary-button" href={`${prefix}/works`}>{en ? "View selected work" : "شاهد الأعمال المختارة"} <span><ArrowIcon /></span></Link></div>
      </section>

      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix || ""}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}
