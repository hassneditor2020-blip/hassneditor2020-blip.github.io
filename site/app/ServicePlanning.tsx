import Link from "next/link";
import { ArrowIcon } from "./PortfolioIcons";

const plans: Record<string, { ar: string[]; en: string[]; guide: string }> = {
  videography: {
    ar: ["هدف واحد لكل ريلز: تقديم خدمة، عرض منتج أو تغطية فعالية.", "الموقع والموعد والأشخاص المشاركون وقائمة اللقطات المطلوبة.", "عدد الفيديوهات والمقاسات، والحوار أو التعليق الصوتي إن لزم.", "مدة التصوير والمونتاج والتعديلات تُحدَّد في عرض واضح قبل الحجز."],
    en: ["One goal for each Reel: introduce a service, show a product or cover an event.", "Location, appointment, participants and the required shot list.", "Video count, formats, dialogue and any voice-over requirements.", "Filming time, editing and revisions are agreed in a clear quote before booking."],
    guide: "prepare-reels-video-shoot",
  },
  "video-editing": {
    ar: ["أرسل مدة المواد الأصلية، وفيديو مرجعيًا للأسلوب المطلوب.", "حدّد هل النص جاهز أم تحتاج إلى بناء تسلسل من اللقطات.", "وضّح الترجمة والموشن ومعالجة الصوت المطلوبة لكل نسخة.", "نتفق على المقاسات وجولات المراجعة وتسليم ملفات المشروع إن طُلبت."],
    en: ["Share the source-footage duration and a reference for the intended style.", "Clarify whether the script is ready or the sequence needs to be built from footage.", "Specify captions, motion graphics and sound finishing for each version.", "Agree formats, review rounds and any requested editable project-file delivery."],
    guide: "video-editing-cost-factors",
  },
  "content-production": {
    ar: ["نحوّل هدف الحملة إلى رسائل وفيديوهات محددة قبل التصوير.", "نختار ما يحتاج تصويرًا فعليًا وما يناسبه موشن أو مشاهد AI.", "نحدّد مسؤولية تجهيز النص والشعار والمنتج والأشخاص والموقع.", "يشمل الاتفاق قائمة المخرجات، والمقاسات، ونقاط الاعتماد وموعد التسليم."],
    en: ["Translate the campaign goal into specific messages and videos before filming.", "Choose which scenes need real filming, motion graphics or AI-assisted visuals.", "Clarify who prepares copy, brand assets, products, people and the location.", "Agree the deliverables, formats, approval points and delivery schedule."],
    guide: "prepare-reels-video-shoot",
  },
};

export default function ServicePlanning({ slug, language }: { slug: string; language: "ar" | "en" }) {
  const plan = plans[slug];
  if (!plan) return null;
  const en = language === "en";
  const prefix = en ? "/en" : "";
  return <section className="service-planning" aria-labelledby="scope-title">
    <div><p className="eyebrow">PLAN YOUR VIDEO</p><h2 id="scope-title">{en ? "A useful brief, a clear quote" : "طلب واضح وعرض سعر مفهوم"}</h2><p>{en ? "These details help define the right scope for your video and the work included in delivery." : "هذه التفاصيل تساعد على تحديد ما يحتاجه فيديوك وما يشمله التنفيذ والتسليم."}</p><Link prefetch={false} href={`${prefix}/guides/${plan.guide}`}>{plan.guide === "prepare-reels-video-shoot" ? (en ? "Prepare your Reels shoot" : "جهّز جلسة تصوير الريلز") : (en ? "Compare video production scopes" : "قارن نطاقات تنفيذ الفيديو")}<ArrowIcon /></Link></div>
    <ol>{(en ? plan.en : plan.ar).map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></li>)}</ol>
  </section>;
}
