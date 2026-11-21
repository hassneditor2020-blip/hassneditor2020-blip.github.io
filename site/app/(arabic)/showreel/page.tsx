import type { Metadata } from "next";
import ShowreelPage, { showreelData } from "./ShowreelPage";

export const metadata: Metadata = {
  title: showreelData.titleAr,
  description: showreelData.descriptionAr,
  alternates: {
    canonical: "/showreel",
    languages: { ar: "/showreel", en: "/en/showreel", "x-default": "/showreel" },
  },
  openGraph: {
    title: `${showreelData.titleAr} | HASSN EDITOR`,
    description: showreelData.descriptionAr,
    url: "https://hassneditor.com/showreel",
    type: "video.other",
    images: [{ url: "/hassn-editor-showreel-cover.jpg", width: 1280, height: 720, alt: showreelData.titleAr }],
    videos: [{ url: "https://hassneditor.com/hassn-editor-showreel.mp4", type: "video/mp4", width: 1280, height: 720 }],
    locale: "ar_AE",
  },
};

export default function Page() {
  return <ShowreelPage />;
}
