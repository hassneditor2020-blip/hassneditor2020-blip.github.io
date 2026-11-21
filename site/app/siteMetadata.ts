import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hassneditor.com"),
  verification: { google: "SNDejTk_2EwmmPln0lxkMWtU_lfkk_G8q4MhjtWZO78" },
  title: { default: "HASSN EDITOR | تصوير فيديو وريلز ومونتاج في الإمارات", template: "%s | HASSN EDITOR" },
  description: "حسن حسن، مصور فيديو وريلز ومونتير في عجمان. تصوير ومونتاج وموشن وفيديو AI كخدمات أساسية، مع تصميم المواقع والتطبيقات كخدمة رقمية مكملة.",
  keywords: ["Videographer UAE", "Videographer Ajman", "Video Editor UAE", "Restaurant Videography UAE", "Content Creator UAE", "Motion Graphics UAE", "مصور فيديو عجمان", "مصور فيديو الإمارات", "مونتير فيديو الإمارات", "Hassn Editor", "Website Design UAE", "Web App Design UAE"],
  alternates: {
    canonical: "/",
    languages: { ar: "/", en: "/en", "x-default": "/" },
  },
  authors: [{ name: "Hassn Hassn", url: "https://hassneditor.com/about-hassn-editor" }],
  creator: "HASSN EDITOR",
  category: "Video production",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  openGraph: { title: "HASSN EDITOR | Videography, Reels, Editing, Motion & AI", description: "تصوير فيديو وريلز في عجمان والشارقة ودبي، مع مونتاج وموشن وفيديو AI كخدمات أساسية وتصميم مواقع وتطبيقات كخدمة رقمية مكملة.", url: "https://hassneditor.com", siteName: "HASSN EDITOR", images: [{ url: "/hassn-editor-showreel-cover.jpg", width: 1280, height: 720, alt: "HASSN EDITOR videography and video editing showreel" }], locale: "ar_AE", alternateLocale: ["en_AE"], type: "website" },
  twitter: { card: "summary_large_image", title: "HASSN EDITOR | Videography, Reels, Editing, Motion & AI", description: "تصوير فيديو وريلز في عجمان والشارقة ودبي، مع مونتاج وموشن وفيديو AI كخدمات أساسية وتصميم مواقع وتطبيقات كخدمة رقمية مكملة.", images: ["/hassn-editor-showreel-cover.jpg"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

