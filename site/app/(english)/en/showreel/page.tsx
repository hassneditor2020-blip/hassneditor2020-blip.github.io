import type { Metadata } from "next";
import ShowreelPage, { showreelData } from "../../../(arabic)/showreel/ShowreelPage";

export const metadata: Metadata = {
  title: showreelData.titleEn,
  description: showreelData.descriptionEn,
  alternates: {
    canonical: "/en/showreel",
    languages: { ar: "/showreel", en: "/en/showreel", "x-default": "/showreel" },
  },
  openGraph: {
    title: `${showreelData.titleEn} | HASSN EDITOR`,
    description: showreelData.descriptionEn,
    url: "https://hassneditor.com/en/showreel",
    type: "video.other",
    images: [{ url: "/hassn-editor-showreel-cover.jpg", width: 1280, height: 720, alt: showreelData.titleEn }],
    videos: [{ url: "https://hassneditor.com/hassn-editor-showreel.mp4", type: "video/mp4", width: 1280, height: 720 }],
    locale: "en_AE",
  },
};

export default function Page() {
  return <ShowreelPage language="en" />;
}
