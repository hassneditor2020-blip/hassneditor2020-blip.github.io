import assert from "node:assert/strict";
import test from "node:test";
import { contactPageType, hasAnalyticsConsent, trackEvent } from "../app/analyticsEvents.ts";

test("contact tracking respects consent, revocation and unreadable preferences", () => {
  const events = [];
  let preference = null;
  globalThis.window = {
    localStorage: { getItem: () => preference },
    gtag: (...args) => events.push(args),
  };
  try {
    trackEvent("contact_intent", { method: "whatsapp" });
    preference = '{"analytics":false}';
    trackEvent("contact_intent", { method: "phone" });
    preference = "invalid-json";
    trackEvent("contact_intent", { method: "email" });
    assert.equal(events.length, 0);

    preference = '{"analytics":true}';
    trackEvent("contact_intent", { method: "whatsapp", service: "motion-graphics" });
    assert.equal(events.length, 1);
    assert.equal(events[0][2].service, "motion-graphics");

    preference = '{"analytics":false}';
    trackEvent("contact_intent", { method: "phone" });
    assert.equal(events.length, 1, "a previously installed listener must respect revocation");
    window.localStorage.getItem = () => { throw new Error("Storage unavailable"); };
    assert.equal(hasAnalyticsConsent(), false);
  } finally {
    delete globalThis.window;
  }
  assert.equal(hasAnalyticsConsent(), false, "safe during server rendering");
});

test("Arabic and English pages use the same contact attribution categories", () => {
  for (const prefix of ["", "/en"]) {
    assert.equal(contactPageType(prefix || "/"), "home");
    assert.equal(contactPageType(`${prefix}/services/video-editing`), "service");
    assert.equal(contactPageType(`${prefix}/works/dental-motion-2026-explainer`), "project");
    assert.equal(contactPageType(`${prefix}/projects/hair-removal-spray-product-ad`), "project");
    assert.equal(contactPageType(`${prefix}/guides/choose-video-editor-uae`), "guide");
    assert.equal(contactPageType(`${prefix}/works`), "portfolio");
    assert.equal(contactPageType(`${prefix}/contact`), "contact");
    assert.equal(contactPageType(`${prefix}/packages`), "packages");
  }
});
