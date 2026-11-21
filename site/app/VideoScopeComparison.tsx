import Link from "next/link";
import { ArrowIcon } from "./PortfolioIcons";

const scopes = [
  { ar: ["مونتاج مواد جاهزة", "لقطات وشعار ورسالة محددة من العميل.", "اختيار اللقطات والإيقاع والألوان والصوت والعناوين.", "مدة المواد الأصلية وحالتها والترجمة وعدد النسخ."], en: ["Editing supplied footage", "Client footage, brand assets and a defined message.", "Shot selection, pacing, color, sound and titles.", "Source duration and quality, captions and version count."], route: "/services/video-editing" },
  { ar: ["إعلان موشن جرافيك", "هوية المنتج أو الخدمة، ونص وصور معتمدة.", "اتجاه بصري وتصميم عناصر وتحريك ومونتاج وصوت.", "عدد المشاهد وتعقيد الحركة والصوت والمقاسات."], en: ["Motion graphics advertisement", "Approved service or product assets, copy and brand identity.", "Visual direction, graphic design, animation, editing and sound.", "Scene count, animation complexity, sound and formats."], route: "/services/motion-graphics" },
  { ar: ["تصوير وإنتاج ريلز", "هدف واضح وموقع ومنتج أو أشخاص جاهزون للتصوير.", "خطة لقطات وتصوير ومونتاج ونسخ جاهزة للنشر.", "وقت التصوير وتجهيز الموقع وعدد الفيديوهات والتعديلات."], en: ["Filming and Reels production", "A clear goal, location and products or people ready to film.", "Shot planning, filming, editing and publish-ready versions.", "Filming time, location preparation, video count and revisions."], route: "/services/videography" },
];

export default function VideoScopeComparison({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  return <section className="scope-comparison" aria-labelledby="scope-comparison-title">
    <p className="eyebrow">COMPARE THE SCOPE</p><h2 id="scope-comparison-title">{en ? "Three briefs, three different scopes" : "ثلاثة طلبات وثلاثة نطاقات مختلفة"}</h2>
    <p>{en ? "Illustrative scopes, not fixed packages or price quotes. Final inclusions and pricing are agreed after reviewing your material." : "مقارنة توضيحية للنطاق، وليست باقات أو عروض أسعار ثابتة. تُحدَّد التفاصيل والتكلفة بعد مراجعة مواد مشروعك."}</p>
    <div className="scope-cards">{scopes.map(scope => { const copy = en ? scope.en : scope.ar; return <article key={scope.route}><h3>{copy[0]}</h3><dl><dt>{en ? "Starting material" : "المواد المطلوبة"}</dt><dd>{copy[1]}</dd><dt>{en ? "Production work" : "مراحل التنفيذ"}</dt><dd>{copy[2]}</dd><dt>{en ? "What changes the quote?" : "ما الذي يغيّر التكلفة؟"}</dt><dd>{copy[3]}</dd></dl><Link prefetch={false} href={`${en ? "/en" : ""}${scope.route}`}>{en ? "Explore this service" : "اطّلع على الخدمة"}<ArrowIcon /></Link></article>; })}</div>
  </section>;
}
