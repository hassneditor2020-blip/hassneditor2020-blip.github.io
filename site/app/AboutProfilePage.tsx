import SiteHeader from "./SiteHeader";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { cvAssets } from "./cvAssets";
import { ArrowIcon } from "./PortfolioIcons";

const socialProfiles = [
  { label: "YouTube", href: "https://youtube.com/@hassn-editor" },
  { label: "Behance", href: "https://www.behance.net/hassneditor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassn-editor/" },
  { label: "Instagram", href: "https://www.instagram.com/hassn.editor" },
  { label: "Facebook", href: "https://www.facebook.com/p/Hassn-Hassn-61587617576359/" },
];

export default function AboutProfilePage({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  const cv = cvAssets[language];
  const base = en ? "/en" : "";
  const canonicalUrl = `https://hassneditor.com${base}/about-hassn-editor`;
  const whatsappText = en
    ? "Hello Hassn, I visited your profile and would like to discuss a video project."
    : "مرحبًا حسن، اطلعت على صفحتك التعريفية وأرغب في مناقشة مشروع فيديو.";
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const faqs = en
    ? [
        ["Who is HASSN EDITOR?", "HASSN EDITOR is a video editor, videographer and content creator based in Ajman, United Arab Emirates, working with companies, brands and content creators."],
        ["What services does HASSN EDITOR provide?", "Services include video editing, filming, motion graphics, product advertising, dental motion graphics, AI video production, AI cartoon character stories and complete content production."],
        ["Where does HASSN EDITOR work?", "HASSN EDITOR is based in Ajman and serves clients across the UAE, with remote collaboration available for clients outside the country."],
        ["Which software and tools are used?", "The workflow uses Adobe Premiere Pro, After Effects, Photoshop, Illustrator, professional cameras, lighting, audio tools and selected AI production tools."],
        ["How can I request a video project?", "You can send the project goal, platform, available footage and preferred delivery date directly through WhatsApp."],
      ]
    : [
        ["من هو HASSN EDITOR؟", "حسن إيديتور هو مونتير فيديو ومصور فيديو وصانع محتوى مقيم في عجمان بدولة الإمارات، ويعمل مع الشركات والعلامات التجارية وصنّاع المحتوى."],
        ["ما الخدمات التي يقدمها HASSN EDITOR؟", "تشمل الخدمات مونتاج الفيديو والتصوير والموشن جرافيك وإعلانات المنتجات والدينتال موشن جرافيك وفيديوهات الذكاء الاصطناعي وقصص الشخصيات الكرتونية والإنتاج المتكامل للمحتوى."],
        ["أين يعمل HASSN EDITOR؟", "يقيم حسن إيديتور في عجمان ويخدم العملاء في جميع إمارات الدولة، كما ينفذ مشاريع عن بُعد للعملاء خارج الإمارات."],
        ["ما البرامج والأدوات المستخدمة؟", "يعتمد العمل على Adobe Premiere Pro وAfter Effects وPhotoshop وIllustrator، إضافة إلى الكاميرات والإضاءة وأدوات الصوت وأدوات إنتاج مختارة بالذكاء الاصطناعي."],
        ["كيف يمكن طلب مشروع فيديو؟", "يمكن إرسال هدف المشروع ومنصة النشر والمواد المتوفرة وموعد التسليم المطلوب مباشرة عبر واتساب."],
      ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#profilepage`,
        url: canonicalUrl,
        name: en ? "About HASSN EDITOR" : "عن HASSN EDITOR",
        description: en
          ? "Official profile of HASSN EDITOR, a video editor, motion designer, videographer and content creator based in Ajman, UAE."
          : "الصفحة التعريفية الرسمية لـ HASSN EDITOR، مونتير فيديو ومصمم موشن ومصور فيديو وصانع محتوى مقيم في عجمان، الإمارات.",
        mainEntity: { "@id": "https://hassneditor.com/#hassn-editor" },
        inLanguage: en ? "en-AE" : "ar-AE",
      },
      {
        "@type": "Person",
        "@id": "https://hassneditor.com/#hassn-editor",
        name: "Hassn Hassn",
        alternateName: ["HASSN EDITOR", "حسن إيديتور", "حسن حسن"],
        url: "https://hassneditor.com/about-hassn-editor",
        jobTitle: ["Video Editor", "Motion Designer", "Videographer", "Content Creator"],
        description: "Video editor, motion designer, videographer and content creator based in Ajman, United Arab Emirates.",
        homeLocation: { "@type": "City", name: "Ajman" },
        knowsLanguage: ["Arabic", "English"],
        knowsAbout: ["Video Editing", "Motion Graphics", "Videography", "Content Creation", "Product Advertising", "Dental Motion Graphics", "AI Video Production", "AI Cartoon Character Video Production"],
        sameAs: socialProfiles.map((profile) => profile.href),
        worksFor: { "@id": "https://hassneditor.com/#business" },
        mainEntityOfPage: { "@id": "https://hassneditor.com/about-hassn-editor#profilepage" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return (
    <main className={`site profile-page ${en ? "en" : "ar"}`} dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={en ? "/about-hassn-editor" : "/en/about-hassn-editor"} />

      <article className="profile-detail">
        <div className="profile-hero-grid">

          <div className="profile-page-copy">
            <p className="eyebrow">HASSN EDITOR / CV</p><p className="profile-person-name">{en ? "Hassn Hassn" : "حسن حسن"}</p>
            <h1>{en ? <>Videographer &amp;<br /><em>video editor</em></> : <>مصور فيديو وريلز<br /><em>ومونتير محترف</em></>}</h1>
            <p className="profile-page-lead">{en ? "I help brands, companies and creators turn ideas into clear, professional videos—based in Ajman and working across the UAE." : "أساعد العلامات التجارية والشركات وصنّاع المحتوى على تحويل أفكارهم إلى فيديوهات واضحة واحترافية، من عجمان إلى جميع إمارات الدولة."}</p>
            <div className="cv-actions"><a className="text-link" href={cv.pdf} target="_blank" rel="noreferrer">{en ? "View CV (PDF)" : "عرض السيرة الذاتية (PDF)"} <span><ArrowIcon /></span></a><a className="text-link" href={cv.pdf} download={cv.downloadName}>{en ? "Download CV" : "تحميل السيرة الذاتية"} <span>↓</span></a></div>
            <div className="profile-page-facts"><span><strong>+500</strong><small>{en ? "completed projects" : "عمل منجز"}</small></span><span><strong>2020</strong><small>{en ? "experience since" : "خبرة منذ"}</small></span><span><strong>AR / EN</strong><small>{en ? "working languages" : "لغات العمل"}</small></span></div>
            <div className="project-actions"><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss a project" : "ناقش مشروعك معي"} <span><ArrowIcon /></span></a><Link prefetch={false} className="text-link" href={`${base}/works`}>{en ? "View selected work" : "شاهد أعمالي المختارة"} <span><ArrowIcon /></span></Link></div>

          </div>
          <figure className="profile-page-image"><a href={cv.pdf} target="_blank" rel="noreferrer" aria-label={en ? "View Hassn Editor’s updated English CV (PDF)" : "عرض السيرة الذاتية المحدثة لحسن حسن بصيغة PDF"}><img src={cv.image} alt={en ? "Hassn Editor’s updated English CV — video editor, motion designer and videographer" : "السيرة الذاتية المحدثة لحسن حسن — محرر فيديو ومصمم موشن جرافيك ومصور فيديو"} width={cv.width} height={cv.height} /></a><figcaption><strong>HASSN EDITOR</strong><span>{en ? "UPDATED CV · ENGLISH" : "السيرة الذاتية المحدثة"}</span></figcaption></figure>
        </div>

        <section className="profile-story"><div><small>{en ? "ABOUT THE WORK" : "عن عملي"}</small><h2>{en ? "One organized path from concept to final delivery" : "مسار منظم من الفكرة حتى التسليم"}</h2></div><p>{en ? "My work combines concept development, scripting, professional filming, video editing, motion graphics, color and sound finishing, and platform-specific delivery. I work on promotional, educational, medical, product, real-estate and AI-assisted video content." : "يجمع عملي بين تطوير الفكرة وكتابة السكريبت والتصوير الاحترافي والمونتاج والموشن جرافيك ومعالجة اللون والصوت وتجهيز المقاسات المناسبة لكل منصة. أعمل على المحتوى الدعائي والتعليمي والطبي وإعلانات المنتجات والعقارات والفيديوهات المدعومة بالذكاء الاصطناعي."}</p></section>

        <section className="profile-expertise"><div><small>{en ? "CORE EXPERTISE" : "التخصصات الأساسية"}</small><h2>{en ? "Services and specialties" : "الخدمات والتخصصات"}</h2></div><nav>{[
          ["videography", en ? "Videography & Reels" : "تصوير الفيديو والريلز"],
          ["video-editing", en ? "Professional video editing" : "مونتاج الفيديو الاحترافي"],
          ["motion-graphics", en ? "Motion graphics" : "الموشن جرافيك"],
          ["ai-video", en ? "AI video production" : "إنتاج فيديوهات الذكاء الاصطناعي"],
          ["ai-cartoon-characters", en ? "AI cartoon character videos" : "فيديوهات الشخصيات الكرتونية بالذكاء الاصطناعي"],
          ["content-production", en ? "Full content production" : "إنتاج المحتوى المتكامل"],
        ].map(([slug, label]) => <Link prefetch={false} key={slug} href={`${base}/services/${slug}`}>{label}<span><ArrowIcon /></span></Link>)}</nav></section>

        <div className="profile-toolkit"><strong>{en ? "Creative toolkit" : "أدوات العمل"}</strong><p dir="ltr">Premiere Pro · After Effects · Photoshop · Illustrator · AI Tools</p><span>{en ? "Professional cameras, lighting and audio recording for planned shoots." : "كاميرات احترافية وإضاءة وتسجيل صوتي لجلسات التصوير المخططة."}</span></div>

        <section className="profile-socials"><div><small>{en ? "VERIFIED PRESENCE" : "حساباتي الرسمية"}</small><h2>{en ? "Find HASSN EDITOR online" : "تابع HASSN EDITOR على المنصات"}</h2><p>{en ? "These profiles belong to the same HASSN EDITOR identity." : "هذه الحسابات جميعها مرتبطة بهوية HASSN EDITOR نفسها."}</p></div><div>{socialProfiles.map((profile) => <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer"><span>{profile.label}</span><b><ArrowIcon /></b></a>)}</div></section>

        <section className="profile-faq"><div><small>ENTITY &amp; SERVICE FAQ</small><h2>{en ? "Clear facts about HASSN EDITOR" : "معلومات واضحة عن HASSN EDITOR"}</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
      </article>

      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${base}/industries`}>{en ? "Industries" : "القطاعات"}</Link><Link prefetch={false} href={`${base}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><a href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</a><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}
