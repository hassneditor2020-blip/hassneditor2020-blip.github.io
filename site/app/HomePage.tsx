"use client";

import Link from "next/link";
import { ArrowIcon, FullscreenIcon, PlayIcon, SocialProfileIcon } from "./PortfolioIcons";
import SiteHeader from "./SiteHeader";
import FeaturedReels from "./FeaturedReels";
import KokabFodoolFeature from "./KokabFodoolFeature";
import DigitalProjects from "./DigitalProjects";
import { googleReviewUrl } from "./ServiceArea";
import ProjectBrief from "./ProjectBrief";
import { useVideoViewer } from "./VideoViewer";

import { useRef, useState } from "react";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { trackEvent } from "./analyticsEvents";

const professionalProfiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassn-editor" },
  { label: "YouTube", href: "https://youtube.com/@hassn-editor" },
  { label: "Behance", href: "https://www.behance.net/hassneditor" },
  { label: "Instagram", href: "https://www.instagram.com/hassn.editor" },
  { label: "Facebook", href: "https://www.facebook.com/p/Hassn-Hassn-61587617576359/" },
];

function track(event: string, details: Record<string, string> = {}) {
  trackEvent(event, details);
}

function ContactIcon({ name }: { name: string }) {
  if (name === "phone") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" /></svg>;
  if (name === "whatsapp") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.95c0 2.1.55 4.15 1.6 5.95L.04 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.66 23.83 24 18.47 24 11.88c0-3.17-1.24-6.15-3.48-8.4zm-8.44 18.34h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.71.98.99-3.62-.23-.37a9.9 9.9 0 1 1 8.35 4.6zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="m3 7 9 6 9-6" /></svg>;
}

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    SHOOT: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/><circle cx="9.5" cy="12" r="2.5"/><path d="M6 6l1.5-2h4L13 6"/></>,
    PRODUCTION: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/><path d="m13 13 4 2-4 2z"/></>,
    MOTION: <><circle cx="7" cy="12" r="3"/><circle cx="17" cy="7" r="2"/><circle cx="17" cy="17" r="2"/><path d="M10 11l5-3M10 13l5 3"/></>,
    AI: <><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><path d="m10 14 2-5 2 5m-3.3-1h2.6"/></>,
    WEB: <><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M8 19v2m8-2v2M7 22h10"/><circle cx="6" cy="6" r=".7"/><circle cx="9" cy="6" r=".7"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

