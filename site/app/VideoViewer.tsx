"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon, FullscreenIcon } from "./PortfolioIcons";

export type ViewerVideo = {
  videoId?: string;
  source?: string;
  poster?: string;
  title: string;
  language: "ar" | "en";
  format?: "portrait" | "landscape";
  projectHref?: string;
};

const ViewerContext = createContext<{ openVideo: (video: ViewerVideo) => void; active: ViewerVideo | null }>({ openVideo: () => {}, active: null });
export const useVideoViewer = () => useContext(ViewerContext);

export default function VideoViewerProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ViewerVideo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const savedOverflow = useRef("");
  const close = useCallback(() => {
    dialog.current?.close();
    setActive(null);
    document.body.style.overflow = savedOverflow.current;
    requestAnimationFrame(() => trigger.current?.isConnected && trigger.current.focus({ preventScroll: true }));
  }, []);
  const openVideo = useCallback((video: ViewerVideo) => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll("video").forEach((element) => element.pause());
    setActive(video);
  }, []);

  useEffect(() => {
    if (!active) return;
    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = savedOverflow.current; };
  }, [active]);

  const en = active?.language === "en";
  const fullscreen = async () => {
    try {
      if (player.current?.requestFullscreen) await player.current.requestFullscreen();
      else player.current?.querySelector<HTMLVideoElement & { webkitEnterFullscreen?: () => void }>("video")?.webkitEnterFullscreen?.();
    } catch {
      // The native controls remain available if the host blocks fullscreen.
    }
  };

  return <ViewerContext.Provider value={{ openVideo, active }}>
    {children}
    <dialog className="video-viewer" ref={dialog} aria-labelledby="video-viewer-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {active && <div className="video-viewer-panel" dir={en ? "ltr" : "rtl"} lang={active.language}>
        <header className="video-viewer-heading"><div><small>HASSN EDITOR / {en ? "NOW PLAYING" : "عرض الفيديو"}</small><h2 id="video-viewer-title">{active.title}</h2></div><button ref={closeButton} className="video-viewer-close" type="button" onClick={close} aria-label={en ? "Close video and return to the project" : "إغلاق الفيديو والعودة إلى العمل"}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg><span>{en ? "Close" : "إغلاق"}</span></button></header>
        <div className={`video-viewer-stage ${active.format === "landscape" || active.source ? "is-landscape" : "is-portrait"}`} ref={player}>
          {active.source ? <video key={active.source} controls playsInline autoPlay preload="metadata" poster={active.poster} aria-label={active.title}><source src={active.source} type="video/mp4" /></video> : <iframe key={active.videoId} src={`https://www.youtube-nocookie.com/embed/${active.videoId}?rel=0&autoplay=1&hl=${active.language}`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />}
        </div>
        <nav className="video-viewer-actions" aria-label={en ? "Video actions" : "خيارات الفيديو"}>
          <button type="button" onClick={fullscreen}><FullscreenIcon />{en ? "Fullscreen" : "ملء الشاشة"}</button>
          {active.videoId && <a href={`https://www.youtube.com/watch?v=${active.videoId}`} target="_blank" rel="noreferrer">YouTube<ArrowIcon /></a>}
          {active.projectHref && <Link prefetch={false} href={active.projectHref} onClick={close}>{en ? "Project details" : "تفاصيل المشروع"}<ArrowIcon /></Link>}
          <a href={`https://wa.me/971505918238?text=${encodeURIComponent(en ? `Hello Hassn, I viewed “${active.title}” and would like to discuss a similar video.` : `مرحبًا حسن، شاهدت «${active.title}» وأرغب في مناقشة فيديو مشابه.`)}`} target="_blank" rel="noreferrer">{en ? "Request a similar video" : "اطلب فيديو مشابهًا"}<ArrowIcon /></a>
        </nav>
      </div>}
    </dialog>
  </ViewerContext.Provider>;
}
