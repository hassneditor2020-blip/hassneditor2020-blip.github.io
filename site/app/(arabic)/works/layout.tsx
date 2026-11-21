import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أعمال المونتاج والموشن جرافيك",
  description: "نماذج مختارة من أعمال HASSN EDITOR في المونتاج، إعلانات المنتجات، الدينتال موشن جرافيك، العقارات وفيديوهات الذكاء الاصطناعي.",
  alternates: {
    canonical: "/works",
    languages: { ar: "/works", en: "/en/works", "x-default": "/works" },
  },
  openGraph: {
    title: "أعمال HASSN EDITOR | مونتاج وموشن وفيديو AI",
    description: "استكشف أعمال المونتاج والإعلانات والموشن جرافيك وفيديوهات الذكاء الاصطناعي.",
    url: "https://hassneditor.com/works",
    images: ["/hassn-editor-showreel-cover.jpg"],
  },
};

export default function WorksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
