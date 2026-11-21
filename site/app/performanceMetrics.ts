import type { Metric } from "web-vitals";
import { hasAnalyticsConsent, trackEvent } from "./analyticsEvents";

let registered = false;
let pending: Promise<void> | undefined;

// Register once per document, after consent. Each late callback checks consent
// again so revocation also stops performance events.
export function startPerformanceMetrics() {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || registered) return;
  if (pending) return pending;
  const initialPath = new URL(performance.getEntriesByType("navigation")[0]?.name || window.location.href).pathname;
  pending = import("web-vitals").then(({ onLCP, onINP, onCLS }) => {
    if (!hasAnalyticsConsent() || registered) return;
    registered = true;
    const report = (metric: Metric) => {
      const path = metric.navigationURL ? new URL(metric.navigationURL, window.location.origin).pathname : initialPath;
      trackEvent(metric.name, {
        value: metric.delta,
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
        navigation_type: metric.navigationType,
        page_path: path,
        page_location: `${window.location.origin}${path}`,
        language: path === "/en" || path.startsWith("/en/") ? "en" : "ar",
      });
    };
    onLCP(report);
    onINP(report);
    onCLS(report);
  }).catch(() => {
    // Optional measurement must never affect the site or contact flow.
  }).finally(() => { pending = undefined; });
  return pending;
}
