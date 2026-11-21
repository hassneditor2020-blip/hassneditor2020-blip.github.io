import type { Metadata } from "next";
import SiteHeader from "./SiteHeader";
import PrivacySettingsButton from "./PrivacySettingsButton";

export function getPrivacyMetadata(language: "ar" | "en"): Metadata {
  const en = language === "en";
  const title = en ? "Privacy Policy" : "سياسة الخصوصية";
  const description = en ? "How Hassn Editor handles project requests, analytics choices and external services." : "كيفية التعامل مع طلبات المشاريع واختيارات التحليلات والخدمات الخارجية في موقع حسن إيديتور.";
  return { title, description, alternates: { canonical: `${en ? "/en" : ""}/privacy`, languages: { ar: "/privacy", en: "/en/privacy", "x-default": "/privacy" } }, openGraph: { title, description, url: `https://hassneditor.com${en ? "/en" : ""}/privacy`, locale: en ? "en_AE" : "ar_AE" }, twitter: { title, description } };
}

export default function PrivacyPage({ language = "ar" }: { language?: "ar" | "en" }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const sections = en ? [
    ["Project requests", "This website does not require an account and does not store project-brief form entries on its server. The form opens a prepared WhatsApp message on your device. Review the message and choose whether to send it; opening the draft does not send it."],
    ["Analytics and your choices", "Essential local storage remembers your privacy choice. Google Analytics loads only after you agree to analytics. You can refuse analytics and continue using the website, or change your choice with the Privacy settings button. When enabled, analytics records page visits, video interactions and contact-button clicks. Project-brief text and WhatsApp message contents are not included in these events."],
    ["Video and external platforms", "Video covers may load from YouTube. On the homepage and portfolio listing, embedded players load when you choose to play. Dedicated project pages may load a YouTube player when the page opens. Those requests are handled by YouTube under its own privacy policy. Links to WhatsApp, Google and social platforms also lead to external services with their own policies."],
    ["Website assistant", "If you send a message through the website assistant, the message is sent to the chat service to process your request. Avoid sharing sensitive personal information in chat. WhatsApp is also available for discussing your project directly."],
  ] : [
    ["طلبات المشاريع", "لا يطلب الموقع إنشاء حساب، ولا يخزن تفاصيل نموذج طلب المشروع على خادم الموقع. يفتح النموذج رسالة واتساب جاهزة على جهازك؛ راجعها واختر إرسالها. فتح الرسالة لا يرسلها تلقائيًا."],
    ["التحليلات واختياراتك", "يحفظ التخزين المحلي الضروري اختيارك بشأن الخصوصية. لا يتم تحميل Google Analytics إلا بعد موافقتك على التحليلات. يمكنك الرفض والاستمرار في استخدام الموقع، أو تغيير اختيارك من زر إعدادات الخصوصية. عند الموافقة، تُقاس زيارات الصفحات والتفاعل مع الفيديو وضغطات التواصل، ولا يتضمن هذا القياس نص تفاصيل المشروع أو محتوى رسالة واتساب."],
    ["الفيديو والمنصات الخارجية", "قد تُحمّل أغلفة الفيديو من YouTube. في الرئيسية وقائمة الأعمال يُحمّل المشغل عند اختيار التشغيل، بينما قد يُحمّل في صفحات المشاريع التفصيلية عند فتح الصفحة. يعالج YouTube هذه الطلبات وفق سياسته الخاصة. كما تقود روابط واتساب وGoogle والمنصات الاجتماعية إلى خدمات خارجية لها سياسات مستقلة."],
    ["مساعد الموقع", "عند إرسال رسالة عبر مساعد الموقع، تُرسل الرسالة إلى خدمة المحادثة لمعالجة طلبك. تجنب مشاركة المعلومات الشخصية الحساسة داخل المحادثة. ويمكن التواصل عبر واتساب لمناقشة المشروع مباشرة."],
  ];
  return <main id="main-content" className={`site legal-page ${en ? "en" : "ar"}`} lang={language} dir={en ? "ltr" : "rtl"}>
    <a className="skip-link" href="#privacy-content">{en ? "Skip to privacy policy" : "انتقل إلى سياسة الخصوصية"}</a>
    <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/privacy`} />
    <article id="privacy-content" className="legal-content"><p className="eyebrow">PRIVACY / 2026</p><h1>{en ? "Privacy policy" : "سياسة الخصوصية"}</h1><p className="legal-intro">{en ? "How the website handles your requests, choices and external services." : "كيف يتعامل الموقع مع طلباتك واختياراتك والخدمات الخارجية."}</p>
      {sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
      <section><h2>{en ? "Contact" : "التواصل"}</h2><p>{en ? "For questions about privacy, email " : "للاستفسار عن الخصوصية، راسلني على "}<a dir="ltr" href="mailto:hassneditor2020@gmail.com">hassneditor2020@gmail.com</a>.</p></section>
      <p className="legal-updated">{en ? "Updated: 6 October 2026" : "آخر تحديث: 6 أكتوبر 2026"}</p>
    </article>
    <footer><span>© 2026 HASSN EDITOR</span><a href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</a><a href={`${prefix}/contact`}>{en ? "Contact" : "تواصل"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
  </main>;
}
