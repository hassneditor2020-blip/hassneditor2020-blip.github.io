import Link from "next/link";
import ProjectHighlights from "./ProjectHighlights";
import { projectBySlug } from "./projectData";

export const aiProductionSteps = [
  { ar: ["الفكرة والرسالة", "تحديد الجمهور والمنصة والسكريبت وقائمة المشاهد والمخرجات المطلوبة."], en: ["Concept and brief", "Agree on the audience, platform, script, scene list and deliverables."] },
  { ar: ["المراجع والتوليد", "بناء الاتجاه البصري، وتوليد واختيار اللقطات، ومراجعة الاستمرارية ودقة العناصر."], en: ["References and generation", "Set the visual direction, generate and select shots, and review continuity and detail."] },
  { ar: ["المونتاج والموشن", "تركيب المواد في Premiere Pro وAfter Effects، مع العناوين والهوية والألوان والصوت."], en: ["Adobe editing and motion", "Assemble the video in Premiere Pro and After Effects, integrating branding, titles, color and sound."] },
  { ar: ["المراجعة والتسليم", "تطبيق الملاحظات المتفق عليها وفحص النص والصوت وتجهيز المقاسات النهائية للنشر."], en: ["Review and delivery", "Apply the agreed feedback, check text and sound, and export the platform-specific versions."] },
];

const projectSlugs = ["professional-ai-adobe-video-production", "ggbs-smart-factory-industrial-promo", "from-vision-to-ai-visuals", "al-qasimia-cinematic-real-estate-promo"];

export default function AIVideoSections({ language, whatsappUrl }: { language: "ar" | "en"; whatsappUrl: string }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const projects = projectSlugs.flatMap((slug) => { const project = projectBySlug(slug); return project ? [project] : []; });
  const uses = [
    { id: "ai-commercial-videos", ar: ["إعلانات بالذكاء الاصطناعي", "مشاهد توضح فكرة المنتج أو الخدمة، مع وضع الرسالة والهوية والمقاسات المناسبة للحملة. تُدمج صور المنتج الحقيقية عندما تكون التفاصيل الدقيقة أساسية."], en: ["AI commercial video production", "Illustrative product or service concepts shaped around the campaign message, identity and formats. Approved real product assets are integrated when exact detail matters."] },
    { id: "ai-corporate-videos", ar: ["فيديوهات الشركات والصناعة", "تحويل العمليات والمفاهيم الهندسية إلى تسلسل مفهوم. يوضح مشروع GGBS كيف يجتمع السرد الصناعي مع مشاهد AI والموشن وتصميم الصوت."], en: ["AI corporate and industrial videos", "Translate technical processes and engineering concepts into a clear sequence. GGBS demonstrates industrial storytelling combined with AI-assisted visuals, motion and sound."] },
    { id: "ai-educational-videos", ar: ["فيديوهات تعليمية وشخصيات كرتونية", "تخطيط قصة أو سؤال أو شرح قصير، مع مرجع للشخصية واستمرارية للمشاهد والصوت. للمشاريع التعليمية مسار خاص للشخصيات الكرتونية."], en: ["AI educational videos and characters", "Plan a short story, question or explanation with a character reference and continuity across scenes and sound. Character-based learning has its own dedicated production service."] },
  ];
  return <>
    <div id="real-ai-projects"><ProjectHighlights language={language} projects={projects} heading={en ? "Real AI video projects" : "مشاريع فيديو AI حقيقية"} showDetails /></div>
    <section className="ai-applications" id="ai-applications" aria-labelledby="ai-applications-title">
      <div className="section-heading"><div><p className="eyebrow">AI VIDEO / APPLICATIONS</p><h2 id="ai-applications-title">{en ? "Choose the format around your message" : "اختر شكل الفيديو وفق الرسالة"}</h2></div></div>
      <div className="ai-applications-grid">{uses.map((item, index) => <article key={item.id} id={item.id}><small>0{index + 1}</small><h3>{en ? item.en[0] : item.ar[0]}</h3><p>{en ? item.en[1] : item.ar[1]}</p>{index === 2 && <Link prefetch={false} href={`${prefix}/services/ai-cartoon-characters`}>{en ? "Explore character animation" : "استكشف إنتاج الشخصيات الكرتونية"} ↗</Link>}</article>)}</div>
      <div className="ai-project-brief"><div><h3>{en ? "From an idea to a scoped production" : "من فكرة إلى نطاق عمل واضح"}</h3><p>{en ? "Share your goal, references and deadline. I’ll review the scene plan, Adobe finishing, formats and revisions before quoting. Remote production is available across the UAE and internationally." : "أرسل الهدف والمراجع والموعد. نراجع خطة المشاهد والمونتاج والمقاسات والتعديلات قبل إعداد العرض. الإنتاج عن بُعد متاح داخل الإمارات وخارجها."}</p><strong>{en ? "Price after discussing your project" : "السعر بعد التواصل ومناقشة المشروع"}</strong></div><a className="primary-button" data-contact-placement="ai_service_brief" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{en ? "Discuss an AI video" : "ناقش فيديو AI معي"} ↗</a></div>
    </section>
  </>;
}
