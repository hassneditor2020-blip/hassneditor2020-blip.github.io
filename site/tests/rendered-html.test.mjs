import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

test("shows the three user-selected reels after the hero in both languages", async () => {
  const selected = ["nAamGmPPysI", "ytTdnO9NSqU", "vv0wjZ2EU3c"];
  for (const path of ["/", "/en"]) {
    const html = await (await fetchPath(path)).text();
    const featured = html.match(/<section class="featured-reels"[\s\S]*?<\/section>/)?.[0];
    assert.ok(featured, path);
    assert.deepEqual([...featured.matchAll(/data-video-id="([^"]+)"/g)].map((match) => match[1]), selected, path);
    assert.ok(html.indexOf('class="hero"') < html.indexOf('class="featured-reels"'), path);
    assert.ok(html.indexOf('class="featured-reels"') < html.indexOf('class="trust-stats"'), path);
    assert.doesNotMatch(featured, /<iframe\b/, `${path}: players must load on demand`);
    for (const id of selected) assert.ok(featured.includes(`youtube.com/shorts/${id}`), id);
    for (const match of featured.matchAll(/href="([^"#]+(?:works|projects)\/[^"#]+)"/g)) {
      assert.equal((await fetchPath(match[1])).status, 200, match[1]);
    }
  }
});

test("places each selected reel first in its category in both portfolios", async () => {
  for (const path of ["/works", "/en/works"]) {
    const html = await (await fetchPath(path)).text();
    for (const [category, id] of [["restaurant-events", "nAamGmPPysI"], ["medical", "ytTdnO9NSqU"], ["ads", "vv0wjZ2EU3c"]]) {
      const section = html.match(new RegExp(`<section class="playlist-block" id="${category}"[\\s\\S]*?</section>`))?.[0];
      assert.ok(section, category);
      assert.equal(section.match(/data-video-id="([^"]+)"/)?.[1], id, `${path}: ${category}`);
    }
  }
});

test("keeps the bilingual request form brief and exposes the approved filming area", async () => {
  for (const path of ["/", "/en"]) {
    const html = await (await fetchPath(path)).text();
    const form = html.match(/<form id="project-brief-form"[\s\S]*?<\/form>/)?.[0];
    assert.ok(form, path);
    assert.equal((form.match(/\brequired=""/g) ?? []).length, 3, path);
    assert.ok(form.includes('value="videography"'), path);
    assert.match(form, /<details class="optional-brief">/, path);
    assert.doesNotMatch(form, /<textarea[^>]*required/, path);
    for (const city of ["Ajman", "Sharjah", "Dubai"]) assert.ok(form.includes(`value="${city}"`), city);
    assert.ok(html.includes('href="https://g.page/r/CcLLyJ5_XNFAECE/review"'), path);
    const nav = html.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)?.[0];
    assert.equal((nav?.match(/<a /g) ?? []).length, 6, path);
    assert.ok(nav.includes(`href="${path === "/en" ? "/en" : ""}/about-hassn-editor"`), path);
  }
});

async function fetchPath(path, accept = "text/html") {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
    environment,
    context,
  );
}

test("renders bilingual project stories with discoverable players and contact attribution", async () => {
  for (const [path, service, slug] of [
    ["/works/dental-motion-2026-explainer", "motion-graphics", "dental-motion-2026-explainer"],
    ["/projects/hair-removal-spray-product-ad", "motion-graphics", "hair-removal-spray-product-ad"],
    ["/works/ggbs-smart-factory-industrial-promo", "video-editing", "ggbs-smart-factory-industrial-promo"],
  ]) {
    for (const prefix of ["", "/en"]) {
      const response = await fetchPath(`${prefix}${path}`);
      const html = await response.text();
      assert.equal(response.status, 200, `${prefix}${path}`);
      assert.ok(html.includes(`data-contact-service="${service}"`), path);
      assert.ok(html.includes(`data-contact-project="${slug}"`), path);
      assert.match(html, /<dl class="project-challenge">/);
      assert.match(html, /<iframe[^>]*loading="eager"/);
      assert.ok(html.includes('"dateModified":"2026-11-05"'), path);
      assert.ok(html.includes('"isPartOf":{"@id":"https://hassneditor.com/#website"}'), path);
    }
  }
});

