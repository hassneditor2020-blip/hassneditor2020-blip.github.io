"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_DISABLED_EVENT, ANALYTICS_ENABLED_EVENT, CONSENT_COOKIE_NAME, parseConsentCookie, PRIVACY_PREFERENCES_EVENT, type ConsentChoice } from "./privacyPreferences";

const STORAGE_KEY = "hassn-editor-cookie-consent-v1";
const GA_ID = "G-E1M8JWHFMT";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __hassnAnalyticsLoaded?: boolean;
  }
}

function loadGoogleAnalytics(choice: ConsentChoice) {
  if (!choice.analytics || window.location.hostname !== "hassneditor.com") return;
  if (window.__hassnAnalyticsLoaded) {
    window.dispatchEvent(new Event(ANALYTICS_ENABLED_EVENT));
    return;
  }

  window.__hassnAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  // Google interprets Arguments objects as gtag commands; arrays use a different API.
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  updateGoogleConsent(choice);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
  window.dispatchEvent(new Event(ANALYTICS_ENABLED_EVENT));

  const script = document.createElement("script");
  script.id = "hassn-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function updateGoogleConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.advertising ? "granted" : "denied",
    ad_user_data: choice.advertising ? "granted" : "denied",
    ad_personalization: choice.advertising ? "granted" : "denied",
  });
}

export default function CookieConsent({ language }: { language: "ar" | "en" }) {
  const [visible, setVisible] = useState(true);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  const remember = (choice: ConsentChoice) => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice)); } catch { /* Preferences still persist in the first-party cookie. */ }
    const value = `${Number(choice.analytics)}${Number(choice.advertising)}`;
    document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
  };

  useEffect(() => {
    const openPreferences = () => {
      let saved: string | null = null;
      try { saved = window.localStorage.getItem(STORAGE_KEY); } catch { /* Storage can be unavailable in private browsing. */ }
      if (saved) {
        try {
          const choice = JSON.parse(saved) as ConsentChoice;
          setAnalytics(Boolean(choice.analytics));
          setAdvertising(Boolean(choice.advertising));
        } catch {
          setAnalytics(false);
          setAdvertising(false);
        }
      }
      setCustomizing(true);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener(PRIVACY_PREFERENCES_EVENT, openPreferences);
    const storedCookie = document.cookie.split("; ").find((entry) => entry.startsWith(`${CONSENT_COOKIE_NAME}=`));
    const initialChoice = parseConsentCookie(storedCookie?.split("=")[1]);
    let saved: string | null = null;
    try { saved = window.localStorage.getItem(STORAGE_KEY); } catch { /* Use the server preference when browser storage is unavailable. */ }
    try {
      const legacy = !initialChoice && saved ? JSON.parse(saved) as Partial<ConsentChoice> : null;
      const choice = initialChoice || (legacy && typeof legacy.analytics === "boolean" && typeof legacy.advertising === "boolean" ? legacy as ConsentChoice : null);
      if (choice) {
        window.requestAnimationFrame(() => {
          setAnalytics(choice.analytics);
          setAdvertising(choice.advertising);
          setVisible(false);
        });
        remember(choice);
        updateGoogleConsent(choice);
        loadGoogleAnalytics(choice);
      }
    } catch {
      window.requestAnimationFrame(() => setVisible(true));
    }
    return () => window.removeEventListener(PRIVACY_PREFERENCES_EVENT, openPreferences);
  }, []);

  const save = (choice: ConsentChoice) => {
    remember(choice);
    updateGoogleConsent(choice);
    loadGoogleAnalytics(choice);
    if (!choice.analytics) window.dispatchEvent(new Event(ANALYTICS_DISABLED_EVENT));
    setAnalytics(choice.analytics);
    setAdvertising(choice.advertising);
    setCustomizing(false);
    setVisible(false);
  };

  const en = language === "en";

  return (
    <>
      {visible && (
        <section className="cookie-consent" role="region" aria-live="polite" aria-labelledby="cookie-title" dir={en ? "ltr" : "rtl"}>
          <div className="cookie-copy">
            <p>
              <strong id="cookie-title">{en ? "Your privacy:" : "خصوصيتك:"}</strong>{" "}
              {en ? "Essential cookies keep the site running. Analytics are enabled only with your consent." : "نستخدم الملفات الضرورية، وبموافقتك نفعّل التحليلات."}{" "}
              <a href={en ? "/en/privacy" : "/privacy"}>{en ? "Details" : "التفاصيل"}</a>
            </p>
          </div>

          {customizing && (
            <div className="cookie-options">
              <label className="cookie-option locked">
                <span><strong>{en ? "Essential cookies" : "الملفات الضرورية"}</strong><small>{en ? "Required for the website and cannot be disabled." : "مطلوبة لتشغيل الموقع ولا يمكن تعطيلها."}</small></span>
                <input type="checkbox" checked disabled aria-label={en ? "Essential cookies are always enabled" : "الملفات الضرورية مفعلة دائمًا"} />
              </label>
              <label className="cookie-option">
                <span><strong>{en ? "Analytics cookies" : "ملفات التحليلات"}</strong><small>{en ? "Help measure visits and improve the website." : "تساعدنا على قياس الزيارات وتحسين الموقع."}</small></span>
                <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
              </label>
              <label className="cookie-option">
                <span><strong>{en ? "Advertising cookies" : "ملفات الإعلانات"}</strong><small>{en ? "Used to measure and personalize advertising when campaigns are active." : "تُستخدم لقياس الإعلانات وتخصيصها عند تشغيل حملات إعلانية."}</small></span>
                <input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} />
              </label>
            </div>
          )}

          <div className="cookie-actions">
            <button className="cookie-accept" type="button" onClick={() => save({ analytics: true, advertising: true })}>{en ? "Accept" : "قبول"}</button>
            <button type="button" onClick={() => save({ analytics: false, advertising: false })}>{en ? "Reject" : "رفض"}</button>
            {customizing ? (
              <button type="button" onClick={() => save({ analytics, advertising })}>{en ? "Save choices" : "حفظ اختياراتي"}</button>
            ) : (
              <button type="button" onClick={() => setCustomizing(true)}>{en ? "Customize" : "تخصيص"}</button>
            )}
          </div>
        </section>
      )}

    </>
  );
}
