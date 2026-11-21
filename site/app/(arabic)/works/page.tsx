"use client";
import SiteHeader from "../../SiteHeader";

import { trackEvent } from "../../analyticsEvents";
import { featuredReels } from "../../featuredReels";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrivacySettingsButton from "../../PrivacySettingsButton";
import { projectByVideoId, projectPath } from "../../projectData";
import { videoCoverSource, videoThumbnailSrcSet } from "../../videoThumbnails";
import { useVideoViewer } from "../../VideoViewer";
import { ArrowIcon, PlayIcon } from "../../PortfolioIcons";
import { kokabFodoolProjects } from "../../kokabFodoolData";
import KokabFodoolFeature from "../../KokabFodoolFeature";

type PortfolioVideo = {
  id: string;
  thumbnailUrl?: string;
  titleAr: string;
  titleEn: string;
  label: string;
  descAr: string;
  descEn: string;
};

const playlists = [
  {
    category: "education-ai", id: "",
    ar: "كوكب فضول — سلاسل تعليمية بالذكاء الاصطناعي", en: "Kokab Fodool — AI Educational Series",
    descAr: "أربع سلاسل تجمع إخراج مشاهد الذكاء الاصطناعي والشخصيات المتكررة والحوار العربي والمونتاج.",
    descEn: "Four series combining AI scene direction, recurring characters, Arabic dialogue and editing.",
    serviceSlug: "ai-cartoon-characters", serviceAr: "خدمة الشخصيات الكرتونية", serviceEn: "AI character production service",
    videos: kokabFodoolProjects.map(project => ({ id: project.videoId, thumbnailUrl: project.thumbnailUrl, titleAr: project.titleAr, titleEn: project.titleEn, label: "KOKAB FODOOL · AI EDUCATION", descAr: project.summaryAr, descEn: project.summaryEn })) satisfies PortfolioVideo[],
  },
  {
    category: "restaurant-events",
    id: "",
    ar: "فيديوهات المطاعم والفعاليات",
    en: "Restaurant & Event Videos",
    descAr: "تصوير ومونتاج المطاعم والكافيهات والأطباق والحفلات والموسيقى الحية ضمن فيديوهات ترويجية جاهزة للنشر.",
    descEn: "Restaurant, cafe, food and live-event videography shaped into polished promotional videos for digital publishing.",
    serviceSlug: "videography",
    serviceAr: "خدمة التصوير الاحترافي",
    serviceEn: "Professional videography service",
    videos: [
      {
        id: "FhfNrxrgLgE",
        thumbnailUrl: "https://i.ytimg.com/vi/FhfNrxrgLgE/maxresdefault.jpg",
        titleAr: "تصوير ومونتاج إعلان طعام سينمائي",
        titleEn: "Food Videography & Editing | Cinematic Restaurant Ad",
        label: "FOOD VIDEOGRAPHY",
        descAr: "تصوير طعام احترافي يبرز تفاصيل الأطباق والألوان والتقديم ضمن مونتاج سينمائي قصير مناسب للمطاعم ومنصات التواصل.",
        descEn: "Professional food videography highlighting dish detail, color and presentation through a concise cinematic edit for restaurants and social media.",
      },
      {
        id: "F8gd5sZm4B8",
        thumbnailUrl: "https://i.ytimg.com/vi/F8gd5sZm4B8/maxresdefault.jpg",
        titleAr: "جميل خليل في مطعم FM عجمان — تصوير حفلة موسيقية",
        titleEn: "Jamil Khalil at FM Restaurant Ajman | Live Music Videography",
        label: "LIVE EVENT VIDEOGRAPHY",
        descAr: "تصوير ومونتاج أجواء حفلة موسيقية حية داخل مطعم FM في عجمان، مع إبراز الفنان وتفاعل الجمهور وهوية المكان.",
        descEn: "Live-event filming and editing at FM Restaurant Ajman, capturing the artist, audience atmosphere and venue identity.",
      },
      {
        id: "cpc5lK4WAgQ",
        thumbnailUrl: "https://i.ytimg.com/vi/cpc5lK4WAgQ/maxresdefault.jpg",
        titleAr: "تصوير طبق فاهيتا سينمائي — مطعم FM عجمان",
        titleEn: "Restaurant Food Videography | Fajita Cinematic Reel",
        label: "RESTAURANT FOOD VIDEO",
        descAr: "ريل طعام سينمائي يركز على تفاصيل طبق الفاهيتا وحركته وتقديمه ضمن إيقاع بصري جذاب مناسب لتسويق المطاعم.",
        descEn: "A cinematic food reel focused on the fajita dish, movement and presentation with engaging pacing for restaurant marketing.",
      },
      {
        id: "WKUJDv4LZMs",
        thumbnailUrl: "https://i.ytimg.com/vi/WKUJDv4LZMs/maxresdefault.jpg",
        titleAr: "مونتاج إعلان قهوة سينمائي — مطعم FM عجمان",
        titleEn: "Cinematic Coffee Promo — FM Restaurant Ajman",
        label: "RESTAURANT · COFFEE PROMO",
        descAr: "إعلان قهوة قصير لمطعم FM في عجمان، يجمع لقطات المنتج والتفاصيل مع مونتاج وإيقاع سينمائي مناسب لمنصات التواصل.",
        descEn: "A cinematic short-form coffee promo for FM Restaurant Ajman, combining product close-ups, visual detail and social-first pacing.",
      },
      {
        id: "nAamGmPPysI",
        thumbnailUrl: "https://i.ytimg.com/vi/nAamGmPPysI/maxresdefault.jpg",
        titleAr: "مطعم FM عجمان — تصوير مطعم وفعالية موسيقية حية",
        titleEn: "FM Restaurant Ajman | Restaurant & Live Event Video",
        label: "RESTAURANT · EVENT VIDEO",
        descAr: "مشروع تصوير ومونتاج يعرض واجهة مطعم FM وتفاصيل المكان، ثم ينتقل إلى أجواء الحفل والموسيقى الحية داخل المطعم.",
        descEn: "A filmed and edited restaurant promo moving from FM Restaurant’s exterior and venue details into its live music and event atmosphere.",
      },
    ] satisfies PortfolioVideo[],
  },
  {
    category: "medical",
    id: "PLS-P9fWnrSka2WI_ZtIJ-exxrKFqSDa8q",
    ar: "دينتال موشن جرافيك",
    en: "Dental Motion Graphics",
    descAr: "موشن جرافيك متخصص لشرح خدمات طب وتجميل الأسنان بصورة واضحة وجذابة.",
    descEn: "Specialized motion graphics that explain dental and cosmetic services with clarity.",
    serviceSlug: "motion-graphics",
    serviceAr: "خدمة الموشن جرافيك",
    serviceEn: "Motion graphics service",
    videos: [
      { id: "fBdcM8TO8YQ", titleAr: "دينتال موشن جرافيك AHA — محتوى توعوي للأسنان", titleEn: "AHA Dental Motion Graphics — Awareness Content", label: "DENTAL MOTION", descAr: "فيديو دينتال قصير يحوّل المعلومة الطبية إلى محتوى بصري واضح وجذاب ومناسب لمنصات التواصل.", descEn: "A short dental video turning a medical message into clear, engaging content for social platforms." },
      { id: "X9RVBSvZjRc", titleAr: "تحريك جرافيكي لعيادات الأسنان", titleEn: "Motion Design for Dental Clinics", label: "MOTION DESIGN", descAr: "تصميم دينتال يعتمد على تحريك النصوص والعناصر بإيقاع بصري منظم وسهل المتابعة.", descEn: "Dental motion design using animated text and graphics with a clear, easy-to-follow rhythm." },
      { id: "TTSSGV-C5Bs", titleAr: "محتوى طبي متحرك — دينتال", titleEn: "Animated Medical Content — Dental", label: "MEDICAL CONTENT", descAr: "معالجة بصرية للمحتوى الطبي تجمع الموشن والمونتاج في فيديو قصير ومباشر.", descEn: "A concise medical-content edit combining motion graphics and video editing in one visual sequence." },
      { id: "ytTdnO9NSqU", titleAr: "دينتال موشن 2026 — فيديو توعوي قصير", titleEn: "Dental Motion 2026 — Short Explainer", label: "VISUAL EXPLAINER", descAr: "فيديو توعوي دينتال مصمم لتبسيط الفكرة وإبرازها بأسلوب حديث وجذاب.", descEn: "A modern dental explainer created to simplify the message and keep the viewer engaged." },
      { id: "zHVt_0fdpgY", titleAr: "موشن جرافيك لخدمات طب الأسنان", titleEn: "Dental Service Motion Graphics", label: "MOTION DESIGN", descAr: "تحريك بصري مخصص لخدمات الأسنان مع عناوين واضحة وتكوين مناسب للمحتوى القصير.", descEn: "Motion graphics for dental services with clear titles and a composition built for short-form content." },
      { id: "4oLDDM72tPg", titleAr: "تحويل أفكار الأسنان إلى موشن جرافيك", titleEn: "Bringing Dental Ideas to Life", label: "SOCIAL VIDEO", descAr: "تحويل فكرة دينتال إلى فيديو متحرك متكامل يجمع الشرح البصري والإيقاع المناسب للنشر.", descEn: "A dental idea transformed into a complete animated video ready for social publishing." },
    ] satisfies PortfolioVideo[],
  },
  {
    category: "ads",
    id: "PLS-P9fWnrSkaCl89uBi4lNJN4f0vE4Fjl",
    ar: "إعلانات المنتجات",
    en: "Product Advertising",
    descAr: "تصوير ومونتاج وتصميم عروض قصيرة تساعد المنتج على الظهور باحترافية.",
    descEn: "Filming and editing short product ads designed to present products professionally.",
    serviceSlug: "content-production",
    serviceAr: "خدمة الإنتاج المتكامل",
    serviceEn: "Full production service",
    videos: [
      { id: "vv0wjZ2EU3c", titleAr: "إعلان بخاخ إزالة الشعر بالموشن جرافيك", titleEn: "Hair Removal Spray Motion Graphics Ad", label: "PRODUCT MOTION AD", descAr: "موشن جرافيك ومونتاج إعلاني يبرزان المنتج ضمن عرض قصير مناسب للإعلانات الرقمية.", descEn: "Motion graphics and ad editing presenting the product in a short digital advertisement." },
      { id: "oUWVgQAHvfM", titleAr: "إعلان عرض تخفيضات — تصوير ومونتاج", titleEn: "Sale Promotion — Filming & Editing", label: "PRODUCT AD", descAr: "تصوير ومونتاج عرض تخفيضات بأسلوب مباشر يبرز المنتج والرسالة الإعلانية بسرعة.", descEn: "A filmed and edited sale promotion that highlights the product and offer quickly." },
      { id: "O6rfDBsOq5Y", titleAr: "إعلان منتج تجميلي — تصوير ومونتاج", titleEn: "Beauty Product Ad — Filming & Editing", label: "SOCIAL AD", descAr: "إعلان قصير لمنتج تجميلي يجمع التصوير والمعالجة البصرية والمونتاج لمنصات التواصل.", descEn: "A short beauty-product ad combining filming, visual treatment and social-first editing." },
      { id: "qqipwLi_EdM", titleAr: "عرض منتجين — مونتاج وتصميم", titleEn: "Two-Product Offer — Editing & Design", label: "EDITING", descAr: "تصميم عرض يجمع منتجين في فيديو واحد مع ترتيب بصري واضح للمزايا والعرض.", descEn: "A two-product offer arranged in one video with clear visual hierarchy and presentation." },
      { id: "B-GSumhDcmA", titleAr: "إعلان منتج سويسري — قصة المنتج", titleEn: "Swiss Product Ad — Product Story", label: "PRODUCT STORY", descAr: "مونتاج إعلاني يركز على قوة المنتج ومنشئه السويسري ضمن قصة قصيرة ومقنعة.", descEn: "A product-focused edit presenting Swiss origin and product value through a concise story." },
      { id: "-_le9IVf8ls", titleAr: "إعلان غسول وجه — تصوير ومونتاج", titleEn: "Facial Cleanser Ad — Filming & Editing", label: "BEAUTY AD", descAr: "تصوير ومونتاج إعلان غسول وجه مع وصف المنتج والعرض بصورة مناسبة للبيع عبر المنصات.", descEn: "A filmed facial-cleanser ad presenting the product, offer and key details for social sales." },
    ] satisfies PortfolioVideo[],
  },
  {
    category: "realestate",
    id: "PLS-P9fWnrSkZhBPJpyVT9QHHB5vVsci_v",
    ar: "موشن جرافيك عقاري",
    en: "Real Estate Motion Graphics",
    descAr: "فيديوهات تسويق الأراضي والعقارات مع إبراز الموقع والمزايا والفرصة الاستثمارية.",
    descEn: "Real estate videos that highlight location, benefits and investment opportunity.",
    serviceSlug: "motion-graphics",
    serviceAr: "خدمة الموشن جرافيك",
    serviceEn: "Motion graphics service",
    videos: [
      { id: "NCmGTgBdbhg", titleAr: "إعلان أراضٍ صناعية — الصجعة، الشارقة", titleEn: "Industrial Land Promotional Video | Video Editing & AI Production", label: "REAL ESTATE · AI VIDEO", descAr: "فيديو عقاري عمودي للترويج لفرص امتلاك أراضٍ صناعية في الصجعة، يجمع المونتاج والمشاهد المدعومة بالذكاء الاصطناعي والموشن جرافيك والسرد البصري.", descEn: "A vertical real-estate promo for industrial land opportunities in Al Sajaa, combining video editing, AI-assisted visuals, motion graphics and visual storytelling." },
      { id: "mwaa4vDENBI", titleAr: "إعلان عقاري سينمائي — أراضي القاسمية بالشارقة", titleEn: "Cinematic Real Estate Promo — Al Qasimia, Sharjah", label: "REAL ESTATE MOTION", descAr: "فيديو عقاري قصير يجمع المونتاج والموشن جرافيك والمشاهد المدعومة بالذكاء الاصطناعي لإبراز أراضي القاسمية وموقعها وفرصتها الاستثمارية.", descEn: "A short real-estate promo combining editing, motion graphics and AI-assisted visuals to present Al Qasimia land, location and investment potential." },
      { id: "epOFdvwwdeA", titleAr: "مونتاج عقاري — القاسمية الصناعية", titleEn: "Real Estate Editing — Al Qasimia Industrial", label: "REAL ESTATE", descAr: "مونتاج عقاري يعرّف بالمنطقة الصناعية ويعرض الموقع والفرصة بأسلوب واضح ومباشر.", descEn: "A real-estate edit introducing Al Qasimia Industrial and presenting the opportunity clearly." },
      { id: "NwCgrnfXcK8", titleAr: "أراضٍ صناعية للبيع في القاسمية", titleEn: "Industrial Land for Sale in Al Qasimia", label: "MOTION GRAPHICS", descAr: "فيديو تسويقي لأراضٍ صناعية يبرز الموقع وطبيعة العرض باستخدام المونتاج والموشن.", descEn: "A marketing video for industrial land using editing and motion graphics to highlight the location and offer." },
    ] satisfies PortfolioVideo[],
  },
  {
    category: "industry",
    id: "",
    ar: "الشركات والصناعة",
    en: "Corporate & Industrial",
    descAr: "فيديوهات تشرح العمليات والخدمات الصناعية باستخدام المونتاج والموشن والمشاهد المدعومة بالذكاء الاصطناعي.",
    descEn: "Videos explaining industrial processes and services through editing, motion graphics and AI-assisted visuals.",
    serviceSlug: "video-editing",
    serviceAr: "خدمة مونتاج الفيديو",
    serviceEn: "Video editing service",
    videos: [
      { id: "fEfr2kHqQ8o", thumbnailUrl: "https://i.ytimg.com/vi/fEfr2kHqQ8o/hqdefault.jpg", titleAr: "مصنع GGBS الذكي — فيديو ترويجي صناعي", titleEn: "GGBS Smart Factory | Industrial Promo Video", label: "AI · CORPORATE & INDUSTRIAL", descAr: "فيديو شركات وصناعة سينمائي يعتمد على مشاهد مدعومة بالذكاء الاصطناعي لشرح رحلة GGBS والأتمتة والمراقبة الذكية ضمن قصة قصيرة وواضحة.", descEn: "A corporate and industrial promo using AI-assisted visuals to present the GGBS journey, automation, and smart monitoring in a concise cinematic story." },
    ] satisfies PortfolioVideo[],
  },
  {
    category: "ai",
    id: "PLS-P9fWnrSkaaellpxM3a590wHXxTVB06",
    ar: "فيديوهات الذكاء الاصطناعي",
    en: "AI Videos",
    descAr: "تحويل الأفكار إلى مشاهد بصرية مبتكرة وجاهزة لمنصات التواصل.",
    descEn: "Transforming ideas into distinctive visual scenes prepared for social platforms.",
    serviceSlug: "ai-video",
    serviceAr: "خدمة فيديوهات الذكاء الاصطناعي",
    serviceEn: "AI video service",
    videos: [
      { id: "1IX-dlGygqg", titleAr: "مشروع إبداعي — ذكاء اصطناعي ومونتاج وموشن", titleEn: "Creative Project — AI, Editing & Motion", label: "AI & MOTION", descAr: "مشروع يجمع مشاهد الذكاء الاصطناعي والمونتاج والموشن جرافيك ضمن اتجاه بصري واحد.", descEn: "A creative project combining AI scenes, editing and motion graphics under one visual direction." },
      { id: "GmMJviT0chc", titleAr: "مشروع إعلاني جديد — مونتاج وموشن", titleEn: "New Advertising Project — Editing & Motion", label: "VIDEO EDITING", descAr: "مشروع إعلاني قصير يجمع الإيقاع البصري والمونتاج والموشن لصناعة رسالة سريعة وجذابة.", descEn: "A short advertising project combining visual pacing, editing and motion into a focused message." },
      { id: "iSxnbUQLsNY", titleAr: "ريل موشن جرافيك — مونتاج سريع", titleEn: "Motion Graphics Reel — Fast-Paced Edit", label: "AI & MOTION", descAr: "ريل قصير يجمع المونتاج السريع والموشن جرافيك بما يناسب إيقاع منصات التواصل.", descEn: "A short reel combining fast-paced editing and motion graphics for social platforms." },
      { id: "yBCnUBcUVgg", titleAr: "من الرؤية إلى الصورة — إبداع بالذكاء الاصطناعي", titleEn: "From Vision to Visuals — AI Creativity", label: "AI VIDEO", descAr: "تحويل الفكرة إلى مشاهد بصرية متكاملة باستخدام الذكاء الاصطناعي والمونتاج الاحترافي.", descEn: "An idea transformed into complete visual scenes through AI and professional editing." },
      { id: "IAUeaQDl5dM", titleAr: "شو ريل مونتاج وذكاء اصطناعي 2026", titleEn: "AI Video Editing Showreel 2026", label: "SHOWREEL", descAr: "عرض مختصر لقدرات المونتاج وصناعة المشاهد بالذكاء الاصطناعي ضمن أسلوب بصري متنوع.", descEn: "A concise showreel featuring video editing and AI-scene creation across varied visual styles." },
      { id: "YT-rI9n1qRw", titleAr: "صناعة فيديو احترافي بالذكاء الاصطناعي وبرامج أدوبي", titleEn: "Professional AI & Adobe Video Production", label: "AI VIDEO", descAr: "مشروع يبدأ بتطوير الفكرة وصناعة المشاهد بالذكاء الاصطناعي ثم دمجها ومعالجتها بأدوات أدوبي ضمن فيديو متكامل.", descEn: "A project developed from concept and AI scene creation through Adobe editing and finishing into one complete video." },
    ] satisfies PortfolioVideo[],
  },
];