export function HomePage({ initialLanguage = "ar" }: { initialLanguage?: "ar" | "en" }) {
  const { openVideo } = useVideoViewer();
  const [lang] = useState<"ar" | "en">(initialLanguage);
  const [heroVideoStarted, setHeroVideoStarted] = useState(false);
  const [serviceLinksOpen, setServiceLinksOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const en = lang === "en";

  const whatsappMessage = en
    ? "Hello Hassn, I visited your website and would like to discuss a video project."
    : "مرحبًا حسن، شاهدت أعمالك على الموقع وأرغب في مناقشة مشروع فيديو.";
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappMessage)}`;
  const reviewRequestMessage = en
    ? "Hello Hassn, I would like to share my feedback about working with you.%0A%0AName:%0ACompany / role:%0ARating out of 5:%0AFeedback:%0AMay this review be published on your website? Yes / No"
    : "مرحبًا حسن، أرغب في إرسال تقييمي لتجربة العمل معك.%0A%0Aالاسم:%0Aالجهة / الصفة:%0Aالتقييم من 5:%0Aنص التقييم:%0Aهل أوافق على نشر التقييم في الموقع؟ نعم / لا";
  const reviewRequestUrl = `https://wa.me/971505918238?text=${reviewRequestMessage}`;

  const openVideoFullscreen = () => {
    track("showreel_play");
    openVideo({ source: "/hassn-editor-showreel.mp4", poster: "/hassn-editor-showreel-cover.webp", title: en ? "HASSN EDITOR Introduction Showreel" : "الفيديو التعريفي لحسن إيديتور", language: initialLanguage, format: "landscape", projectHref: en ? "/en/showreel" : "/showreel" });
  };

  const links = [
    { label: en ? "Call me" : "اتصال مباشر", value: "+971 50 591 8238", href: "tel:+971505918238", icon: "phone" },
    { label: "WhatsApp", value: en ? "Contact me on WhatsApp" : "تواصل معي عبر واتساب", href: whatsappUrl, icon: "whatsapp" },
    { label: en ? "Email" : "البريد الإلكتروني", value: "hassneditor2020@gmail.com", href: "mailto:hassneditor2020@gmail.com", icon: "mail" },
  ];

  const solutions = en
    ? [
        { code: "SHOOT", slug: "videography", number: "01", title: "Professional videography", text: "Planned filming for events, products and businesses in Ajman, Sharjah and Dubai by appointment.", tags: ["Shot plan", "Filming", "Lighting", "UAE"] },
        { code: "PRODUCTION", slug: "content-production", number: "02", title: "Full content production", text: "A complete path from concept and script to filming, editing, platform formats and publishing.", tags: ["Concept", "Script", "Production", "Delivery"] },
        { code: "MOTION", slug: "video-editing", number: "03", title: "Editing & motion graphics", text: "Strong pacing, visual storytelling, animated graphics, color and sound finishing for a polished result.", tags: ["Editing", "Motion", "Color", "Sound"] },
        { code: "AI", slug: "ai-video", number: "04", title: "AI videos & character stories", text: "Distinctive AI scenes, consistent cartoon characters and visual stories designed for education, brands and social platforms.", tags: ["AI Scenes", "Characters", "Stories", "Social"] },
      ]
    : [
        { code: "SHOOT", slug: "videography", number: "01", title: "التصوير الاحترافي", text: "تصوير مدروس للفعاليات والمنتجات والشركات في عجمان والشارقة ودبي بموعد مسبق.", tags: ["خطة لقطات", "تصوير", "إضاءة", "الإمارات"] },
        { code: "PRODUCTION", slug: "content-production", number: "02", title: "إنتاج المحتوى المتكامل", text: "مسار كامل يبدأ من الفكرة وكتابة السكريبت، ثم التصوير والمونتاج وتجهيز المقاسات وصولًا إلى النشر.", tags: ["فكرة", "سكريبت", "إنتاج", "تسليم"] },
        { code: "MOTION", slug: "video-editing", number: "03", title: "المونتاج والموشن جرافيك", text: "سرد بصري وإيقاع احترافي، مع تحريك العناصر ومعالجة الألوان والصوت لإنتاج فيديو متكامل.", tags: ["مونتاج", "موشن", "ألوان", "صوت"] },
        { code: "AI", slug: "ai-video", number: "04", title: "فيديوهات وشخصيات الذكاء الاصطناعي", text: "مشاهد مبتكرة وشخصيات كرتونية متناسقة وقصص بصرية مصممة للتعليم والعلامات التجارية ومنصات التواصل.", tags: ["مشاهد AI", "شخصيات", "قصص", "سوشيال"] },
      ];

  const process = en
    ? [["01", "Brief & direction", "We agree on the goal, visual approach and schedule."], ["02", "Create the video", "Filming or scene creation, editing, motion, color and sound."], ["03", "Review & delivery", "Your feedback, final refinements and platform-ready files."]]
    : [["01", "الطلب والاتجاه", "نتفق على الهدف والأسلوب البصري والموعد."], ["02", "صناعة الفيديو", "تصوير أو صناعة مشاهد، ثم مونتاج وموشن وألوان وصوت."], ["03", "المراجعة والتسليم", "ملاحظاتك، اللمسات الأخيرة ونسخ جاهزة للنشر."]];

  const faqs = en
    ? [
        ["How long does a video project take?", "Timing depends on the video length, complexity, available footage and required formats. I confirm a clear schedule after reviewing your brief."],
        ["Do I need to have footage ready?", "No. I can edit your existing footage, arrange professional filming in Ajman, Sharjah or Dubai by appointment, or create suitable AI scenes depending on the project."],
        ["Which video formats do you deliver?", "I prepare vertical 9:16, horizontal 16:9, square 1:1 and other platform-specific formats as required."],
        ["How are revisions handled?", "The review process and required revisions are agreed clearly before production so feedback and delivery remain organized."],
        ["Can we work together outside the UAE?", "Yes. Filming is available in Ajman, Sharjah and Dubai by appointment. Editing and motion graphics are available remotely in the UAE and worldwide."],
        ["How is the project cost calculated?", "Cost depends on the editing style, scope, duration, supplied materials, motion graphics, AI scenes, revisions and delivery timing. Send the project brief for an accurate custom quote."],
      ]
    : [
        ["كم تستغرق مدة تنفيذ الفيديو؟", "تعتمد المدة على طول الفيديو وتعقيد التنفيذ والمواد المتوفرة والمقاسات المطلوبة. أحدد لك جدولًا واضحًا بعد مراجعة طلب المشروع."],
        ["هل يجب أن تكون لدي فيديوهات جاهزة؟", "لا. يمكنني مونتاج موادك الحالية، أو ترتيب التصوير في عجمان أو الشارقة أو دبي بموعد مسبق، أو صناعة مشاهد مناسبة بالذكاء الاصطناعي حسب المشروع."],
        ["ما مقاسات الفيديو التي يمكن تسليمها؟", "أجهز الفيديو بالمقاس الطولي 9:16، والعرضي 16:9، والمربع 1:1، وأي مقاسات أخرى تتطلبها المنصة."],
        ["كيف تتم التعديلات والمراجعة؟", "يتم الاتفاق على آلية المراجعة والتعديلات المطلوبة قبل التنفيذ، لتبقى الملاحظات والتسليم منظمين وواضحين."],
        ["هل يمكن تنفيذ مشاريع خارج الإمارات؟", "نعم. التصوير متاح في عجمان والشارقة ودبي بموعد مسبق، والمونتاج والموشن جرافيك متاحان عن بُعد داخل الإمارات وخارجها."],
        ["كيف يتم تحديد تكلفة المشروع؟", "تتحدد التكلفة حسب نوع المونتاج ونطاق العمل ومدة الفيديو والمواد المتوفرة والموشن ومشاهد الذكاء الاصطناعي والتعديلات وموعد التسليم. أرسل تفاصيل الطلب لتحصل على عرض سعر مخصص ودقيق."],
      ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const heroVideoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: en ? "HASSN EDITOR introduction showreel" : "الفيديو التعريفي لحسن إيديتور",
    description: en
      ? "A 20-second introduction to HASSN EDITOR video editing, content production, motion graphics and AI video services in the UAE."
      : "فيديو تعريفي مدته 20 ثانية يعرض خدمات حسن إيديتور في المونتاج وإنتاج المحتوى والموشن جرافيك وفيديوهات الذكاء الاصطناعي في الإمارات.",
    thumbnailUrl: ["https://hassneditor.com/hassn-editor-showreel-cover.jpg"],
    uploadDate: "2026-08-03",
    duration: "PT20S",
    contentUrl: "https://hassneditor.com/hassn-editor-showreel.mp4",
    url: en ? "https://hassneditor.com/en/showreel" : "https://hassneditor.com/showreel",
    inLanguage: en ? "en-AE" : "ar-AE",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "HASSN EDITOR",
      logo: { "@type": "ImageObject", url: "https://hassneditor.com/hassn-logo.png" },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: en ? "https://hassneditor.com/en/showreel" : "https://hassneditor.com/showreel",
    },
  };

  return (
    <main id="main-content" data-contact-page="home" className={`site home-page ${en ? "en" : "ar"}`} dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"}>
      <link rel="preload" as="image" type="image/avif" href="/hassn-editor-showreel-cover-768.avif" imageSrcSet="/hassn-editor-showreel-cover-480.avif 480w, /hassn-editor-showreel-cover-768.avif 768w, /hassn-editor-showreel-cover-1280.avif 1280w" imageSizes="(max-width: 700px) calc(100vw - 52px), (max-width: 1100px) 46vw, 560px" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(heroVideoStructuredData) }} />
      <a className="skip-link" href="#top">{en ? "Skip to content" : "انتقل إلى المحتوى"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={initialLanguage} alternatePath={en ? "/" : "/en"} />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">HASSN EDITOR · SINCE 2020</p>
          <h1>{en ? <>Videography &amp; Reels<br /><em>Professional video editing</em></> : <>تصوير فيديو وريلز<br /><em>ومونتاج احترافي</em></>}</h1>
          <p className="intro" id="about">
            {en
              ? <>I’m <Link prefetch={false} href="/en/about-hassn-editor" aria-label="View Hassn Hassn’s CV">Hassn Hassn</Link>. I create brand videos and Reels through filming, editing, motion graphics and AI production.</>
              : <>أنا <Link prefetch={false} href="/about-hassn-editor" aria-label="السيرة الذاتية لحسن حسن">حسن حسن</Link>، أصنع للعلامات التجارية فيديوهات وريلز تجمع التصوير والمونتاج والموشن غرافيك والذكاء الاصطناعي.</>}
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#selected-work" onClick={() => track("hero_view_work")}>{en ? "View my work" : "شاهد أعمالي"}<ArrowIcon down /></a>
            <a className="secondary-button" href="#project-brief" onClick={() => track("hero_start_project")}>{en ? "Start a project" : "ابدأ مشروعك"}<ArrowIcon /></a>
          </div>
          <a className="hero-quote-link" data-contact-placement="hero_quote" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("hero_whatsapp_open")}>{en ? "Get a custom quote on WhatsApp" : "اطلب عرض سعر عبر واتساب"} <ArrowIcon /></a>
          <p className="hero-service-note">
            <span>{en ? "Filming: Ajman · Sharjah · Dubai, by appointment." : "تصوير: عجمان · الشارقة · دبي بموعد مسبق."}</span>
            <span>{en ? "Editing, motion graphics & AI video: available remotely." : "مونتاج وموشن وفيديو بالذكاء الاصطناعي عن بُعد."}</span>
          </p>
        </div>

        <div className="reel" aria-label={en ? "Hassn Editor showreel" : "الفيديو التعريفي لحسن إيديتور"}>
          <div className="reel-top"><span>REC</span><span>SHOWREEL / 2026</span></div>
          <div className={`logo-frame hero-video-frame ${heroVideoStarted ? "is-playing" : ""}`}>
            {!heroVideoStarted && <picture><source type="image/avif" srcSet="/hassn-editor-showreel-cover-480.avif 480w, /hassn-editor-showreel-cover-768.avif 768w, /hassn-editor-showreel-cover-1280.avif 1280w" sizes="(max-width: 700px) calc(100vw - 52px), (max-width: 1100px) 46vw, 560px" /><img className="hero-video-preview" src="/hassn-editor-showreel-cover-768.webp" srcSet="/hassn-editor-showreel-cover-480.webp 480w, /hassn-editor-showreel-cover-768.webp 768w, /hassn-editor-showreel-cover.webp 1280w" sizes="(max-width: 700px) calc(100vw - 52px), (max-width: 1100px) 46vw, 560px" width="1280" height="720" alt="" fetchPriority="high" decoding="async" /></picture>}
            <video ref={heroVideoRef} controls={heroVideoStarted} playsInline preload="none" aria-label={en ? "Hassn Editor portfolio video" : "الفيديو التعريفي لحسن إيديتور"} onPlay={() => { setHeroVideoStarted(true); track("showreel_play"); }}>
              <source src="/hassn-editor-showreel.mp4" type="video/mp4" />
            </video>
            {!heroVideoStarted && <button className="hero-video-play" type="button" onClick={openVideoFullscreen} aria-label={en ? "Play portfolio video" : "تشغيل الفيديو التعريفي"}>
              <span className="hero-video-brand" aria-hidden="true"><img src="/hassn-logo-medium.webp" alt="" width="240" height="144" /></span>
              <span className="play-symbol" aria-hidden="true"><PlayIcon /></span>
              <strong>{en ? "Watch the introduction video" : "شاهد الفيديو التعريفي"}</strong>
              <small className="hero-video-duration">SHOWREEL · 00:20</small>
            </button>}
          </div>
          <div className="hero-video-links">
            <button className="video-fullscreen-button" type="button" onClick={openVideoFullscreen} aria-label={en ? "Open video viewer" : "افتح عارض الفيديو"}>
              <span aria-hidden="true"><FullscreenIcon /></span>{en ? "Video viewer" : "عارض الفيديو"}
            </button>
            <Link prefetch={false} className="showreel-detail-link" href={en ? "/en/showreel" : "/showreel"} aria-label={en ? "Open the introduction video page" : "فتح صفحة الفيديو التعريفي"} onClick={() => track("showreel_page_open")}>{en ? "Video details" : "تفاصيل الفيديو"}<ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <nav className="home-work-shortcuts" aria-label={en ? "Browse projects by specialty" : "تصفح الأعمال حسب التخصص"}>
        <h2>{en ? "Find work relevant to your business" : "شاهد أعمالًا تناسب نشاطك"}</h2>
        <div>{[["restaurant-events", "مطاعم وفعاليات", "Restaurants & events"], ["ads", "إعلانات المنتجات", "Product ads"], ["medical", "عيادات ومراكز طبية", "Dental & medical"], ["realestate", "عقارات", "Real estate"], ["industry", "شركات وصناعة", "Corporate & industrial"], ["ai", "ذكاء اصطناعي", "AI video"]].map(([id, ar, label]) => <Link key={id} prefetch={false} href={`${en ? "/en" : ""}/works#${id}`} onClick={() => track("home_portfolio_category", {category: id})}>{en ? label : ar}<ArrowIcon /></Link>)}</div>
      </nav>
      <FeaturedReels language={initialLanguage} />
      <KokabFodoolFeature language={initialLanguage} />

      <section className="trust-stats" aria-label={en ? "Work and client statistics" : "أرقام الأعمال وثقة العملاء"}>
        <div className="trust-stats-grid">
          <article className="trust-stat">
            <strong dir="ltr">500+</strong>
            <span>{en ? "Videos Completed" : "فيديو مكتمل"}</span>
          </article>
          <article className="trust-stat trust-stat-views">
            <strong dir="ltr">3M+</strong>
            <span>{en ? "Total Views" : "إجمالي المشاهدات"}</span>
            <small>{en ? "Across videos edited for clients and published projects" : "عبر الفيديوهات المنفذة للعملاء والمشاريع المنشورة"}</small>
          </article>
          <article className="trust-stat">
            <strong dir="ltr">4.8/5</strong>
            <span>{en ? "Client ratings published here" : "تقييمات العملاء المنشورة هنا"}</span>
          </article>
          <article className="trust-stat">
            <strong dir="ltr">{en ? "UAE-Based" : "UAE"}</strong>
            <span>{en ? "Videographer & Video Editor" : "مصور ومونتير فيديو في الإمارات"}</span>
          </article>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <div><p className="eyebrow">SERVICES</p><h2>{en ? "Complete services to build your content" : "خدمات متكاملة لصناعة محتواك"}</h2></div>
          <p className="section-intro">{en ? "Choose the service that fits your project, or combine them into one complete production." : "اختر الحل المناسب لمشروعك، أو اجمع بينها ضمن إنتاج متكامل من الفكرة حتى النشر."}</p>
        </div>
        <div className="solutions-grid">
          {solutions.map((solution) => (
            <article className="solution-card" key={solution.number}>
              <div className="service-top"><span className="service-icon"><ServiceIcon name={solution.code} /></span><b>{solution.number}</b></div>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
              <div className="service-tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link prefetch={false} href={`${en ? "/en" : ""}/services/${solution.slug}`} onClick={() => track("service_detail_open", { service: solution.slug })}>{en ? "Explore this service" : "استكشف تفاصيل الخدمة"}</Link>
            </article>
          ))}
        </div>
        <article className="digital-service-spotlight">
          <div className="digital-service-icon"><ServiceIcon name="WEB" /></div>
          <div className="digital-service-copy">
            <small>{en ? "NEW · COMPLEMENTARY DIGITAL SERVICE" : "جديد · خدمة رقمية مكملة"}</small>
            <h3>{en ? "Website & App Design" : "تصميم المواقع والتطبيقات"}</h3>
            <p>{en ? "Modern business websites, web apps and mobile-first digital experiences—offered as a complementary service while video production remains my core specialty." : "مواقع أعمال حديثة وتطبيقات وتجارب رقمية مهيأة للجوال، كخدمة مكملة مع بقاء تصوير ومونتاج الفيديو تخصصي الأساسي."}</p>
            <div className="digital-service-actions"><Link prefetch={false} href={`${en ? "/en" : ""}/services/web-app-design`} onClick={() => track("service_detail_open", { service: "web-app-design" })}>{en ? "Explore web & app design" : "استكشف الخدمة"}<ArrowIcon /></Link><a href="#digital-projects">{en ? "See digital projects" : "شاهد المشاريع الرقمية"}<ArrowIcon down /></a></div>
          </div>
        </article>
        <p className="home-services-note" id="pricing">{en ? "Price after discussing your project." : "السعر بعد التواصل ومناقشة تفاصيل مشروعك."} <Link prefetch={false} href={en ? "/en/packages" : "/packages"}>{en ? "Explore packages" : "استعرض الباقات"}</Link></p>
        <button className="mobile-section-toggle service-links-toggle" type="button" aria-expanded={serviceLinksOpen} aria-controls="service-secondary-links" onClick={() => setServiceLinksOpen((open) => !open)}>
          <span>{en ? "View all detailed services" : "عرض جميع الخدمات التفصيلية"}</span><b aria-hidden="true">{serviceLinksOpen ? "−" : "+"}</b>
        </button>
        <div id="service-secondary-links" className={`service-secondary-links ${serviceLinksOpen ? "is-open" : ""}`}>
          <nav className="service-quick-links" aria-label={en ? "Detailed services" : "صفحات الخدمات التفصيلية"}>
            {[
              ["videography", en ? "Professional videography" : "التصوير الاحترافي"],
              ["video-editing", en ? "Video editing" : "مونتاج الفيديو"],
              ["motion-graphics", en ? "Motion graphics" : "الموشن جرافيك"],
              ["ai-video", en ? "AI video" : "فيديوهات الذكاء الاصطناعي"],
              ["ai-cartoon-characters", en ? "AI cartoon characters" : "الشخصيات الكرتونية بالذكاء الاصطناعي"],
              ["content-production", en ? "Full production" : "الإنتاج المتكامل"],
              ["web-app-design", en ? "Website & app design" : "تصميم المواقع والتطبيقات"],
            ].map(([slug, label]) => <Link prefetch={false} key={slug} href={`${en ? "/en" : ""}/services/${slug}`} onClick={() => track("service_detail_open", { service: slug })}><span>{label}</span><b>↗</b></Link>)}
          </nav>
          <div className="local-service-links">
            <p>{en ? "SPECIALIZED & LOCAL SERVICES" : "خدمات متخصصة ومحلية"}</p>
            <nav aria-label={en ? "Specialized and local video services" : "خدمات الفيديو المتخصصة والمحلية"}>
              <Link prefetch={false} href={en ? "/en/industries" : "/industries"} onClick={() => track("industries_open")}>{en ? "Browse all video industries" : "استعرض جميع قطاعات الفيديو"}</Link>
              {[
                ["restaurant-videography-uae", en ? "Restaurant & event videography" : "تصوير المطاعم والفعاليات"],
                ["videographer-ajman", en ? "Videographer in Ajman" : "مصور فيديو في عجمان"],
                ["videographer-sharjah", en ? "Videographer in Sharjah" : "مصور فيديو في الشارقة"],
                ["videographer-dubai", en ? "Videographer in Dubai" : "مصور فيديو في دبي"],
                ["video-editor-ajman", en ? "Video editor in Ajman" : "مونتير فيديو في عجمان"],
                ["video-editing-uae", en ? "Video editing in the UAE" : "مونتاج فيديو في الإمارات"],
                ["dental-motion-graphics", en ? "Dental motion graphics" : "موشن جرافيك لعيادات الأسنان"],
                ["product-video-ads", en ? "Product video ads" : "تصوير ومونتاج إعلانات المنتجات"],
                ["industrial-video-production-uae", en ? "Industrial video production" : "إنتاج فيديو صناعي"],
                ["real-estate-video-editing-uae", en ? "Real-estate video editing" : "مونتاج فيديو عقاري"],
              ].map(([slug, label]) => <Link prefetch={false} key={slug} href={`${en ? "/en" : ""}/${slug}`} onClick={() => track("local_service_open", { service: slug })}>{label}</Link>)}
            </nav>
          </div>
        </div>
      </section>

      <DigitalProjects language={initialLanguage} />

      <section className="process-section" id="process">
        <div className="section-heading">
          <div><p className="eyebrow">WORKFLOW</p><h2>{en ? "A clear path from idea to delivery" : "خطوات واضحة من الفكرة إلى التسليم"}</h2></div>
        </div>
        <div className="process-grid">
          {process.map((step) => <article className="process-card" key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div></article>)}
        </div>
      </section>

      <section className="testimonials-section" id="reviews">
        <div className="testimonials-heading">
          <div><p className="eyebrow">REVIEWS & PROJECT FEEDBACK</p><h2>{en ? "Feedback on the work" : "آراء وتجارب العمل"}</h2></div>
          <p>{en ? "Client feedback published with permission, alongside feedback on the Kokab Fodool project." : "آراء عملاء نُشرت بموافقتهم، إلى جانب تقييم مشروع «كوكب فضول»."}</p>
        </div>
        <p className="review-swipe-hint">{en ? "Swipe to read more feedback" : "اسحب لقراءة المزيد من التقييمات"} <span aria-hidden="true">↔</span></p>
        <div className="reviews-grid">
          <article className="client-review-card" data-review="01">
            <header>
              <span className="client-review-logo"><img src="/client-review-fahad.jpg" alt={en ? "Private client review mark — Engineer Fahad" : "شعار تقييم عميل خاص — المهندس فهد"} width="500" height="376" loading="lazy" decoding="async" /></span>
              <span className="client-review-rating" aria-label={en ? "5 out of 5 stars" : "5 نجوم من 5"}><b className="review-stars review-stars-50" aria-hidden="true">★★★★★</b><small>5.0 / 5</small></span>
            </header>
            <blockquote>
              <p>{en ? "A highly professional video at a very reasonable price, with great flexibility in revisions. Thank you for your refined cooperation and quick response." : "فيديو باحترافية عالية، وبسعر مقبول جدًا، ومرونة في التعديلات. شكرًا لتعاملك الراقي وسرعة استجابتك."}</p>
            </blockquote>
            <footer>
              <span><strong>{en ? "Private project — Eng. Fahad" : "عمل خاص — م. فهد"}</strong><small>{en ? "Engineer" : "مهندس"}</small></span>
              <em>{en ? "Published with permission" : "نُشر بموافقة العميل"}</em>
            </footer>
          </article>
          <article className="client-review-card" data-review="02">
            <header>
              <span className="client-review-logo initials" aria-hidden="true">{en ? "D. N" : "د. ن"}</span>
              <span className="client-review-rating" aria-label={en ? "4.5 out of 5 stars" : "4.5 نجوم من 5"}><b className="review-stars review-stars-45" aria-hidden="true">★★★★★</b><small>4.5 / 5</small></span>
            </header>
            <blockquote>
              <p>{en ? "Highly professional dental videos with excellent quality. We hope to continue working together, with a little need for faster delivery. Wishing you continued success — I loved your work, and appreciated your way of dealing even more." : "فيديوهات دينتال باحترافية عالية وبجودة ممتازة. نتمنى التعامل الدائم معًا، مع الحاجة قليلًا إلى الإسراع بالإنجاز. بالتوفيق الدائم، حبيت شغلك وحبيت تعاملك أكثر."}</p>
            </blockquote>
            <footer>
              <span><strong>{en ? "Dr. Noura" : "د. نورة"}</strong><small>{en ? "Dentist" : "دكتورة أسنان"}</small></span>
              <em>{en ? "Published with permission" : "نُشر بموافقة العميلة"}</em>
            </footer>
          </article>
          <article className="client-review-card english-review" data-review="03" dir="ltr">
            <header>
              <span className="client-review-logo artwork"><img src="/client-review-saleh.jpg" alt="Saleh Mohammed profile artwork" width="736" height="1308" loading="lazy" decoding="async" /></span>
              <span className="client-review-rating" aria-label="5 out of 5 stars"><b className="review-stars review-stars-50" aria-hidden="true">★★★★★</b><small>5.0 / 5</small></span>
            </header>
            <blockquote>
              <p>“I honestly loved your work. We’ll definitely stay in touch, and I look forward to continuing our work together.”</p>
            </blockquote>
            <footer>
              <span><strong>Saleh Mohammed</strong><small>Content Creator</small></span>
              <em>{en ? "Published with permission" : "نُشر بموافقة العميل"}</em>
            </footer>
          </article>
          <article className="client-review-card" data-review="04">
            <header>
              <span className="client-review-logo"><img src="/client-review-almuneer.jpg" alt={en ? "Al Muneer Car Rental logo" : "شعار المنير لتأجير السيارات"} width="500" height="500" loading="lazy" decoding="async" /></span>
              <span className="client-review-rating" aria-label={en ? "4.5 out of 5 stars" : "4.5 نجوم من 5"}><b className="review-stars review-stars-45" aria-hidden="true">★★★★★</b><small>4.5 / 5</small></span>
            </header>
            <blockquote>
              <p>{en ? "Credibility in communication and honoring agreements, with flexibility and responsiveness to revisions — that is what matters most to us. Excellent filming and highly professional execution of what we requested. Thank you." : "مصداقية في التعامل والاتفاق، ومرونة واستجابة للتعديلات؛ وهذا أهم شيء بالنسبة لنا. تصوير رائع وتنفيذ المطلوب بحرفية عالية. شكرًا لك."}</p>
            </blockquote>
            <footer>
              <span><strong>{en ? "Mahmoud" : "محمود"}</strong><small>{en ? "Al Muneer Car Rental" : "المنير لتأجير السيارات"}</small></span>
              <em>{en ? "Published with permission" : "نُشر بموافقة العميل"}</em>
            </footer>
          </article>
          <article className="client-review-card kokab-review-card" data-review="05">
            <header>
              <span className="client-review-logo kokab-review-logo"><img src="/kokab-fodool-review-logo.webp" alt={en ? "Kokab Fodool logo" : "شعار كوكب فضول"} width="192" height="192" loading="lazy" decoding="async" /></span>
              <span className="client-review-rating" aria-label={en ? "5 out of 5 stars" : "5 نجوم من 5"}><b className="review-stars review-stars-50" aria-hidden="true">★★★★★</b><small>5.0 / 5</small></span>
            </header>
            <blockquote>
              <p>{en ? "AI videos produced with exceptional professionalism and fast delivery." : "فيديوهات بالذكاء الاصطناعي بحرفية عالية جدا وسرعة بالانجاز"}</p>
            </blockquote>
            <footer>
              <span><strong>{en ? "Kokab Fodool" : "كوكب فضول"}</strong><small>{en ? "An independent educational project by Hassn" : "مشروع تعليمي مستقل من أعمالي"}</small></span>
              <em>{en ? "Project feedback" : "تقييم المشروع"}</em>
            </footer>
          </article>
          <div className="review-invitation">
            <span className="review-mark" aria-hidden="true">“</span>
            <div>
              <small>{en ? "SHARE YOUR EXPERIENCE" : "شارك تجربتك"}</small>
              <h3>{en ? "Have we worked together before?" : "هل عملنا معًا من قبل؟"}</h3>
              <p>{en ? "Leave an honest review of your experience on Google, or send private feedback with permission to publish it here." : "شارك تقييمك الصادق لتجربة العمل معي على Google، أو أرسل تقييمك وموافقتك على نشره هنا عبر رسالة خاصة."}</p>
            </div>
            <div className="review-invitation-actions"><a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("google_review_open", { language: initialLanguage, page_path: en ? "/en" : "/", placement: "review_invitation" })}>{en ? "Leave a Google review" : "قيّمني على Google"}</a><a href={reviewRequestUrl} target="_blank" rel="noreferrer" onClick={() => track("client_review_request")}>{en ? "Send a private review" : "أرسل تقييمًا خاصًا"}</a></div>
          </div>
        </div>
      </section>

      <ProjectBrief language={initialLanguage} />

      <section className="faq-section" id="faq">
        <div className="section-heading"><p className="eyebrow">FAQ</p><h2>{en ? "Before we start—quick answers" : "قبل أن نبدأ — إجابات سريعة"}</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} onToggle={(event) => { if (event.currentTarget.open) track("faq_open", { question_number: String(index + 1) }); }}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="connection-zone">
      <section className="contact-section" id="contact">
        <div className="section-heading"><p className="eyebrow">DIRECT CONTACT</p><h2>{en ? "Prefer direct contact?" : "تفضّل التواصل المباشر؟"}</h2></div>
        <div className="contact-grid">
          {links.map((link) => (
            <a className="contact-card" key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={() => track("contact_click", { method: link.label })}>
              <span className="card-icon"><ContactIcon name={link.icon} /></span>
              <span className="card-copy"><small>{link.label}</small><strong dir="ltr">{link.value}</strong></span>
              <span className="arrow"><ArrowIcon /></span>
            </a>
          ))}
        </div>
      </section>
      </div>

      <nav className="home-profile-links" aria-label={en ? "Professional profiles" : "حساباتي المهنية"}>
        {professionalProfiles.map((profile) => <a key={profile.label} href={profile.href} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", { platform: profile.label })}><SocialProfileIcon name={profile.label} /><span>{profile.label}</span></a>)}
      </nav>

      <footer className="home-footer">
        <div className="home-footer-heading">
          <span dir="ltr">© 2026 HASSN EDITOR</span>
          <span className="home-footer-note" dir="ltr">VIDEO EDITOR · UNITED ARAB EMIRATES</span>
        </div>
        <nav className="home-footer-navigation" aria-label={en ? "Footer navigation" : "روابط التذييل"}>
          <Link prefetch={false} href={en ? "/en/about-hassn-editor" : "/about-hassn-editor"}>{en ? "About" : "من أنا"}</Link>
          <Link prefetch={false} href={en ? "/en/industries" : "/industries"}>{en ? "Industries" : "القطاعات"}</Link>
          <Link prefetch={false} id="guides" href={en ? "/en/guides" : "/guides"}>{en ? "Guides" : "دليل الفيديو"}</Link>
          <Link prefetch={false} href={en ? "/en/packages" : "/packages"}>{en ? "Packages" : "الباقات"}</Link>
          <a href="#reviews">{en ? "Client reviews" : "آراء العملاء"}</a>
          <a href="#faq">{en ? "FAQ" : "الأسئلة الشائعة"}</a>
          <Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link>
          <PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} />
        </nav>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomePage />;
}