test("attributes service, local landing and guide contact links in both languages", async () => {
  for (const [path, service] of [
    ["/services/video-editing", "video-editing"],
    ["/dental-motion-graphics", "motion-graphics"],
    ["/guides/dental-video-content-guide", "motion-graphics"],
  ]) {
    for (const prefix of ["", "/en"]) {
      const html = await (await fetchPath(`${prefix}${path}`)).text();
      assert.ok(html.includes(`data-contact-service="${service}"`), `${prefix}${path}`);
    }
  }
});

test("preserves the published Google verification tag in the initial page head", async () => {
  for (const path of ["/", "/en"]) {
    const html = await (await fetchPath(path)).text();
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0] || "";
    assert.match(head, /name="google-site-verification" content="SNDejTk_2EwmmPln0lxkMWtU_lfkk_G8q4MhjtWZO78"/);
  }
});

test("renders an indexable homepage with a self-referencing canonical", async () => {
  const response = await fetchPath("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/hassneditor\.com\/"\/>/i);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i);
});

test("allows WARD and analytics endpoints in the applied connect-src policy", async () => {
  const response = await fetchPath("/");
  const policy = response.headers.get("content-security-policy") ?? "";

  assert.ok(policy.includes("connect-src 'self'"));
  assert.ok(policy.includes("https://reforest-squander-washboard.ngrok-free.dev"));
  assert.ok(policy.includes("https://www.google-analytics.com"));
  assert.ok(policy.includes("https://analytics.google.com"));
  assert.ok(policy.includes("https://region1.google-analytics.com"));
});

const seoRoutes = [
  ["/industries", "ItemList"],
  ["/en/industries", "ItemList"],
  ["/services", "ItemList"],
  ["/en/services", "ItemList"],
  ["/services/videography", "Service"],
  ["/en/services/videography", "Service"],
  ["/videographer-ajman", "Service"],
  ["/en/videographer-ajman", "Service"],
  ["/industrial-video-production-uae", "Service"],
  ["/en/industrial-video-production-uae", "Service"],
  ["/real-estate-video-editing-uae", "Service"],
  ["/en/real-estate-video-editing-uae", "Service"],
  ["/restaurant-videography-uae", "Service"],
  ["/en/restaurant-videography-uae", "Service"],
  ["/guides/industrial-video-production-guide", "Article"],
  ["/en/guides/industrial-video-production-guide", "Article"],
  ["/guides/real-estate-video-marketing-guide", "Article"],
  ["/en/guides/real-estate-video-marketing-guide", "Article"],
  ["/guides/restaurant-video-marketing-guide", "Article"],
  ["/en/guides/restaurant-video-marketing-guide", "Article"],
  ["/guides/ai-cartoon-character-video-guide", "Article"],
  ["/en/guides/ai-cartoon-character-video-guide", "Article"],
];

test("renders the new bilingual SEO pages with canonical, hreflang and schema", async () => {
  for (const [path, schemaType] of seoRoutes) {
    const response = await fetchPath(path);
    const html = await response.text();

    assert.equal(response.status, 200, path);
    assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
    assert.ok(html.includes('hrefLang="ar"'), path);
    assert.ok(html.includes('hrefLang="en"'), path);
    assert.ok(html.includes(`\"@type\":\"${schemaType}\"`), path);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, path);
  }
});

