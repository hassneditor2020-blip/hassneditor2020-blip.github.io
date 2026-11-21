import type { Metadata } from "next";
import AboutProfilePage from "../../AboutProfilePage";

export const metadata: Metadata = {
  title: "حسن حسن (Hassn Editor) | مصور ومونتير فيديو في عجمان",
  description: "تعرّف إلى حسن حسن، مصور فيديو وريلز ومونتير في عجمان بخبرة منذ 2020. شاهد السيرة الذاتية والأعمال، وخدمات الموشن والذكاء الاصطناعي للعملاء في الإمارات.",
  alternates: { canonical: "/about-hassn-editor", languages: { ar: "/about-hassn-editor", en: "/en/about-hassn-editor", "x-default": "/about-hassn-editor" } },
  openGraph: { title: "عن حسن حسن | HASSN EDITOR", description: "مونتير فيديو ومصمم موشن وصانع محتوى في عجمان، الإمارات.", url: "https://hassneditor.com/about-hassn-editor", images: [{ url: "/hassn-editor-cv.jpg", alt: "HASSN EDITOR" }] },
};

export default function ArabicAboutProfileRoute() { return <AboutProfilePage language="ar" />; }
