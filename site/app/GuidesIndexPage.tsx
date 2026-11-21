import SiteHeader from "./SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { guideCatalog } from "./GuidePage";
export function getGuidesMetadata(en = false): Metadata {
  const path = en ? "/en/guides" : "/guides";
  return { title: en ? "Video Production Guides" : "دليل المونتاج وصناعة الفيديو", description: en ? "Practical UAE guides to planning a Reels shoot, comparing video costs, choosing an editor and producing AI, corporate, property and dental content." : "أدلة عملية لتجهيز تصوير الريلز ومقارنة تكلفة الفيديو واختيار مونتير، وإنتاج محتوى الذكاء الاصطناعي والشركات والعقارات والعيادات في الإمارات.", alternates: { canonical: path, languages: { ar: "/guides", en: "/en/guides", "x-default": "/guides" } } };
}

export default function GuidesIndexPage({ language = "ar" }: { language?: "ar" | "en" }) {
  const en = language === "en"; const prefix = en ? "/en" : "";
  return <main className={`site guide-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}><div className="noise" aria-hidden="true" />
    <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/guides`} />
    <section className="guides-index"><p className="eyebrow">VIDEO KNOWLEDGE</p><h1>{en ? "Practical guides for a better video project" : "دليل عملي لمشروع فيديو أفضل"}</h1><p>{en ? "Clear answers that help brands and creators plan, price and produce video content with fewer surprises." : "إجابات واضحة تساعد الشركات وصنّاع المحتوى على التخطيط والتسعير وصناعة الفيديو بقرارات أفضل."}</p><div className="guides-grid">{Object.values(guideCatalog).map((guide, index) => <article key={guide.slug}><span>{String(index + 1).padStart(2, "0")}</span><small>{en ? "5 MIN READ" : "قراءة 5 دقائق"}</small><h2>{en ? guide.titleEn : guide.titleAr}</h2><p>{en ? guide.descriptionEn : guide.descriptionAr}</p><Link prefetch={false} href={`${prefix}/guides/${guide.slug}`}>{en ? "Read the guide" : "اقرأ الدليل"} <b>↗</b></Link></article>)}</div></section>
    <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix}/industries`}>{en ? "Industries" : "القطاعات"}</Link><Link prefetch={false} href={`${prefix}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
  </main>;
}