test("renders visible FAQ content and matching FAQPage schema on sector landings", async () => {
  for (const path of ["/industrial-video-production-uae", "/en/industrial-video-production-uae", "/real-estate-video-editing-uae", "/en/real-estate-video-editing-uae", "/restaurant-videography-uae", "/en/restaurant-videography-uae"]) {
    const response = await fetchPath(path);
    const html = await response.text();

    assert.equal(response.status, 200, path);
    assert.ok(html.includes('"@type":"FAQPage"'), path);
    assert.ok(html.includes("local-faq-list"), path);
  }
});

test("adds case-study schema only to independent project pages", async () => {
  const response = await fetchPath("/works/ggbs-smart-factory-industrial-promo");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.ok(html.includes('"@type":"CreativeWork"'));
  assert.ok(html.includes('"@type":"VideoObject"'));
  assert.ok(html.includes("project-video-summary"));
  assert.ok(html.includes("project-related-showcase"));
});

test("renders the bilingual FM Restaurant project with verified YouTube metadata", async () => {
  for (const path of ["/works/fm-restaurant-ajman-live-event-video", "/en/works/fm-restaurant-ajman-live-event-video"]) {
    const response = await fetchPath(path);
    const html = await response.text();

    assert.equal(response.status, 200, path);
    assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
    assert.ok(html.includes('hrefLang="ar"'), path);
    assert.ok(html.includes('hrefLang="en"'), path);
    assert.ok(html.includes('"@type":"CreativeWork"'), path);
    assert.ok(html.includes('"@type":"VideoObject"'), path);
    assert.ok(html.includes('"uploadDate":"2026-09-15T08:00:29-07:00"'), path);
    assert.ok(html.includes('"duration":"PT42S"'), path);
    assert.ok(html.includes("nAamGmPPysI"), path);
    assert.ok(html.includes("i.ytimg.com/vi/nAamGmPPysI/maxresdefault.jpg"), path);
    assert.ok(!html.includes("restaurant-event-videos-cover.webp"), path);
  }
});

test("renders the bilingual coffee promo case study with verified YouTube metadata", async () => {
  for (const path of ["/works/fm-restaurant-cinematic-coffee-promo", "/en/works/fm-restaurant-cinematic-coffee-promo"]) {
    const response = await fetchPath(path);
    const html = await response.text();

    assert.equal(response.status, 200, path);
    assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
    assert.ok(html.includes('hrefLang="ar"'), path);
    assert.ok(html.includes('hrefLang="en"'), path);
    assert.ok(html.includes('"@type":"CreativeWork"'), path);
    assert.ok(html.includes('"@type":"VideoObject"'), path);
    assert.ok(html.includes('"uploadDate":"2026-09-22T05:04:58-07:00"'), path);
    assert.ok(html.includes('"duration":"PT15S"'), path);
    assert.ok(html.includes("WKUJDv4LZMs"), path);
    assert.ok(html.includes("i.ytimg.com/vi/WKUJDv4LZMs/maxresdefault.jpg"), path);
    assert.ok(!html.includes("restaurant-event-videos-cover.webp"), path);
    assert.ok(html.includes("restaurant-video-marketing-guide"), path);
  }
});

test("renders the new bilingual restaurant case studies with verified YouTube metadata", async () => {
  const projects = [
    ["cinematic-food-videography-restaurant-ad", "FhfNrxrgLgE"],
    ["fm-restaurant-live-music-videography", "F8gd5sZm4B8"],
    ["fm-restaurant-fajita-food-videography", "cpc5lK4WAgQ"],
  ];

  for (const [slug, videoId] of projects) {
    for (const prefix of ["", "/en"]) {
      const path = `${prefix}/works/${slug}`;
      const response = await fetchPath(path);
      const html = await response.text();

      assert.equal(response.status, 200, path);
      assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
      assert.ok(html.includes('hrefLang="ar"'), path);
      assert.ok(html.includes('hrefLang="en"'), path);
      assert.ok(html.includes('"@type":"CreativeWork"'), path);
      assert.ok(html.includes('"@type":"VideoObject"'), path);
      assert.ok(html.includes(videoId), path);
      assert.ok(html.includes(`i.ytimg.com/vi/${videoId}/maxresdefault.jpg`), path);
      assert.ok(html.includes("restaurant-video-marketing-guide"), path);
      assert.ok(html.includes("/services/videography"), path);
    }
  }
});