function track(event: string, details: Record<string, string> = {}) {
  trackEvent(event, details);
}

function VideoCard({ video, index, en, category, categoryLabel, serviceSlug, serviceLabel }: { video: PortfolioVideo; index: number; en: boolean; category: string; categoryLabel: string; serviceSlug: string; serviceLabel: string }) {
  const { openVideo } = useVideoViewer();
  const [coverFailed, setCoverFailed] = useState(false);
  const title = en ? video.titleEn : video.titleAr;
  const description = en ? video.descEn : video.descAr;
  const project = projectByVideoId(video.id);
  const resolvedService = project?.serviceSlug || serviceSlug;
  const projectHref = project ? projectPath(project, en ? "en" : "ar") : undefined;
  const thumbnail = videoCoverSource(video.id, video.thumbnailUrl);
  return <article className="work-card" data-contact-service={resolvedService} data-contact-project={project?.slug} data-video-id={video.id}>
    <div className={`video-shell${project?.videoFormat === "landscape" ? " video-shell-landscape" : ""}`}>
      <button className={`youtube-poster ${project?.thumbnailFit === "contain" ? "poster-contain" : ""}`} type="button" onClick={() => {
        openVideo({ videoId: video.id, title, language: en ? "en" : "ar", format: project?.videoFormat || "portrait", projectHref });
        track("portfolio_video_play", { video_id: video.id, category });
      }} aria-label={`${en ? "Play" : "تشغيل"} ${title}`}>
        {coverFailed ? <span className="poster-unavailable"><strong>{title}</strong><small>{en ? "Play video" : "شغّل الفيديو"}</small></span> : <img className="poster-main" src={thumbnail} srcSet={videoThumbnailSrcSet(video.id, video.thumbnailUrl)} sizes="(max-width: 600px) calc(50vw - 25px), (max-width: 1000px) 44vw, 360px" alt={en ? (project?.thumbnailAltEn || title) : (project?.thumbnailAltAr || title)} width="720" height="1280" loading="lazy" decoding="async" onError={(event) => { if (event.currentTarget.src.endsWith('/hqdefault.jpg')) setCoverFailed(true); else { event.currentTarget.srcset = ''; event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`; } }} />}
        <span className="poster-play" aria-hidden="true"><PlayIcon /></span>
        {project?.durationSeconds && <span className="work-duration" dir="ltr">{Math.floor(project.durationSeconds / 60)}:{String(project.durationSeconds % 60).padStart(2, "0")}</span>}
      </button>
    </div>
    <div className="work-info"><div><small>{categoryLabel}</small><h3>{title}</h3><p>{description}</p><div className="work-actions">
      <button className="work-play-link" type="button" onClick={() => { openVideo({ videoId: video.id, title, language: en ? "en" : "ar", format: project?.videoFormat || "portrait", projectHref }); track("portfolio_video_play", { video_id: video.id, category }); }}><PlayIcon />{en ? "Watch video" : "شاهد الفيديو"}</button>
      {projectHref && <Link prefetch={false} href={projectHref}>{en ? "Project details" : "تفاصيل المشروع"}<ArrowIcon /></Link>}
      <a href={project?.videoFormat === "landscape" ? `https://www.youtube.com/watch?v=${video.id}` : `https://www.youtube.com/shorts/${video.id}`} target="_blank" rel="noreferrer" onClick={() => track("portfolio_youtube_open", { video_id: video.id, category })}>YouTube<ArrowIcon /></a>
      <Link prefetch={false} className="work-service-link" href={`${en ? "/en" : ""}/services/${resolvedService}`} onClick={() => track("portfolio_service_open", { category, service: resolvedService })}>{en ? "Service" : "الخدمة"}<ArrowIcon /></Link>
    </div></div></div>
  </article>;
}

export function PortfolioPage({ initialLanguage = "ar" }: { initialLanguage?: "ar" | "en" }) {
  const [lang] = useState<"ar" | "en">(initialLanguage);
  const [filter, setFilter] = useState("selected");
  const en = lang === "en";
  const [visibleCount, setVisibleCount] = useState(8);
  const scrollToWork = () => requestAnimationFrame(() => {
    const hero = document.querySelector('.works-hero');
    const header = document.querySelector('.site-header');
    if (hero) window.scrollTo({ top: hero.getBoundingClientRect().bottom + window.scrollY - (header?.getBoundingClientRect().height || 68), behavior: 'instant' });
  });

  useEffect(() => {
    const showLinkedCategory = () => {
      const category = window.location.hash.slice(1);
      if (!category) { setFilter("selected"); setVisibleCount(8); return; }
      if (!playlists.some(list => list.category === category)) return;
      setFilter(category);
      setVisibleCount(8);
      scrollToWork();
    };
    showLinkedCategory();
    window.addEventListener('hashchange', showLinkedCategory);
    return () => window.removeEventListener('hashchange', showLinkedCategory);
  }, []);

  const filters = [
    { id: "selected", ar: "مختارات", en: "Selected" },
    { id: "all", ar: "الكل", en: "All" },
    { id: "restaurant-events", ar: "مطاعم وفعاليات", en: "Restaurants & Events" },
    { id: "ai", ar: "ذكاء اصطناعي", en: "AI" },
    { id: "education-ai", ar: "كوكب فضول", en: "Kokab Fodool" },
    { id: "medical", ar: "دينتال موشن", en: "Dental Motion" },
    { id: "ads", ar: "إعلانات", en: "Ads" },
    { id: "industry", ar: "شركات وصناعة", en: "Corporate & Industrial" },
    { id: "realestate", ar: "عقارات", en: "Real Estate" },
  ];
  const orderedPlaylists = playlists.map((list) => {
    const selected = featuredReels.find((reel) => reel.category === list.category)?.videoId;
    return { ...list, videos: [...list.videos.filter((video) => video.id === selected), ...list.videos.filter((video) => video.id !== selected)] };
  });
  const visiblePlaylists = filter === "all" || filter === "selected" ? orderedPlaylists : orderedPlaylists.filter((list) => list.category === filter || (filter === "ai" && list.category === "education-ai"));
  const allVideos = orderedPlaylists.flatMap((list) => list.videos.map((video) => ({ video, list })));
  const selectedIds = ["nAamGmPPysI", "ytTdnO9NSqU", "vv0wjZ2EU3c", "fEfr2kHqQ8o", "YT-rI9n1qRw", "mwaa4vDENBI", "eD2G0v9IdJc", "WKUJDv4LZMs"];
  const selection = [...selectedIds.flatMap(id => { const entry = allVideos.find(item => item.video.id === id); return entry ? [entry] : []; }), ...allVideos.filter(item => !selectedIds.includes(item.video.id))];
  const chooseFilter = (category: string) => {
    setFilter(category); setVisibleCount(8);
    const url = new URL(window.location.href);
    url.hash = category === "all" || category === "selected" ? "" : category;
    window.history.replaceState(window.history.state, "", url);
    track("portfolio_filter", { category });
    scrollToWork();
  };
  const indexedProjects = orderedPlaylists.flatMap((list) => list.videos.flatMap((video) => {
    const project = projectByVideoId(video.id);
    return project ? [project] : [];
  }));
  const whatsappMessage = en
    ? "Hello Hassn, I viewed your portfolio and would like to create a similar video."
    : "مرحبًا حسن، شاهدت أعمالك وأرغب في تنفيذ فيديو مشابه. أود معرفة التفاصيل والتكلفة.";
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappMessage)}`;
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: en ? "HASSN EDITOR video portfolio" : "أعمال الفيديو — HASSN EDITOR",
    numberOfItems: indexedProjects.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: indexedProjects.map((project, index) => {
      const projectUrl = `https://hassneditor.com${projectPath(project, en ? "en" : "ar")}`;
      return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": projectUrl,
        name: en ? project.titleEn : project.titleAr,
        url: projectUrl,
        creator: { "@id": "https://hassneditor.com/#hassn-editor" },
        publisher: { "@id": "https://hassneditor.com/#business" },
      },
    };
    }),
  };

  return (
    <main data-contact-page="portfolio" className={`site works-page ${en ? "en" : "ar"}`} dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }} />
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={initialLanguage} alternatePath={en ? "/works" : "/en/works"} />

      <section className="works-hero">
        <p className="eyebrow">HASSN EDITOR / PORTFOLIO</p>
        <h1>{en ? <>Selected <em>video projects</em></> : <>أعمال فيديو <em>مختارة</em></>}</h1>
        <p>{en ? "Filming, editing, motion graphics and AI. Choose a project and watch the work." : "تصوير ومونتاج وموشن غرافيك وذكاء اصطناعي. اختر عملًا وشاهد التنفيذ."}</p>
      </section>

      <section className="portfolio-filters" id="portfolio-start" aria-label={en ? "Filter work" : "تصفية الأعمال"}>
        {filters.map((item) => <button key={item.id} aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} onClick={() => chooseFilter(item.id)}>{en ? item.en : item.ar}<small>{item.id === "selected" ? "8" : item.id === "all" ? allVideos.length : allVideos.filter(entry => entry.list.category === item.id || (item.id === "ai" && entry.list.category === "education-ai")).length}</small></button>)}
      </section>

      {filter === "selected" && <section className="portfolio-selection" aria-label={en ? "Selected portfolio videos" : "فيديوهات مختارة من أعمالي"}>
        <p className="portfolio-count" role="status" aria-live="polite">{en ? `Showing ${Math.min(visibleCount, selection.length)} of ${allVideos.length} projects` : `عرض ${Math.min(visibleCount, selection.length)} من ${allVideos.length} عملًا`}</p>
        <div className="portfolio-grid">{selection.slice(0, visibleCount).map(({ video, list }, index) => <VideoCard key={video.id} video={video} index={index} en={en} category={list.category} categoryLabel={en ? list.en : list.ar} serviceSlug={list.serviceSlug} serviceLabel={en ? list.serviceEn : list.serviceAr} />)}</div>
        {visibleCount < selection.length && <button className="portfolio-load-more secondary-button" type="button" onClick={() => setVisibleCount(count => Math.min(count + 8, selection.length))}>{en ? "Show more work" : "عرض المزيد من الأعمال"}<span>+8</span></button>}
      </section>}
      <details className="portfolio-archive" open={filter !== "selected"}>
        <summary onClick={(event) => { event.preventDefault(); chooseFilter(filter === "selected" ? "all" : "selected"); }}>{en ? "Explore all work by specialty" : "استكشف جميع الأعمال حسب التخصص"}<span>{allVideos.length}</span></summary>

      <section className="playlists-section">
        {visiblePlaylists.map((list, n) => (
          <section className="playlist-block" id={list.category} key={list.category}>
            <div className="playlist-heading">
              <div className="playlist-title"><span>{String(n + 1).padStart(2, "0")}</span><div><p>{list.en}</p><h2>{en ? list.en : list.ar}</h2><small>{en ? list.descEn : list.descAr}</small></div></div>
              {list.id && <a className="playlist-button" href={`https://www.youtube.com/playlist?list=${list.id}`} target="_blank" rel="noreferrer" onClick={() => track("youtube_playlist_open", { category: list.category })}>{en ? "View full playlist" : "مشاهدة القائمة كاملة"} <ArrowIcon /></a>}
            </div>
            <div className="portfolio-grid">{list.videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} en={en} category={list.category} categoryLabel={en ? list.en : list.ar} serviceSlug={list.serviceSlug} serviceLabel={en ? list.serviceEn : list.serviceAr} />)}</div>
            <div className="playlist-conversion"><div><small>{en ? "NEED SOMETHING SIMILAR?" : "تحتاج إلى فيديو مشابه؟"}</small><strong>{en ? `Start a ${list.en.toLowerCase()} project` : `ابدأ مشروعًا في ${list.ar}`}</strong></div><a href={`https://wa.me/971505918238?text=${encodeURIComponent(en ? `Hello Hassn, I viewed your ${list.en} work and would like to discuss a similar project.` : `مرحبًا حسن، شاهدت أعمال ${list.ar} وأرغب في مناقشة مشروع مشابه.`)}`} target="_blank" rel="noreferrer" onClick={() => track("portfolio_category_lead", { category: list.category })}>{en ? "Request this service" : "اطلب هذه الخدمة"} <ArrowIcon /></a></div>
          </section>
        ))}
      </section>

      </details>
      {(filter === "selected" || filter === "all" || filter === "ai" || filter === "education-ai") && <KokabFodoolFeature language={initialLanguage} />}
      <section className="works-cta"><p className="eyebrow">START A PROJECT</p><h2>{en ? "Want a video with this level of detail?" : "تريد فيديو بهذا المستوى من الاهتمام؟"}</h2><p className="response-promise"><i aria-hidden="true" />{en ? "Contact me on WhatsApp" : "تواصل معي عبر واتساب"}</p><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss your project" : "ناقش مشروعك معي"} <ArrowIcon /></a></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${en ? "/en" : ""}/industries`}>{en ? "Industries" : "القطاعات"}</Link><a href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}

export default function WorksPage() {
  return <PortfolioPage />;
}
