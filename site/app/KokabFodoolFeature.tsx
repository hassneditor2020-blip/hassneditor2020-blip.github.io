import Link from "next/link";
import { kokabFodoolLinks } from "./kokabFodoolData";
import { ArrowIcon } from "./PortfolioIcons";

export default function KokabFodoolFeature({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  return <section className="kokab-feature" aria-label={en ? "Kokab Fodool educational AI project" : "مشروع كوكب فضول التعليمي بالذكاء الاصطناعي"}>
    <Link prefetch={false} className="kokab-feature-image" href={`${en ? "/en" : ""}/kokab-fodool`} tabIndex={-1} aria-hidden="true"><img src="/kokab-fodool/eD2G0v9IdJc-640.webp" srcSet="/kokab-fodool/eD2G0v9IdJc-320.webp 320w, /kokab-fodool/eD2G0v9IdJc-640.webp 640w, /kokab-fodool/eD2G0v9IdJc-1280.webp 1280w" sizes="(max-width: 700px) 100px, 160px" width="1280" height="720" alt="" loading="lazy" decoding="async" /></Link>
    <div><p className="eyebrow">AI / EDUCATIONAL SERIES</p><h2>{en ? "Kokab Fodool" : "كوكب فضول"}</h2><p>{en ? "An educational world brought to life through AI direction, recurring characters, Arabic dialogue and editing. Explore four series and the work behind them." : "عالم تعليمي يجمع إخراج مشاهد الذكاء الاصطناعي، والشخصيات المتكررة، والحوار العربي والمونتاج. اكتشف أربع سلاسل ودوري في إنتاجها."}</p><Link prefetch={false} className="text-link" href={`${en ? "/en" : ""}/kokab-fodool`}>{en ? "Explore the project and videos" : "استكشف المشروع والفيديوهات"} <span aria-hidden="true"><ArrowIcon /></span></Link><a className="text-link kokab-website-link" href={kokabFodoolLinks.website} target="_blank" rel="noopener noreferrer">{en ? "Visit the educational website" : "زيارة الموقع التعليمي"} <span aria-hidden="true"><ArrowIcon /></span></a></div>
    <span className="kokab-feature-count" aria-hidden="true">04<small>{en ? "SERIES" : "سلاسل"}</small></span>
  </section>;
}