test("includes verified publication dates and durations in the bilingual video sitemap", async () => {
  const response = await fetchPath("/video-sitemap.xml", "application/xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  for (const videoId of ["WKUJDv4LZMs", "nAamGmPPysI", "FhfNrxrgLgE", "F8gd5sZm4B8", "cpc5lK4WAgQ", "NCmGTgBdbhg", "mwaa4vDENBI"]) {
    const entries = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]).filter((entry) => entry.includes(`/embed/${videoId}`));
    assert.equal(entries.length, 2, videoId);
    for (const entry of entries) {
      assert.ok(entry.includes("<video:thumbnail_loc>"), videoId);
      assert.ok(entry.includes("<video:title>"), videoId);
      assert.ok(entry.includes("<video:description>"), videoId);
      assert.match(entry, /<video:publication_date>\d{4}-\d{2}-\d{2}T[^<]+<\/video:publication_date>/, videoId);
      assert.match(entry, /<video:duration>[1-9]\d*<\/video:duration>/, videoId);
    }
  }
  assert.ok(xml.includes("fEfr2kHqQ8o"));
  assert.ok(xml.includes("<video:publication_date>2026-08-31T03:17:55-07:00</video:publication_date>"));
});

test("keeps the three featured videos consistent across watch pages, schema and sitemap", async () => {
  const xml = await (await fetchPath("/video-sitemap.xml", "application/xml")).text();
  const videos = [
    ["/works/fm-restaurant-ajman-live-event-video", "nAamGmPPysI", "2026-09-15T08:00:29-07:00", 42],
    ["/works/dental-motion-2026-explainer", "ytTdnO9NSqU", "2026-02-01T21:42:05-08:00", 28],
    ["/projects/hair-removal-spray-product-ad", "vv0wjZ2EU3c", "2026-03-24T12:14:17-07:00", 15],
  ];
  for (const [route, id, date, seconds] of videos) {
    for (const prefix of ["", "/en"]) {
      const html = await (await fetchPath(`${prefix}${route}`)).text();
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const video = scripts.flatMap((script) => script["@graph"] || [script]).find((node) => node["@type"] === "VideoObject");
      assert.equal(video?.uploadDate, date, route);
      assert.equal(video?.duration, `PT${seconds}S`, route);
      assert.ok(html.includes(`<time dateTime="${date}">`), route);
      assert.match(html, new RegExp(`<iframe[^>]+src="https://www\\.youtube-nocookie\\.com/embed/${id}\\?`), route);
      const entry = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]).find((item) => item.includes(`<loc>https://hassneditor.com${prefix}${route}</loc>`));
      assert.ok(entry?.includes(`<video:publication_date>${date}</video:publication_date>`), route);
      assert.ok(entry?.includes(`<video:duration>${seconds}</video:duration>`), route);
      assert.ok(entry?.includes(`<video:thumbnail_loc>${video.thumbnailUrl[0]}</video:thumbnail_loc>`), route);
    }
  }
});

test("renders visible FAQ content and FAQPage schema on bilingual service pages", async () => {
  for (const slug of ["videography", "video-editing", "motion-graphics", "ai-video", "ai-cartoon-characters", "content-production"]) {
    for (const prefix of ["", "/en"]) {
      const path = `${prefix}/services/${slug}`;
      const response = await fetchPath(path);
      const html = await response.text();

      assert.equal(response.status, 200, path);
      assert.ok(html.includes('"@type":"FAQPage"'), path);
      assert.ok(html.includes("service-faq-section"), path);
      assert.ok(html.includes("local-faq-list"), path);
    }
  }
});

