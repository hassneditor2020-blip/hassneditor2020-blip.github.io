"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ANALYTICS_DISABLED_EVENT, ANALYTICS_ENABLED_EVENT } from "./privacyPreferences";
import { contactPageType, hasAnalyticsConsent, trackEvent } from "./analyticsEvents";
import { startPerformanceMetrics } from "./performanceMetrics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(hasAnalyticsConsent);

  useEffect(() => {
    const enable = () => setAnalyticsEnabled(true);
    const disable = () => setAnalyticsEnabled(false);
    window.addEventListener(ANALYTICS_ENABLED_EVENT, enable);
    window.addEventListener(ANALYTICS_DISABLED_EVENT, disable);
    return () => {
      window.removeEventListener(ANALYTICS_ENABLED_EVENT, enable);
      window.removeEventListener(ANALYTICS_DISABLED_EVENT, disable);
    };
  }, []);

  useEffect(() => {
    if (!analyticsEnabled) return;
    void startPerformanceMetrics();
    trackEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      page_type: contactPageType(pathname),
      language: pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar",
    });
  }, [analyticsEnabled, pathname]);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const recordIntent = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      const method = url.hostname === "wa.me" ? "whatsapp" : url.protocol === "tel:" ? "phone" : url.protocol === "mailto:" ? "email" : null;
      const page = link.closest<HTMLElement>("[data-contact-page]");
      const serviceArea = link.closest<HTMLElement>("[data-contact-service]");
      const projectArea = link.closest<HTMLElement>("[data-contact-project]");
      // Attribute the request without collecting WhatsApp messages, email addresses,
      // phone numbers, query strings or the contents of the project brief.
      if (method) trackEvent("contact_intent", {
        method,
        page_path: pathname,
        page_type: page?.dataset.contactPage || contactPageType(pathname),
        service: serviceArea?.dataset.contactService || (pathname.includes("/services/") ? pathname.split("/services/")[1] : "unspecified"),
        project_slug: projectArea?.dataset.contactProject || "none",
        language: pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar",
        placement: link.dataset.contactPlacement || (link.classList.contains("floating-whatsapp") ? "floating" : "page_link"),
      });
      if (url.hostname === "maps.app.goo.gl") trackEvent("google_profile_open", { page_path: pathname });
    };
    document.addEventListener("click", recordIntent);
    return () => document.removeEventListener("click", recordIntent);
  }, [analyticsEnabled, pathname]);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const milestones = [25, 50, 75, 90];
    const reached = new Set<number>();
    const measureScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const progress = Math.round((window.scrollY / available) * 100);
      milestones.forEach((milestone) => {
        if (progress >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent("scroll_depth", { percent: String(milestone), page_path: pathname });
        }
      });
    };
    window.addEventListener("scroll", measureScroll, { passive: true });
    measureScroll();
    return () => window.removeEventListener("scroll", measureScroll);
  }, [analyticsEnabled, pathname]);

  return null;
}
