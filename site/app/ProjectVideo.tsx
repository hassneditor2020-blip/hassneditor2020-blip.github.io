"use client";
import { useVideoViewer } from "./VideoViewer";
import { FullscreenIcon } from "./PortfolioIcons";

export default function ProjectVideo({ videoId, title, language, priority = false, format = "portrait" }: { videoId: string; title: string; language: "ar" | "en"; priority?: boolean; format?: "portrait" | "landscape" }) {
  const { openVideo, active } = useVideoViewer();
  // Keep the player in the initial HTML: crawlers do not click play buttons.
  return (
    <>
    {active ? <div className="project-player-placeholder" style={{ aspectRatio: format === "landscape" ? "16/9" : "9/16" }} aria-hidden="true" /> : <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      title={title}
      loading={priority ? "eager" : "lazy"}
      width={format === "landscape" ? "1280" : "460"}
      height={format === "landscape" ? "720" : "818"}
      referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />}
    <button className="project-expand-video" type="button" onClick={() => openVideo({ videoId, title, language, format })}><FullscreenIcon />{language === "en" ? "Open video viewer" : "افتح عارض الفيديو"}</button>
    </>
  );
}