test("keeps VideoObject off the works listing", async () => {
  const response = await fetchPath("/works");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.ok(html.includes('\"@type\":\"ItemList\"'));
  assert.ok(!html.includes('\"@type\":\"VideoObject\"'));
  assert.ok(html.includes("restaurant-events"));
  assert.ok(html.indexOf('id="restaurant-events"') < html.indexOf('id="medical"'));
  assert.ok(html.includes("FhfNrxrgLgE"));
  assert.ok(html.includes("F8gd5sZm4B8"));
  assert.ok(html.includes("cpc5lK4WAgQ"));
  assert.ok(html.includes("nAamGmPPysI"));
  assert.ok(html.includes("WKUJDv4LZMs"));
  for (const id of ["FhfNrxrgLgE", "F8gd5sZm4B8", "cpc5lK4WAgQ", "nAamGmPPysI", "WKUJDv4LZMs"]) {
    assert.ok(html.includes(`/video-covers/${id}.webp`), id);
  }
  assert.ok(html.includes("/works/fm-restaurant-ajman-live-event-video"));
  assert.ok(html.includes("/works/fm-restaurant-cinematic-coffee-promo"));
  assert.ok(html.includes("/works/cinematic-food-videography-restaurant-ad"));
  assert.ok(html.includes("/works/fm-restaurant-live-music-videography"));
  assert.ok(html.includes("/works/fm-restaurant-fajita-food-videography"));
});

test("includes every new canonical route in the sitemap", async () => {
  const response = await fetchPath("/sitemap.xml", "application/xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  for (const [path] of seoRoutes) {
    assert.ok(xml.includes(`https://hassneditor.com${path}`), path);
  }
  assert.ok(xml.includes("https://hassneditor.com/works/fm-restaurant-ajman-live-event-video"));
  assert.ok(xml.includes("https://hassneditor.com/en/works/fm-restaurant-ajman-live-event-video"));
  assert.ok(xml.includes("https://hassneditor.com/works/fm-restaurant-cinematic-coffee-promo"));
  assert.ok(xml.includes("https://hassneditor.com/en/works/fm-restaurant-cinematic-coffee-promo"));
  assert.ok(xml.includes("https://hassneditor.com/works/cinematic-food-videography-restaurant-ad"));
  assert.ok(xml.includes("https://hassneditor.com/en/works/cinematic-food-videography-restaurant-ad"));
  assert.ok(xml.includes("https://hassneditor.com/works/fm-restaurant-live-music-videography"));
  assert.ok(xml.includes("https://hassneditor.com/en/works/fm-restaurant-live-music-videography"));
  assert.ok(xml.includes("https://hassneditor.com/works/fm-restaurant-fajita-food-videography"));
  assert.ok(xml.includes("https://hassneditor.com/en/works/fm-restaurant-fajita-food-videography"));
  assert.ok(xml.includes("<lastmod>2026-09-27T00:00:00.000Z</lastmod>"));
});

test("keeps filming discoverable while the homepage presents the complete video portfolio", async () => {
  const homepage = await (await fetchPath("/")).text();
  const industries = await (await fetchPath("/industries")).text();
  const works = await (await fetchPath("/works")).text();

  assert.ok(homepage.includes("/services/videography"));
  assert.ok(homepage.includes("شاهد أعمالي"));
  assert.ok(homepage.indexOf("/services/videography") < homepage.indexOf("/services/video-editing"));
  assert.ok(industries.indexOf('id="restaurant-events"') < industries.indexOf('id="industrial"'));
  assert.ok(works.includes("/services/videography"));
});

