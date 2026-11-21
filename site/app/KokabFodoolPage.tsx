import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "./PortfolioIcons";
import SiteHeader from "./SiteHeader";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { kokabFodoolLinks, kokabFodoolProjects, kokabFodoolSelection } from "./kokabFodoolData";

export function kokabFodoolMetadata(language: "ar" | "en"): Metadata {
  const en = language === "en";
  const url = `https://hassneditor.com${en ? "/en" : ""}/kokab-fodool`;
  const title = en ? "Kokab Fodool | AI Educational Video Case Study" : "كوكب فضول | مشروع فيديو تعليمي بالذكاء الاصطناعي";
  const description = en ? "Explore four Kokab Fodool series: Arabic letters, Mishaal, What If and Guess with Fodool. AI direction, consistent characters and editing by Hassn Editor." : "اكتشف مشروع كوكب فضول عبر أربع سلاسل: الأحرف، ومغامرات مشعال، وماذا لو، وخمّن مع فضّول. إخراج مشاهد الذكاء الاصطناعي وثبات الشخصيات والحوار العربي والمونتاج.";
  return { title, description, alternates: { canonical: url, languages: { ar: "https://hassneditor.com/kokab-fodool", en: "https://hassneditor.com/en/kokab-fodool", "x-default": "https://hassneditor.com/kokab-fodool" } }, openGraph: { title, description, url, type: "website", images: [{ url: "/kokab-fodool/eD2G0v9IdJc.jpg", width: 1280, height: 720, alt: en ? "Kokab Fodool Arabic letter Baa episode" : "حلقة حرف الباء من كوكب فضول" }] }, twitter: { card: "summary_large_image", title, description, images: ["/kokab-fodool/eD2G0v9IdJc.jpg"] } };
}

