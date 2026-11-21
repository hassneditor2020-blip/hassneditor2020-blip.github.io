const CONSENT_STORAGE_KEY = "hassn-editor-cookie-consent-v1";

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return Boolean(saved && JSON.parse(saved).analytics === true);
  } catch {
    return false;
  }
}

export function trackEvent(event: string, details: Record<string, string | number> = {}) {
  if (hasAnalyticsConsent()) window.gtag?.("event", event, details);
}

export function contactPageType(pathname: string) {
  const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (path === "/") return "home";
  if (path.startsWith("/services/")) return "service";
  if (/^\/(works|projects)\//.test(path)) return "project";
  if (path.startsWith("/guides/")) return "guide";
  if (path === "/contact") return "contact";
  if (path === "/packages") return "packages";
  if (path === "/works") return "portfolio";
  return "page";
}