test("keeps every sitemap page indexable, uniquely described and internally discoverable", async () => {
  const sitemapResponse = await fetchPath("/sitemap.xml", "application/xml");
  const sitemapXml = await sitemapResponse.text();
  const paths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const pathSet = new Set(paths);
  const titles = new Map();
  const descriptions = new Map();
  const inboundLinks = new Map(paths.map((path) => [path, 0]));

  for (const path of paths) {
    const response = await fetchPath(path);
    const html = await response.text();
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;

    assert.equal(response.status, 200, path);
    assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, path);
    assert.equal(h1Count, 1, path);
    if (/\/(works|projects)\/[^/]+$/.test(path)) {
      assert.match(html, /<iframe\b[^>]*src="https:\/\/www\.youtube-nocookie\.com\/embed\/[^"?]+\?rel=0&amp;hl=(ar|en)"/, `${path}: player missing from initial HTML`);
      assert.ok(html.includes('loading="lazy"'), path);
      assert.ok(html.includes('class="project-heading"'), path);
      assert.ok(!html.includes('class="youtube-poster project-video-poster'), `${path}: player covered by click-only poster`);
    }
    assert.ok(title.length > 0 && title.length <= 65, `${path}: title length ${title.length}`);
    assert.ok(description.length > 0 && description.length <= 170, `${path}: description length ${description.length}`);
    assert.ok(!titles.has(title), `${path}: duplicate title with ${titles.get(title)}`);
    assert.ok(!descriptions.has(description), `${path}: duplicate description with ${descriptions.get(description)}`);
    titles.set(title, path);
    descriptions.set(description, path);

    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      let linkedPath;
      try {
        linkedPath = new URL(match[1], `https://hassneditor.com${path}`).pathname;
      } catch {
        continue;
      }
      if (linkedPath.length > 1) linkedPath = linkedPath.replace(/\/$/, "");
      if (linkedPath !== path && pathSet.has(linkedPath)) inboundLinks.set(linkedPath, (inboundLinks.get(linkedPath) ?? 0) + 1);
    }
  }

  for (const [path, inboundCount] of inboundLinks) {
    if (path !== "/") assert.ok(inboundCount > 0, `${path}: orphaned sitemap page`);
  }
});


test("renders bilingual contact, packages and privacy pages with matching navigation", async () => {
  for (const prefix of ["", "/en"]) {
    for (const route of ["contact", "packages", "privacy"]) {
      const path = `${prefix}/${route}`;
      const response = await fetchPath(path);
      const html = await response.text();
      assert.equal(response.status, 200, path);
      assert.ok(html.includes(`rel="canonical" href="https://hassneditor.com${path}"`), path);
      assert.ok(html.includes(`hrefLang="ar" href="https://hassneditor.com/${route}"`), path);
      assert.ok(html.includes(`hrefLang="en" href="https://hassneditor.com/en/${route}"`), path);
      const nav = html.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)?.[0] || "";
      assert.ok(nav.includes(`href="${prefix}/contact"`), path);
      assert.ok(nav.includes(`href="${prefix}/about-hassn-editor"`), path);
      if (route === "contact") {
        const form = html.match(/<form id="project-brief-form"[\s\S]*?<\/form>/)?.[0] || "";
        assert.equal((form.match(/\brequired=""/g) || []).length, 3, path);
        assert.ok(html.includes('"@type":"ContactPage"'), path);
        assert.ok(html.includes("971505918238"), path);
      }
      if (route === "privacy") {
        assert.ok(html.includes(prefix ? "Dedicated project pages may load" : "صفحات المشاريع التفصيلية"), path);
        assert.ok(html.includes(`href="${prefix ? "/privacy" : "/en/privacy"}"`), path);
      }
    }
  }
});

