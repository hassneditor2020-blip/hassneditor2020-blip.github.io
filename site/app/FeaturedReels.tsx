"use client";

import Link from "next/link";
import { ArrowIcon, PlayIcon } from "./PortfolioIcons";

import { trackEvent } from "./analyticsEvents";
import { useEffect, useRef, useState } from "react";
import { featuredReels } from "./featuredReels";
import { projectByVideoId, projectPath } from "./projectData";
import { videoCoverSource, videoThumbnailSrcSet } from "./videoThumbnails";
import { useVideoViewer } from "./VideoViewer";

export default function FeaturedReels({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  const { openVideo } = useVideoViewer();
  const [missingCovers, setMissingCovers] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = list.current;
    if (!container) return;
    const updatePosition = () => {
      const cards = Array.from(container.children);
      const maxScroll = container.scrollWidth - container.clientWidth;
      const distance = Math.abs(container.scrollLeft);
      if (distance <= 2 || maxScroll <= 2) {
        setActiveIndex(0);
        return;
      }
      if (distance >= maxScroll - 2) {
        setActiveIndex(cards.length - 1);
        return;
      }
      const bounds = container.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const difference = Math.abs(rect.left + rect.width / 2 - center);
        if (difference < closestDistance) {
          closestIndex = index;
          closestDistance = difference;
        }
      });
      setActiveIndex(closestIndex);
    };
    updatePosition();
    container.addEventListener("scroll", updatePosition, { passive: true });
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(container);
    return () => {
      container.removeEventListener("scroll", updatePosition);
      resizeObserver.disconnect();
    };
  }, []);
  const move = (direction: number) => {
    const container = list.current;
    if (!container) return;
    const targetIndex = Math.max(0, Math.min(container.children.length - 1, activeIndex + direction));
    const target = container.children[targetIndex];
    if (!target) return;
    const bounds = container.getBoundingClientRect();
    const card = target.getBoundingClientRect();
    container.scrollBy({
      left: card.left + card.width / 2 - bounds.left - bounds.width / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  const recoverCover = (image: HTMLImageElement, videoId: string) => {
    if (image.src.endsWith("/hqdefault.jpg")) setMissingCovers((covers) => ({ ...covers, [videoId]: true }));
    else { image.srcset = ""; image.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; }
  };
  return <section className="featured-reels" id="selected-work" aria-labelledby="selected-work-title">
    <div className="featured-heading">
      <div><p className="eyebrow">SELECTED WORK / 01—{String(featuredReels.length).padStart(2, "0")}</p><h2 id="selected-work-title">{en ? "Selected work" : "أعمال مختارة"}</h2></div>
      <Link prefetch={false} className="featured-all" href={en ? "/en/works" : "/works"}>{en ? "All work" : "كل الأعمال"}<ArrowIcon /></Link>
    </div>
    <p className="featured-intro">{en ? "Filming, editing and motion graphics from real projects." : "تصوير ومونتاج وموشن غرافيك من أعمالي."}</p>
    <div className="featured-reel-controls">
      <span>{en ? "Swipe to explore" : "اسحب لاستعراض الأعمال"}</span>
      <div>
        <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-controls="featured-reel-list" aria-label={en ? "Previous project" : "العمل السابق"}>{en ? "‹" : "›"}</button>
        <span className="featured-reel-position" dir="ltr" role="status" aria-live="polite" aria-atomic="true" aria-label={en ? `Project ${activeIndex + 1} of ${featuredReels.length}` : `العمل ${activeIndex + 1} من ${featuredReels.length}`}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(featuredReels.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => move(1)} disabled={activeIndex === featuredReels.length - 1} aria-controls="featured-reel-list" aria-label={en ? "Next project" : "العمل التالي"}>{en ? "›" : "‹"}</button>
      </div>
    </div>
    <div className="featured-reel-list" id="featured-reel-list" ref={list}>
      {featuredReels.map((reel, index) => {
        const project = projectByVideoId(reel.videoId);
        if (!project) return null;
        const title = en ? reel.titleEn : reel.titleAr;
        return <article className="featured-reel-card" key={reel.videoId} data-video-id={reel.videoId}>
          <div className="featured-reel-frame">
            <button className="featured-reel-poster" type="button" aria-label={`${en ? "Play" : "تشغيل"} ${title}`} onClick={() => { openVideo({ videoId: reel.videoId, title, language, projectHref: projectPath(project, language), format: "portrait" }); trackEvent("featured_video_play", { video_id: reel.videoId, category: reel.category, page_path: window.location.pathname }); }}>
              <span className="featured-cover-fallback" aria-hidden="true"><small>HASSN EDITOR</small><strong>{title}</strong><span>{en ? "Video preview" : "معاينة الفيديو"}</span></span>
              {!missingCovers[reel.videoId] && <>
                <img className="featured-reel-backdrop" src={videoCoverSource(reel.videoId, project.thumbnailUrl)} srcSet={videoThumbnailSrcSet(reel.videoId, project.thumbnailUrl)} sizes="(max-width: 600px) 190px, 210px" alt="" aria-hidden="true" width="404" height="720" loading="lazy" decoding="async" />
                <img className="featured-reel-cover" src={videoCoverSource(reel.videoId, project.thumbnailUrl)} srcSet={videoThumbnailSrcSet(reel.videoId, project.thumbnailUrl)} sizes="(max-width: 600px) 190px, 210px" alt="" width="404" height="720" loading="lazy" decoding="async" ref={(image) => { if (image?.complete && !image.naturalWidth) recoverCover(image, reel.videoId); }} onError={(event) => recoverCover(event.currentTarget, reel.videoId)} />
              </>}
              <span className="featured-reel-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(featuredReels.length).padStart(2, "0")}</span>
              <span className="featured-reel-play" aria-hidden="true"><PlayIcon /></span>
              <span className="featured-reel-caption">{en ? "Watch reel" : "شاهد الريل"}<small dir="ltr">{project.durationSeconds ? `0:${String(project.durationSeconds).padStart(2, "0")} · ` : ""}9:16</small></span>
            </button>
          </div>
          <div className="featured-reel-copy"><small>{en ? reel.labelEn : reel.labelAr}</small><h3>{title}</h3><p>{en ? reel.roleEn : reel.roleAr}</p><div className="featured-reel-actions"><Link prefetch={false} href={projectPath(project, language)} aria-label={en ? `View project: ${title}` : `تفاصيل المشروع: ${title}`} onClick={() => trackEvent("featured_project_open", { video_id: reel.videoId, category: reel.category, page_path: window.location.pathname })}>{en ? "View project" : "تفاصيل المشروع"}</Link><a href={`https://www.youtube.com/shorts/${reel.videoId}`} target="_blank" rel="noopener noreferrer" aria-label={en ? `Watch ${title} on YouTube` : `مشاهدة ${title} على YouTube`}>YouTube</a></div></div>
        </article>;
      })}
    </div>
  </section>;
}