export default function KokabFodoolPage({ language = "ar" }: { language?: "ar" | "en" }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const url = `https://hassneditor.com${prefix}/kokab-fodool`;
  const whatsapp = `https://wa.me/971505918238?text=${encodeURIComponent(en ? "Hello Hassn, I viewed Kokab Fodool and would like to discuss producing an educational character series." : "مرحبًا حسن، شاهدت مشروع كوكب فضول وأرغب في مناقشة إنتاج سلسلة تعليمية بشخصيات خاصة بمشروعي.")}`;
  const ordered = [...kokabFodoolProjects].sort((a, b) => Number(a.videoFormat === "landscape") - Number(b.videoFormat === "landscape"));
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: en ? "Kokab Fodool — AI educational video production" : "كوكب فضول — إنتاج محتوى تعليمي بالذكاء الاصطناعي", inLanguage: language, dateModified: "2026-11-14", isPartOf: { "@id": "https://hassneditor.com/#website" }, author: { "@id": "https://hassneditor.com/#hassn-editor" }, mainEntity: { "@id": `${url}#episodes` } },
    { "@type": "ItemList", "@id": `${url}#episodes`, numberOfItems: 4, itemListElement: kokabFodoolProjects.map((project, i) => ({ "@type": "ListItem", position: i + 1, name: en ? project.titleEn : project.titleAr, url: `https://hassneditor.com${prefix}/works/${project.slug}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` }, { "@type": "ListItem", position: 2, name: en ? "Portfolio" : "أعمالي", item: `https://hassneditor.com${prefix}/works` }, { "@type": "ListItem", position: 3, name: en ? "Kokab Fodool" : "كوكب فضول", item: url }] },
  ] };
  return <main className={`site kokab-page ${language}`} lang={language} dir={en ? "ltr" : "rtl"} data-contact-page="case-study" data-contact-service="ai-cartoon-characters" data-contact-project="kokab-fodool">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <a className="skip-link" href="#kokab-content">{en ? "Skip to project" : "انتقل إلى المشروع"}</a>
    <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/kokab-fodool`} />
    <article id="kokab-content" className="kokab-content">
      <header className="kokab-intro">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={`${prefix}/works`}>{en ? "Portfolio" : "أعمالي"}</Link><span>/</span><span>{en ? "Kokab Fodool" : "كوكب فضول"}</span></nav>
        <p className="eyebrow">INDEPENDENT PROJECT / HASSN EDITOR</p>
        <h1>{en ? "Kokab Fodool" : "كوكب فضول"}<span>{en ? "An educational world, created with AI." : "عالم تعليمي يُصنع بالذكاء الاصطناعي"}</span></h1>
        <p>{en ? "A children’s educational project on YouTube and Instagram. I develop its ideas and Arabic dialogue, direct AI-assisted scenes and recurring characters, and bring the image, voice and sound effects together through editing." : "مشروع تعليمي للأطفال على يوتيوب وإنستغرام. أطوّر أفكاره وحواره العربي، وأوجّه مشاهد الذكاء الاصطناعي وشخصياته المتكررة، ثم أجمع الصورة والصوت والمؤثرات في المونتاج."}</p>
        <div className="kokab-actions"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">{en ? "Discuss a similar series" : "ناقش إنتاج سلسلة مشابهة"} <span aria-hidden="true"><ArrowIcon /></span></a><a href={kokabFodoolLinks.website} target="_blank" rel="noopener noreferrer">{en ? "Visit the educational website" : "زيارة الموقع التعليمي"} <ArrowIcon /></a><a href={kokabFodoolLinks.youtube} target="_blank" rel="noreferrer">YouTube <ArrowIcon /></a><a href={kokabFodoolLinks.instagram} target="_blank" rel="noreferrer">Instagram <ArrowIcon /></a></div>
      </header>
      <section className="kokab-selection" aria-labelledby="kokab-selection-title">
        <div className="kokab-section-heading"><div><p className="eyebrow">FOUR SERIES / FOUR APPROACHES</p><h2 id="kokab-selection-title">{en ? "Four ways to spark curiosity" : "أربع طرق لإيقاظ الفضول"}</h2></div><p>{en ? "The most-viewed published video in each selected series at the time of review." : "الفيديو المنشور الأعلى مشاهدة في كل سلسلة مختارة وقت المراجعة."}</p></div>
        <p className="kokab-snapshot">{en ? "Public YouTube view counts checked on 5 November 2026; rounded where shown and subject to change. Videos are in Arabic." : "مشاهدات يوتيوب العامة كما ظهرت في 5 نوفمبر 2026؛ الأرقام التقريبية قابلة للتغيّر. لغة الفيديوهات: العربية."}</p>
        <div className="kokab-project-grid">{ordered.map(project => {
          const selected = kokabFodoolSelection.find(item => item.videoId === project.videoId)!;
          return <Link prefetch={false} className={`kokab-project-card ${project.videoFormat === "landscape" ? "kokab-landscape" : ""}`} key={project.slug} href={`${prefix}/works/${project.slug}`}>
            <span className="kokab-project-cover"><img src={project.thumbnailUrl} width="1280" height="720" alt={en ? project.titleEn : project.titleAr} loading="lazy" decoding="async" /><span className="kokab-watch" aria-hidden="true">▶</span></span>
            <span className="kokab-project-copy"><small>{en ? selected.seriesEn : selected.seriesAr}</small><h3>{en ? project.titleEn : project.titleAr}</h3><span className="kokab-views">{en ? `${selected.viewsEn} views at review` : `${selected.viewsAr} مشاهدة وقت المراجعة`}</span><p>{en ? project.summaryEn : project.summaryAr}</p><b>{en ? "Watch video & explore the process" : "شاهد الفيديو وتعرّف على التنفيذ"} <span aria-hidden="true"><ArrowIcon /></span></b></span>
          </Link>;
        })}</div>
      </section>
      <section className="kokab-process" aria-labelledby="kokab-role-title"><div><p className="eyebrow">MY ROLE / AI-ASSISTED PRODUCTION</p><h2 id="kokab-role-title">{en ? "From a question to a finished episode" : "من سؤال إلى حلقة مكتملة"}</h2><p>{en ? "AI tools support production. The creative direction connects the concept, character, motion, Arabic dialogue and final edit." : "تدعم أدوات الذكاء الاصطناعي التنفيذ، ويجمع الإخراج الإبداعي بين الفكرة والشخصية والحركة والحوار العربي والمونتاج النهائي."}</p></div><ol>{[
        ["الفكرة والحوار", "تحديد سؤال أو هدف تعليمي، وتبسيط الحوار ليناسب الحلقة والجمهور.", "Concept & dialogue", "Define a learning question or goal and shape the dialogue for the episode and audience."],
        ["الشخصية وإخراج المشهد", "مراجع بصرية وتوجيه للحركة والكاميرا، مع مراجعة هوية الشخصية واستمراريتها.", "Character & scene direction", "Visual references, motion and camera direction, with character identity and continuity review."],
        ["الصوت والمونتاج", "مراجعة النطق العربي والإيقاع، وتركيب الصورة والصوت والمؤثرات وتجهيز النسخة للنشر.", "Sound & editing", "Review Arabic pronunciation and pacing, assemble picture, voice and effects, and prepare the final video."],
      ].map(([arTitle, arText, enTitle, enText], i) => <li key={enTitle}><span>0{i + 1}</span><div><h3>{en ? enTitle : arTitle}</h3><p>{en ? enText : arText}</p></div></li>)}</ol></section>
      <section className="kokab-evidence" aria-labelledby="kokab-evidence-title"><p className="eyebrow">WHAT TO LOOK FOR</p><h2 id="kokab-evidence-title">{en ? "See the production choices in the published work" : "شاهد قرارات التنفيذ في الأعمال المنشورة"}</h2><p>{en ? "The finished episodes let you assess character direction, Arabic voice and editing together. Each example below links to its own video and project details." : "تتيح الحلقات المكتملة تقييم إخراج الشخصيات والصوت العربي والمونتاج معًا. كل مثال يقود إلى الفيديو وتفاصيل المشروع."}</p><nav aria-label={en ? "Examples of production skills" : "أمثلة لمهارات التنفيذ"}>{[
        ["kokab-fodool-mishaal-environment", "الشخصية عبر مشاهد متتابعة", "تابع مظهر مشعال وملابسه وصوته بين المشاهد، وكيف تربط الانتقالات بينها في قصة واحدة.", "A character across connected scenes", "Follow Mishaal’s appearance, clothing and voice through the sequence, and how the edit connects the story."],
        ["kokab-fodool-arabic-letter-baa", "حرف وصوت وإيقاع واضح", "لاحظ العلاقة بين الحرف والصوت والمثال المصوّر، وتوقيت تقديم المعلومة داخل حلقة قصيرة.", "Letter, voice and timing", "Notice how the letter, pronunciation and visual example work together, and when information appears in a short episode."],
        ["kokab-fodool-what-if-no-gravity", "فكرة تخيلية تتحول إلى مشهد", "شاهد توجيه حركة العناصر والكاميرا لخدمة سؤال واحد، ثم إيقاع الحوار والصوت والمونتاج.", "An imaginative idea becomes a scene", "Watch how object and camera movement support one question, alongside dialogue, sound and editing rhythm."],
      ].map(([slug, arTitle, arText, enTitle, enText]) => <article key={slug}><h3>{en ? enTitle : arTitle}</h3><p>{en ? enText : arText}</p><Link prefetch={false} href={`${prefix}/works/${slug}`}>{en ? "Watch this example" : "شاهد هذا المثال"} <ArrowIcon /></Link></article>)}</nav></section>
      <section className="kokab-next"><div><h2>{en ? "A character-led series for your project" : "سلسلة بشخصيات وهوية خاصة بمشروعك"}</h2><p>{en ? "Explore educational stories, visual explainers and recurring character formats for schools, platforms and brands." : "قصص تعليمية وشروحات بصرية وقوالب متكررة للشخصيات، تناسب المدارس والمنصات والعلامات التجارية."}</p></div><nav aria-label={en ? "Related services" : "الخدمات المرتبطة"}><Link prefetch={false} href={`${prefix}/services/ai-cartoon-characters`}>{en ? "AI cartoon characters" : "إنتاج الشخصيات الكرتونية"} <ArrowIcon /></Link><Link prefetch={false} href={`${prefix}/services/ai-video`}>{en ? "AI video production" : "إنتاج فيديو بالذكاء الاصطناعي"} <ArrowIcon /></Link><Link prefetch={false} href={`${prefix}/guides/ai-cartoon-character-video-guide`}>{en ? "Character consistency guide" : "دليل ثبات الشخصيات"} <ArrowIcon /></Link><a href={whatsapp} target="_blank" rel="noreferrer">{en ? "Send your project brief" : "أرسل فكرة مشروعك"} <ArrowIcon /></a></nav></section>
    </article>
    <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix}/privacy`}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
  </main>;
}
