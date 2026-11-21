import SiteHeader from "./SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";

type Language = "ar" | "en";

const industries = [
  {
    id: "restaurant-events",
    titleAr: "فيديوهات المطاعم والفعاليات",
    titleEn: "Restaurant & Event Video",
    descriptionAr: "تصوير ومونتاج يعرض المكان والمنتج وتجربة الزائر وأجواء الفعاليات ضمن محتوى قصير وجذاب.",
    descriptionEn: "Filming and editing that present the venue, product, guest experience and event atmosphere in engaging short-form content.",
    landing: "/restaurant-videography-uae",
    works: "/works#restaurant-events",
    guide: "/guides/restaurant-video-marketing-guide",
  },
  {
    id: "industrial",
    titleAr: "الفيديو الصناعي وفيديوهات الشركات والسلامة",
    titleEn: "Industrial, Corporate & HSE Video",
    descriptionAr: "تبسيط المصانع والعمليات والمفاهيم التقنية ضمن قصة بصرية واضحة ومهنية.",
    descriptionEn: "Clear visual stories for factories, processes and complex technical concepts.",
    landing: "/industrial-video-production-uae",
    works: "/works#ai",
    guide: "/guides/industrial-video-production-guide",
  },
  {
    id: "real-estate",
    titleAr: "الفيديو العقاري",
    titleEn: "Real Estate Video",
    descriptionAr: "مونتاج وموشن يبرز الموقع والمزايا والفرصة الاستثمارية بمحتوى مناسب للهاتف.",
    descriptionEn: "Editing and motion that highlight location, benefits and investment value.",
    landing: "/real-estate-video-editing-uae",
    works: "/works#realestate",
    guide: "/guides/real-estate-video-marketing-guide",
  },
  {
    id: "dental",
    titleAr: "الدينتال والمحتوى الطبي",
    titleEn: "Dental & Medical Content",
    descriptionAr: "شرح الخدمات والعلاجات بصريًا مع الحفاظ على الوضوح والطابع المهني للعيادة.",
    descriptionEn: "Clear visual explanations for treatments, services and clinic campaigns.",
    landing: "/dental-motion-graphics",
    works: "/works#medical",
    guide: "/guides/dental-video-content-guide",
  },
  {
    id: "product",
    titleAr: "إعلانات المنتجات",
    titleEn: "Product Advertising",
    descriptionAr: "إعلانات قصيرة تبني اللقطات والإيقاع والعناوين حول قيمة المنتج ونقطة البيع الأساسية.",
    descriptionEn: "Short-form ads shaped around product value, visual pacing and a clear selling point.",
    landing: "/product-video-ads",
    works: "/works#ads",
    guide: "/guides/video-editing-cost-factors",
  },
  {
    id: "ai-video",
    titleAr: "إنتاج فيديو بالذكاء الاصطناعي",
    titleEn: "AI Video Production",
    descriptionAr: "تطوير الفكرة وتوليد المشاهد ودمجها مع المونتاج والموشن والصوت ضمن نتيجة متكاملة.",
    descriptionEn: "Concept development, AI-assisted visuals, editing, motion and sound in one workflow.",
    landing: "/services/ai-video",
    works: "/works#ai",
    guide: "/guides/ai-video-production-uae-guide",
  },
  {
    id: "ai-characters",
    titleAr: "الشخصيات الكرتونية بالذكاء الاصطناعي",
    titleEn: "AI Cartoon Characters",
    descriptionAr: "شخصيات وقصص تعليمية وتوعوية مع عناية بثبات الملامح والاستمرارية بين المشاهد.",
    descriptionEn: "Educational and awareness stories with consistent characters across scenes.",
    landing: "/services/ai-cartoon-characters",
    works: "/works#ai",
    guide: "/guides/ai-cartoon-character-video-guide",
  },
] as const;

