import type { Metadata } from "next";
import SiteHeader from "./SiteHeader";
import ServiceArea from "./ServiceArea";
import ProjectBrief from "./ProjectBrief";
import PrivacySettingsButton from "./PrivacySettingsButton";

export function getContactMetadata(language: "ar" | "en"): Metadata {
  const en = language === "en";
  const path = `${en ? "/en" : ""}/contact`;
  const title = en ? "Contact Hassn | Editing, Motion & Filming" : "تواصل مع حسن | مونتاج وموشن وتصوير فيديو";
  const description = en ? "Discuss your project with Hassn Editor. Filming in Ajman, Sharjah and Dubai by appointment; remote editing and motion graphics. Price after consultation." : "ناقش مشروعك مع حسن حسن. تصوير فيديو في عجمان والشارقة ودبي بموعد مسبق، ومونتاج وموشن غرافيك عن بُعد. السعر بعد التواصل.";
  return { title, description, alternates: { canonical: path, languages: { ar: "/contact", en: "/en/contact", "x-default": "/contact" } }, openGraph: { title, description, url: `https://hassneditor.com${path}`, locale: en ? "en_AE" : "ar_AE" }, twitter: { title, description } };
}

export default function ContactPage({ language = "ar" }: { language?: "ar" | "en" }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const url = `https://hassneditor.com${prefix}/contact`;
  const message = en ? `Hello Hassn, I would like to discuss a video project.\nWebsite page: ${url}` : `مرحبًا حسن، أرغب في مناقشة مشروع فيديو.\nصفحة الموقع: ${url}`;
  const links = [
    { label: "WhatsApp", value: en ? "Discuss your project" : "ناقش مشروعك", href: `https://wa.me/971505918238?text=${encodeURIComponent(message)}`, method: "whatsapp" },
    { label: en ? "Phone" : "الهاتف", value: "+971 50 591 8238", href: "tel:+971505918238", method: "phone" },
    { label: en ? "Email" : "البريد الإلكتروني", value: "hassneditor2020@gmail.com", href: "mailto:hassneditor2020@gmail.com", method: "email" },
  ];
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "ContactPage", "@id": `${url}#page`, url, name: en ? "Contact Hassn Editor" : "تواصل مع حسن إيديتور", inLanguage: language, isPartOf: { "@id": "https://hassneditor.com/#website" }, about: { "@id": "https://hassneditor.com/#hassn-editor" }, mainEntity: { "@id": "https://hassneditor.com/#business" } },
    { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` }, { "@type": "ListItem", position: 2, name: en ? "Contact" : "تواصل", item: url } ] },
  ] };
  return <main id="main-content" data-contact-page="contact" className={`site contact-page ${en ? "en" : "ar"}`} lang={language} dir={en ? "ltr" : "rtl"}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <a className="skip-link" href="#contact-content">{en ? "Skip to contact" : "انتقل إلى التواصل"}</a>
    <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/contact`} />
    <section id="contact-content" className="contact-page-intro">
      <p className="eyebrow">HASSN EDITOR / CONTACT</p>
      <h1>{en ? "Let’s make your next video" : "لنصنع فيديوك القادم"}</h1>
      <p>{en ? "Send the goal, publishing platform and preferred delivery date. I’ll review the scope with you and prepare a custom quote before we start." : "أرسل هدف الفيديو ومنصة النشر وموعد التسليم المطلوب. نراجع نطاق العمل معًا، ونحدد عرض السعر قبل البدء."}</p>
      <div className="contact-page-links">{links.map((link) => <a key={link.method} href={link.href} data-contact-placement={`contact_${link.method}`} target={link.method === "whatsapp" ? "_blank" : undefined} rel={link.method === "whatsapp" ? "noopener noreferrer" : undefined}><small>{link.label}</small><strong dir={link.method === "whatsapp" ? undefined : "ltr"}>{link.value}</strong></a>)}</div>
      <ServiceArea language={language} />
      <p className="contact-arrangement">{en ? "Location filming by prior appointment. I work as a freelancer and do not provide an indoor recording studio. Editing and motion graphics can be arranged remotely." : "التصوير في موقعك بموعد مسبق. أعمل بشكل مستقل ولا يتوفر استديو داخلي للتسجيل. يمكن تنفيذ المونتاج والموشن غرافيك عن بُعد."}</p>
    </section>
    <ProjectBrief language={language} pageType="contact" />
    <footer><span>© 2026 HASSN EDITOR</span><a href={`${prefix}/works`}>{en ? "Work" : "أعمالي"}</a><a href={`${prefix}/packages`}>{en ? "Packages" : "الباقات"}</a><a href={`${prefix}/privacy`}>{en ? "Privacy policy" : "سياسة الخصوصية"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
  </main>;
}
