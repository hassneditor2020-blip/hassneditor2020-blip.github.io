"use client";
import { useState } from "react";
import SiteHeader from "./SiteHeader";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { trackEvent as track } from "./analyticsEvents";

export default function PackagesPage({ language = "ar" }: { language?: "ar" | "en" }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const [openPackage, setOpenPackage] = useState(0);
  const pricingMessage = en
    ? "Hello Hassn, I would like a custom quote for my video project based on the editing style and project requirements."
    : "مرحبًا حسن، أرغب في الحصول على عرض سعر مخصص لمشروع الفيديو حسب نوع المونتاج ومتطلبات المشروع.";
  const pricingWhatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(pricingMessage)}`;
  return <main id="main-content" data-contact-page="packages" className={`site packages-page ${en ? "en" : "ar"}`} dir={en ? "ltr" : "rtl"} lang={language}>
    <a className="skip-link" href="#pricing">{en ? "Skip to packages" : "انتقل إلى الباقات"}</a>
    <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/packages`} />
      <section className="pricing-section" id="pricing">
        <div className="pricing-heading">
          <div><p className="eyebrow">CONTENT PACKAGES</p><h1>{en ? "Flexible packages for individuals and brands" : "باقات مرنة للأفراد والعلامات التجارية"}</h1></div>
          <div className="pricing-start" aria-label={en ? "A custom quote is prepared after reviewing the editing style and project requirements" : "يتم إعداد عرض سعر مخصص بعد مراجعة نوع المونتاج ومتطلبات المشروع"}>
            <small>{en ? "PRICING BASED ON PROJECT DETAILS" : "التسعير حسب تفاصيل المشروع"}</small>
            <strong><span>{en ? "CUSTOM QUOTE" : "عرض سعر مخصص"}</span></strong>
            <p>{en ? "Each project is reviewed individually because the editing style, footage, graphics and delivery requirements all affect the final cost." : "تتم مراجعة كل مشروع بشكل مستقل لأن نوع المونتاج والمواد والرسومات ومتطلبات التسليم تؤثر جميعها في التكلفة النهائية."}</p>
          </div>
        </div>
        <div className="pricing-grid">
          <article className={`pricing-card featured ${openPackage === 0 ? "is-open" : ""}`}>
            <button className="pricing-card-toggle" type="button" aria-expanded={openPackage === 0} onClick={() => setOpenPackage(openPackage === 0 ? -1 : 0)}>
              <span>01</span><span><small>{en ? "CREATORS" : "لصنّاع المحتوى"}</small><strong>{en ? "Flexible content package" : "باقة المحتوى المرنة"}</strong></span><i aria-hidden="true">+</i>
            </button>
            <div className="pricing-card-body">
              <p>{en ? "For recurring short-form content using your available footage and a clearly agreed visual direction." : "للمحتوى القصير المتكرر باستخدام المواد المتوفرة لديك وضمن اتجاه بصري واضح ومتفق عليه."}</p>
              <ul><li>{en ? "Editing for social platforms" : "مونتاج مناسب لمنصات التواصل"}</li><li>{en ? "Basic titles, sound and color" : "عناوين ومعالجة أساسية للصوت واللون"}</li><li>{en ? "Package quantity agreed in advance" : "تحديد عدد الفيديوهات قبل البدء"}</li></ul>
            </div>
          </article>
          <article className={`pricing-card ${openPackage === 1 ? "is-open" : ""}`}>
            <button className="pricing-card-toggle" type="button" aria-expanded={openPackage === 1} onClick={() => setOpenPackage(openPackage === 1 ? -1 : 1)}>
              <span>02</span><span><small>{en ? "BUSINESSES" : "للشركات والعيادات"}</small><strong>{en ? "Brand content package" : "باقة محتوى العلامة"}</strong></span><i aria-hidden="true">+</i>
            </button>
            <div className="pricing-card-body">
              <p>{en ? "For brands that need consistent promotional or educational content with a unified visual identity." : "للجهات التي تحتاج محتوى دعائيًا أو تعليميًا متناسقًا ويحافظ على هوية بصرية موحدة."}</p>
              <ul><li>{en ? "Consistent brand treatment" : "معالجة متناسقة مع الهوية"}</li><li>{en ? "Advanced titles and graphics" : "عناوين ورسومات أكثر تقدمًا"}</li><li>{en ? "Formats prepared for each platform" : "مقاسات جاهزة لكل منصة"}</li></ul>
            </div>
          </article>
          <article className={`pricing-card ${openPackage === 2 ? "is-open" : ""}`}>
            <button className="pricing-card-toggle" type="button" aria-expanded={openPackage === 2} onClick={() => setOpenPackage(openPackage === 2 ? -1 : 2)}>
              <span>03</span><span><small>{en ? "CUSTOM" : "حسب الطلب"}</small><strong>{en ? "Advanced production package" : "باقة الإنتاج المتقدم"}</strong></span><i aria-hidden="true">+</i>
            </button>
            <div className="pricing-card-body">
              <p>{en ? "For projects that may combine filming, motion graphics, AI scenes or multiple delivery formats." : "للمشاريع التي قد تجمع بين التصوير والموشن جرافيك ومشاهد الذكاء الاصطناعي أو مقاسات تسليم متعددة."}</p>
              <ul><li>{en ? "Scope tailored to the project" : "نطاق مخصص بحسب المشروع"}</li><li>{en ? "Production and post-production" : "إنتاج وما بعد الإنتاج"}</li><li>{en ? "Clear quote before work begins" : "عرض سعر واضح قبل التنفيذ"}</li></ul>
            </div>
          </article>
        </div>
        <div className="pricing-note">
          <p>{en ? "The final cost depends on the editing style, number and duration of videos, supplied materials, production complexity, revisions and delivery schedule." : "تتحدد التكلفة النهائية حسب نوع المونتاج وعدد الفيديوهات ومدتها والمواد المتوفرة وتعقيد التنفيذ والتعديلات وموعد التسليم."}</p>
          <a href={pricingWhatsappUrl} target="_blank" rel="noreferrer" onClick={() => track("pricing_package_request")}>{en ? "Request a custom quote" : "اطلب عرض سعر مخصص"} <span>↗</span></a>
        </div>
      </section>

    <footer><span>© 2026 HASSN EDITOR</span><a href={`${prefix}/contact`}>{en ? "Contact" : "تواصل"}</a><a href={`${prefix}/guides/video-editing-cost-factors`}>{en ? "How pricing works" : "كيف تتحدد التكلفة؟"}</a><a href={`${prefix}/privacy`}>{en ? "Privacy policy" : "سياسة الخصوصية"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
  </main>;
}
