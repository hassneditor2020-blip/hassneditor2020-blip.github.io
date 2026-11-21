import ServiceArea from "./ServiceArea";
import SiteHeader from "./SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { serviceCatalog } from "./(arabic)/services/ServicePage";

type Language = "ar" | "en";

export function getServicesIndexMetadata(language: Language): Metadata {
  const en = language === "en";
  const path = en ? "/en/services" : "/services";
  const alternatePath = en ? "/services" : "/en/services";
  const title = en ? "Video Production Services & Digital Design in the UAE" : "خدمات الفيديو والتصميم الرقمي في الإمارات";
  const description = en
    ? "Explore Hassn Editor's core video services in the UAE—videography, editing, motion and AI—plus complementary website and app design."
    : "استكشف خدمات حسن إيديتور الأساسية في تصوير ومونتاج وإنتاج الفيديو، إضافة إلى تصميم المواقع والتطبيقات كخدمة رقمية مكملة.";
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ar: en ? alternatePath : path, en: en ? path : alternatePath, "x-default": en ? alternatePath : path },
    },
    openGraph: { title: `${title} | HASSN EDITOR`, description, url: `https://hassneditor.com${path}`, images: ["/hassn-editor-showreel-cover.jpg"], locale: en ? "en_AE" : "ar_AE" },
    twitter: { card: "summary_large_image", title: `${title} | HASSN EDITOR`, description, images: ["/hassn-editor-showreel-cover.jpg"] },
  };
}

export default function ServicesIndexPage({ language = "ar" }: { language?: Language }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const path = `${prefix}/services`;
  const canonicalUrl = `https://hassneditor.com${path}`;
  const serviceOrder = ["videography", "video-editing", "content-production", "motion-graphics", "ai-video", "ai-cartoon-characters", "web-app-design"];
  const services = serviceOrder.map((slug) => serviceCatalog[slug]);
  const whatsappText = en
    ? "Hello Hassn, I would like help choosing the right video service for my project."
    : "مرحبًا حسن، أحتاج مساعدتك في اختيار خدمة الفيديو المناسبة لمشروعي.";
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: en ? "Video Production Services & Digital Design in the UAE" : "خدمات الفيديو والتصميم الرقمي في الإمارات",
        description: en ? "Core videography, editing, motion and AI video services, with complementary website and app design." : "خدمات تصوير ومونتاج وموشن وفيديو AI كخدمات أساسية، مع تصميم المواقع والتطبيقات كخدمة مكملة.",
        inLanguage: en ? "en" : "ar",
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#services` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#services`,
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: en ? service.titleEn : service.titleAr,
          url: `https://hassneditor.com${prefix}/services/${service.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: en ? "Services" : "الخدمات", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={`site service-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#services-content">{en ? "Skip to content" : "انتقل إلى المحتوى"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={en ? "/services" : "/en/services"} />

      <section className="service-hero" id="services-content">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><b>{en ? "Services" : "الخدمات"}</b></nav>
        <p className="eyebrow">HASSN EDITOR / SERVICES</p>
        <h1>{en ? "Video first—plus digital experiences when your project needs more" : "الفيديو أولًا — وتجارب رقمية عندما يحتاج مشروعك أكثر"}</h1>
        <p className="service-lead">{en ? "Videography, editing, motion graphics and AI production remain the core. Website and app design is available as a complementary digital service for businesses and projects that need a connected online experience." : "يبقى التصوير والمونتاج والموشن وإنتاج الفيديو جوهر الخدمات. ويتوفر تصميم المواقع والتطبيقات كخدمة رقمية مكملة للمشاريع التي تحتاج حضورًا إلكترونيًا مترابطًا."}</p>
        <div className="service-hero-actions"><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss your project" : "ناقش مشروعك معي"} <span>↗</span></a><Link prefetch={false} className="secondary-button" href={`${prefix}/works`}>{en ? "View portfolio" : "شاهد معرض الأعمال"} <span>↗</span></Link></div>
      </section>

      <section className="service-directory services-index-list" aria-labelledby="services-list-title">
        <p className="eyebrow">CHOOSE A SERVICE</p>
        <h2 id="services-list-title">{en ? "One specialist, one connected production workflow" : "مختص واحد ومسار إنتاج مترابط"}</h2>
        <div>{services.map((service, index) => <Link prefetch={false} key={service.slug} href={`${prefix}/services/${service.slug}`}><span><small>{String(index + 1).padStart(2, "0")}</small>{en ? service.titleEn : service.titleAr}</span><b>↗</b></Link>)}</div>
      </section>

      <div className="services-area-wrapper"><ServiceArea language={language} /></div>
      <section className="service-detail-grid">
        <article><p className="eyebrow">LOCATION</p><h2>{en ? "Based in Ajman, serving the UAE" : "في عجمان لخدمة المشاريع داخل الإمارات"}</h2><ul><li><span>✓</span>{en ? "Filming in Ajman, Sharjah and Dubai by appointment" : "تصوير في عجمان والشارقة ودبي بموعد مسبق"}</li><li><span>✓</span>{en ? "Remote editing for supplied footage" : "مونتاج عن بُعد للمواد المصورة"}</li><li><span>✓</span>{en ? "Vertical and horizontal video delivery" : "تسليم فيديو عمودي وأفقي للمنصات"}</li><li><span>✓</span>{en ? "Web & app design available remotely" : "تصميم المواقع والتطبيقات متاح عن بُعد"}</li></ul></article>
        <article><p className="eyebrow">POPULAR PATHS</p><h2>{en ? "Find the closest match" : "ابدأ من الخدمة الأقرب لك"}</h2><ul><li><span>↗</span><Link prefetch={false} href={`${prefix}/videographer-ajman`}>{en ? "Videographer in Ajman" : "مصور فيديو في عجمان"}</Link></li><li><span>↗</span><Link prefetch={false} href={`${prefix}/videographer-sharjah`}>{en ? "Videographer in Sharjah" : "مصور فيديو في الشارقة"}</Link></li><li><span>↗</span><Link prefetch={false} href={`${prefix}/videographer-dubai`}>{en ? "Videographer in Dubai" : "مصور فيديو في دبي"}</Link></li><li><span>↗</span><Link prefetch={false} href={`${prefix}/restaurant-videography-uae`}>{en ? "Restaurant videography" : "تصوير فيديوهات المطاعم"}</Link></li><li><span>↗</span><Link prefetch={false} href={`${prefix}/video-editing-uae`}>{en ? "Video editing in the UAE" : "مونتاج فيديو في الإمارات"}</Link></li></ul></article>
      </section>

      <section className="works-cta"><p className="eyebrow">NOT SURE WHICH SERVICE?</p><h2>{en ? "Send the goal, platform and deadline—I’ll suggest the right path" : "أرسل الهدف والمنصة والموعد وسأقترح المسار المناسب"}</h2><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Message me on WhatsApp" : "تواصل معي عبر واتساب"} <span>↗</span></a></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEOGRAPHER · VIDEO EDITOR · UAE</span></footer>
    </main>
  );
}
