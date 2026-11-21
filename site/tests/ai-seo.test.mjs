import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");
const environment = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };
const fetchPage = (route, headers = {}) => worker.fetch(new Request(`https://hassneditor.com${route}`, { headers }), environment, context);
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap((match) => { const value = JSON.parse(match[1]); return Array.isArray(value) ? value : value["@graph"] || [value]; });

test("server-rendered language follows the route even with a forged locale header", async () => {
  for (const [route, language, direction] of [["/", "ar", "rtl"], ["/en", "en", "ltr"], ["/en/services/ai-video", "en", "ltr"], ["/services/ai-video", "ar", "rtl"]]) {
    const html = await (await fetchPage(route, { "x-hassn-language": language === "ar" ? "en" : "ar" })).text();
    assert.match(html, new RegExp(`<html lang="${language}" dir="${direction}">`), route);
    assert.doesNotMatch(html, /id="document-language"/, route);
  }
});

test("owned host and protocol variants converge on one HTTPS URL with the query preserved", async () => {
  for (const origin of ["http://hassneditor.com", "http://www.hassneditor.com", "https://www.hassneditor.com"]) {
    const response = await worker.fetch(new Request(`${origin}/en/services/ai-video?ref=client`), environment, context);
    assert.equal(response.status, 301, origin);
    assert.equal(response.headers.get("location"), "https://hassneditor.com/en/services/ai-video?ref=client", origin);
  }
});

test("AI service uses actual project watch pages and keeps all FAQ schema visible", async () => {
  for (const prefix of ["", "/en"]) {
    const route = `${prefix}/services/ai-video`;
    const html = await (await fetchPage(route)).text();
    const proof = html.match(/<section class="project-highlights"[\s\S]*?<\/section>/)?.[0] || "";
    for (const slug of ["professional-ai-adobe-video-production", "ggbs-smart-factory-industrial-promo", "from-vision-to-ai-visuals", "al-qasimia-cinematic-real-estate-promo"]) {
      const link = proof.match(new RegExp(`href="([^"]+/${slug})"`))?.[1];
      assert.ok(link, slug);
      assert.ok(link.startsWith(`${prefix}/`), link);
      assert.equal((await fetchPage(link)).status, 200, link);
    }
    assert.doesNotMatch(proof, /<iframe\b/, route);
    assert.match(proof, /srcSet=/, route);
    assert.ok(html.includes('id="ai-corporate-videos"'), route);
    assert.ok(html.includes('id="ai-educational-videos"'), route);
    const graph = schemas(html);
    assert.equal(graph.find((item) => item["@type"] === "Service")?.["@id"], `https://hassneditor.com${route}#service`);
    const faq = graph.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, 8);
    for (const question of faq.mainEntity) {
      assert.ok(html.includes(question.name.replaceAll("&", "&amp;")), question.name);
      assert.ok(html.includes(question.acceptedAnswer.text.replaceAll("&", "&amp;")), question.name);
    }
    assert.ok(html.includes("Premiere Pro") && html.includes("After Effects"), route);
    assert.ok(html.includes('data-contact-placement="ai_service_brief"'), route);
  }
});

test("AI guides keep informational identity and point to the appropriate service", async () => {
  for (const prefix of ["", "/en"]) {
    for (const [slug, service] of [["ai-video-production-uae-guide", "ai-video"], ["ai-cartoon-character-video-guide", "ai-cartoon-characters"]]) {
      const route = `${prefix}/guides/${slug}`;
      const html = await (await fetchPage(route)).text();
      assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${route}"`), route);
      const article = schemas(html).find((item) => item["@type"] === "Article");
      assert.equal(article.dateModified, slug === "ai-cartoon-character-video-guide" ? "2026-11-07" : "2026-10-15", route);
      assert.ok(html.includes(`href="${prefix}/services/${service}"`), route);
      assert.match(html, /class="guide-service-note"/);
      assert.match(html, /class="guide-related-resources"/);
    }
  }
});

test("the discovered FM English page remains indexable with its primary player immediately available", async () => {
  const route = "/en/works/fm-restaurant-ajman-live-event-video";
  const response = await fetchPage(route);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${route}"`));
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /<iframe[^>]+nAamGmPPysI[^>]+loading="eager"/);
  assert.equal(schemas(html).find((item) => item["@type"] === "VideoObject").uploadDate, "2026-09-15T08:00:29-07:00");
  const sitemap = await (await fetchPage("/sitemap.xml")).text();
  assert.ok(sitemap.includes(`https://hassneditor.com${route}`));
  const service = await (await fetchPage("/en/services/videography")).text();
  assert.ok(service.includes(`href="${route}"`));
});