export function getIndustriesMetadata(language: Language): Metadata {
  const en = language === "en";
  const path = en ? "/en/industries" : "/industries";
  const title = en ? "Video Production Industries in the UAE" : "قطاعات صناعة الفيديو والمحتوى في الإمارات";
  const description = en
    ? "Explore specialized video editing, motion graphics and AI video production for industrial, real estate, restaurant, dental, product and character-led content in the UAE."
    : "خدمات متخصصة في المونتاج والموشن وفيديوهات الذكاء الاصطناعي للقطاع الصناعي والعقاري والمطاعم والدينتال والمنتجات والشخصيات الكرتونية في الإمارات.";
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ar: "/industries", en: "/en/industries", "x-default": "/industries" },
    },
    openGraph: {
      title: `${title} | HASSN EDITOR`,
      description,
      url: `https://hassneditor.com${path}`,
      images: ["/hassn-editor-showreel-cover.jpg"],
      locale: en ? "en_AE" : "ar_AE",
    },
    twitter: { card: "summary_large_image", title: `${title} | HASSN EDITOR`, description, images: ["/hassn-editor-showreel-cover.jpg"] },
  };
}

export default function IndustriesPage({ language = "ar" }: { language?: Language }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const canonicalUrl = `https://hassneditor.com${prefix}/industries`;
  const title = en ? "Video production for the sectors you work in" : "صناعة فيديو متخصصة للقطاعات التي تعمل بها";
  const description = en
    ? "Choose your sector to see the relevant service, selected projects and a practical guide—all connected around the same production need."
    : "اختر قطاعك للوصول إلى الخدمة المناسبة والأعمال المرتبطة ودليل عملي، ضمن مسار واضح يسهّل اكتشاف ما يلائم مشروعك.";
  const itemList = industries.map((industry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: en ? industry.titleEn : industry.titleAr,
    url: `https://hassneditor.com${prefix}${industry.landing}`,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: en ? "en" : "ar",
        isPartOf: { "@id": "https://hassneditor.com/#website" },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#industries` },
      },
      { "@type": "ItemList", "@id": `${canonicalUrl}#industries`, name: title, numberOfItems: industries.length, itemListElement: itemList },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: en ? "Industries" : "القطاعات", item: canonicalUrl },
        ],
      },
    ],
  };
  const whatsappText = en
    ? "Hello Hassn, I would like to discuss a video project for my industry."
    : "مرحبًا حسن، أرغب في مناقشة مشروع فيديو لقطاع عملي.";

  return (
    <main className={`site service-page industries-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#industries-content">{en ? "Skip to industries" : "انتقل إلى القطاعات"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={en ? "/industries" : "/en/industries"} />

      <section className="service-hero" id="industries-content">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><b>{en ? "Industries" : "القطاعات"}</b></nav>
        <p className="eyebrow">HASSN EDITOR / INDUSTRIES</p>
        <h1>{title}</h1>
        <p className="service-lead">{description}</p>
      </section>

      <section className="industries-grid" aria-label={en ? "Video production industries" : "قطاعات صناعة الفيديو"}>
        {industries.map((industry, index) => (
          <article id={industry.id} key={industry.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{en ? industry.titleEn : industry.titleAr}</h2>
            <p>{en ? industry.descriptionEn : industry.descriptionAr}</p>
            <nav aria-label={en ? `${industry.titleEn} links` : `روابط ${industry.titleAr}`}>
              <Link prefetch={false} href={`${prefix}${industry.landing}`}>{en ? "Service details" : "تفاصيل الخدمة"} <b>↗</b></Link>
              <Link prefetch={false} href={`${prefix}${industry.works}`}>{en ? "Selected work" : "أعمال مختارة"} <b>↗</b></Link>
              <Link prefetch={false} href={`${prefix}${industry.guide}`}>{en ? "Practical guide" : "دليل عملي"} <b>↗</b></Link>
            </nav>
          </article>
        ))}
      </section>

      <section className="works-cta"><p className="eyebrow">START A PROJECT</p><h2>{en ? "Not sure which service fits your project?" : "لست متأكدًا من الخدمة المناسبة لمشروعك؟"}</h2><a className="primary-button" href={`https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer">{en ? "Describe your project" : "أرسل وصف مشروعك"} <span>↗</span></a></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={`${prefix}/guides`}>{en ? "Guides" : "دليل الفيديو"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
    </main>
  );
}
