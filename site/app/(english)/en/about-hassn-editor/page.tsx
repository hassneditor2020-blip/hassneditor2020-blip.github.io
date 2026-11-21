import type { Metadata } from "next";
import AboutProfilePage from "../../../AboutProfilePage";

export const metadata: Metadata = {
  title: "Hassn Hassn | Ajman Videographer & Video Editor",
  description: "Meet Hassn Hassn, an Ajman videographer and video editor working since 2020. View the CV, selected projects, motion graphics and AI video work for UAE clients.",
  alternates: { canonical: "/en/about-hassn-editor", languages: { ar: "/about-hassn-editor", en: "/en/about-hassn-editor", "x-default": "/about-hassn-editor" } },
  openGraph: { title: "About Hassn | HASSN EDITOR", description: "Video editor, motion designer and content creator based in Ajman, UAE.", url: "https://hassneditor.com/en/about-hassn-editor", locale: "en_AE", images: [{ url: "/hassn-editor-cv-en.png", alt: "HASSN EDITOR - English CV" }] },
};

export default function EnglishAboutProfileRoute() { return <AboutProfilePage language="en" />; }