test("preserves package access while simplifying the bilingual homepage", async () => {
  for (const prefix of ["", "/en"]) {
    const html = await (await fetchPath(prefix || "/")).text();
    assert.doesNotMatch(html, /<section class="(?:pricing-section|why-section|guides-preview-section|professional-profiles|about-section)/);
    assert.ok(html.includes(`href="${prefix}/packages"`));
    assert.ok(html.includes(`href="${prefix}/guides"`));
    assert.ok(html.includes('id="about"') && html.includes('id="pricing"') && html.includes('id="guides"'));
  }
});

test("links the selected product motion ad to motion graphics and exposes industrial work", async () => {
  for (const prefix of ["", "/en"]) {
    const html = await (await fetchPath(`${prefix}/works`)).text();
    const card = html.match(/<article class="work-card" data-contact-service="motion-graphics" data-contact-project="hair-removal-spray-product-ad"[\s\S]*?<\/article>/)?.[0] || "";
    assert.ok(card.includes(`href="${prefix}/services/motion-graphics"`));
    assert.ok(html.includes('id="industry"'));
    const selected = html.match(/<section class="portfolio-selection"[\s\S]*?<\/section>/)?.[0] || "";
    const archive = html.match(/<details class="portfolio-archive"[\s\S]*?<\/details>/)?.[0] || "";
    assert.equal((selected.match(/<article class="work-card"/g) || []).length, 8);
    assert.equal((archive.match(/<article class="work-card"/g) || []).length, 32);
    assert.doesNotMatch(archive.split(">")[0], /\bopen\b/, "the category archive starts collapsed");
    assert.doesNotMatch(html, /<iframe\b/, "players load only after a visitor chooses a video");
  }
});

test("renders the primary player before supplementary content on every video sitemap page", async () => {
  const xml = await (await fetchPath("/video-sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  assert.equal(paths.length, 44);
  for (const path of paths) {
    const html = await (await fetchPath(path)).text();
    if (path.endsWith("/showreel")) {
      assert.ok(html.indexOf('<video ') < html.indexOf('class="showreel-description"'), path);
      assert.match(html, /<video[^>]*controls/);
    } else {
      const primary = html.match(/<section class="project-watch-stage"[\s\S]*?<\/section>/)?.[0] || "";
      assert.match(primary, /<iframe[^>]*loading="eager"/, path);
      assert.ok(html.indexOf(primary) < html.indexOf('class="project-watch-caption"'), path);
      assert.ok(html.indexOf(primary) < html.indexOf('<details class="project-story"'), path);
      assert.equal((html.match(/<iframe\b/g) || []).length, 1, path);
    }
    assert.match(html, /"@type":"WatchAction"/, path);
  }
});

test("updates the changed profile, guide, service and watch-page sitemap dates", async () => {
  const xml = await (await fetchPath("/sitemap.xml")).text();
  for (const path of ["/about-hassn-editor", "/services/motion-graphics", "/guides/choose-video-editor-uae", "/showreel", "/works/fm-restaurant-ajman-live-event-video"]) {
    for (const prefix of ["", "/en"]) {
      const entry = xml.match(new RegExp(`<url>\\s*<loc>https://hassneditor\\.com${prefix}${path}</loc>[\\s\\S]*?</url>`))?.[0] || "";
      assert.ok(entry.includes(`<lastmod>${path === "/about-hassn-editor" ? "2026-11-10" : "2026-11-05"}`), `${prefix}${path}`);
    }
  }
});

test("connects motion graphics search intent to real projects and practical preparation", async () => {
  for (const prefix of ["", "/en"]) {
    const html = await (await fetchPath(`${prefix}/services/motion-graphics`)).text();
    assert.ok(html.includes('id="motion-examples"'));
    for (const path of ["/works/dental-motion-2026-explainer", "/projects/hair-removal-spray-product-ad", "/projects/al-qasimia-cinematic-real-estate-promo"]) assert.ok(html.includes(`href="${prefix}${path}"`), path);
    assert.doesNotMatch(html, /<iframe\b/, "service proof must not load several video players");
    const guide = await (await fetchPath(`${prefix}/guides/choose-video-editor-uae`)).text();
    assert.ok(guide.includes(`href="${prefix}/works/fm-restaurant-ajman-live-event-video"`));
    assert.ok(guide.includes('"dateModified":"2026-11-05"'));
  }
});
