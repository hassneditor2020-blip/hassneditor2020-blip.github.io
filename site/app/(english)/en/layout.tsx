import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videographer & Video Editor in Ajman, UAE",
  description: "Hassn Hassn, videographer, Reels creator and video editor in Ajman. Filming in Ajman, Sharjah and Dubai by appointment; remote editing, motion graphics and AI video.",
  twitter: {
    card: "summary_large_image",
    title: "HASSN EDITOR | Videography, Reels, Editing, Motion & AI",
    description: "Videography and Reels in Ajman, Sharjah and Dubai by appointment, with remote video editing, motion graphics and AI video production.",
    images: ["/hassn-editor-showreel-cover.jpg"],
  },
  alternates: {
    canonical: "/en",
    languages: { ar: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "HASSN EDITOR | Videography, Reels, Editing, Motion & AI",
    description: "Videography and Reels in Ajman, Sharjah and Dubai by appointment, with remote video editing, motion graphics and AI video production.",
    url: "https://hassneditor.com/en",
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
  },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
