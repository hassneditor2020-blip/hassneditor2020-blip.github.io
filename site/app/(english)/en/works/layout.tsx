import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Editing, Motion Graphics & AI Portfolio",
  description: "Explore selected HASSN EDITOR projects in video editing, product advertising, dental motion graphics, real estate and AI video.",
  alternates: {
    canonical: "/en/works",
    languages: { ar: "/works", en: "/en/works", "x-default": "/works" },
  },
  openGraph: {
    title: "HASSN EDITOR Portfolio | Editing, Motion & AI Video",
    description: "Selected video editing, advertising, motion graphics and AI video projects.",
    url: "https://hassneditor.com/en/works",
    locale: "en_AE",
  },
};

export default function EnglishWorksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
