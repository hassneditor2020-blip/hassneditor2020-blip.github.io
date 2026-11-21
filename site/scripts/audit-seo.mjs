import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

// Inspect the production Worker artifact without starting a development server.
const root = process.cwd();
const { default: worker } = await import(pathToFileURL(path.join(root, "dist/server/index.js")));
const origin = "https://hassneditor.com";
const context = { waitUntil() {}, passThroughOnException() {} };
const environment = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const fetchPage = (pathname) => worker.fetch(new Request(new URL(pathname, origin)), environment, context);
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([^\s=<>]+)\s*=\s*"([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attributes(m[0]));
const normalize = (url) => new URL(url, origin).href.replace(/\/$/, "");
const sitemapResponse = await fetchPage("/sitemap.xml");
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const pages = new Map();
const issues = [];
const anchorIssues = [];
const metadata = [];
const internalLinks = new Set();
const externalLinks = new Set();
const anchors = [];
const stylesheets = new Set();
const addIssue = (route, issue) => issues.push({ route, issue });
if (urls.length !== new Set(urls).size) addIssue("/sitemap.xml", "Duplicate URLs");
for (const url of urls) {
  const route = new URL(url).pathname;
  const response = await fetchPage(route);
  const html = await response.text();
  pages.set(route, html);
  const links = tags(html, "link");
  for (const link of links) if (link.rel === "stylesheet" && link.href) stylesheets.add(new URL(link.href, origin).pathname);
  const meta = tags(html, "meta");
  const canonical = links.find((item) => item.rel === "canonical")?.href;
  const description = meta.find((item) => item.name === "description")?.content;
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
  const expectedLanguage = /^\/en(?:\/|$)/.test(route) ? "en" : "ar";
  const document = tags(html, "html")[0];
  if (response.status !== 200) addIssue(route, `HTTP ${response.status}`);
  if (normalize(canonical || "/missing-canonical") !== normalize(url)) addIssue(route, "Canonical is not self-referencing");
  if (/<meta[^>]+(?:name="(?:robots|googlebot)"[^>]+content="[^"]*noindex|content="[^"]*noindex[^>]+name="(?:robots|googlebot)")/i.test(html)) addIssue(route, "noindex");
  if (!title || !description) addIssue(route, "Missing title or description");
  if ((html.match(/<h1\b/g) || []).length !== 1) addIssue(route, "Expected one H1");
  if (document?.lang !== expectedLanguage || document?.dir !== (expectedLanguage === "en" ? "ltr" : "rtl")) addIssue(route, "Incorrect server-rendered document language/direction");
  for (const lang of ["ar", "en", "x-default"]) {
    if (!links.some((item) => item.rel === "alternate" && item.hreflang === lang)) addIssue(route, `Missing ${lang} alternate`);
  }
  for (const tag of tags(html, "a")) {
    if (!tag.href || /^(?:tel:|mailto:|javascript:)/i.test(tag.href)) continue;
    let link;
    try { link = new URL(tag.href, url); } catch { addIssue(route, `Invalid href: ${tag.href}`); continue; }
    if (link.origin === origin || link.hostname === "www.hassneditor.com") internalLinks.add(link.pathname);
    else if (link.protocol === "https:" || link.protocol === "http:") externalLinks.add(link.href);
    if (link.origin === origin && link.hash) anchors.push({ route, target: link.pathname, hash: link.hash });
  }
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(script[1]); } catch { addIssue(route, "Invalid JSON-LD"); }
  }
  metadata.push({ route, title, description, htmlBytes: Buffer.byteLength(html), gzipBytes: gzipSync(html).length });
}
for (const anchor of anchors) {
  const html = pages.get(anchor.target);
  if (html && !html.includes(`id="${decodeURIComponent(anchor.hash.slice(1))}"`)) anchorIssues.push({ route: anchor.route, target: `${anchor.target}${anchor.hash}` });
}
for (const key of ["title", "description"]) {
  const seen = new Map();
  for (const row of metadata) {
    if (seen.has(row[key])) addIssue(row.route, `Duplicate ${key}: ${seen.get(row[key])}`);
    seen.set(row[key], row.route);
  }
}
for (const route of internalLinks) {
  if (pages.has(route)) continue;
  const asset = path.join(root, "public", route);
  if ((await fs.stat(asset).catch(() => null))?.isFile()) continue;
  const response = await fetchPage(route);
  if (response.status >= 400) addIssue(route, `Broken internal link: HTTP ${response.status}`);
}
const robots = await (await fetchPage("/robots.txt")).text();
const videoXml = await (await fetchPage("/video-sitemap.xml")).text();
if (/Disallow:\s*\/\s*$/m.test(robots)) addIssue("/robots.txt", "Crawling blocked");
for (const sitemap of ["/sitemap.xml", "/video-sitemap.xml"]) if (!robots.includes(origin + sitemap)) addIssue("/robots.txt", `Missing ${sitemap}`);
const videoUrls = [...videoXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
for (const url of videoUrls) if (!urls.includes(url)) addIssue("/video-sitemap.xml", `Video page missing from main sitemap: ${url}`);
const redirect = await worker.fetch(new Request("https://www.hassneditor.com/en/services/ai-video?source=audit"), environment, context);
if (redirect.status !== 301 || redirect.headers.get("location") !== `${origin}/en/services/ai-video?source=audit`) addIssue("www", "Unexpected canonical host redirect");
const css = [...stylesheets];
const styles = await Promise.all(css.map((name) => fs.readFile(path.join(root, "dist/client", name))));
const result = {
  generatedAt: new Date().toISOString(),
  scope: "Built production artifact; not a browser or field performance measurement. External link availability is not checked.",
  sitemapUrls: urls.length,
  videoSitemapUrls: videoUrls.length,
  checkedAnchorLinks: anchors.length,
  internalLinkTargets: internalLinks.size,
  externalLinkTargets: externalLinks.size,
  css: { files: css.length, bytes: styles.reduce((sum, b) => sum + b.length, 0), gzipBytes: styles.reduce((sum, b) => sum + gzipSync(b).length, 0) },
  issues,
  anchorIssues,
  metadata,
};
if (process.argv[2]) await fs.writeFile(process.argv[2], JSON.stringify(result, null, 2));
console.log(JSON.stringify({ ...result, metadata: metadata.filter((row) => /services\/(ai-|motion|video-editing)|guides\/ai-|fm-restaurant-ajman-live-event-video/.test(row.route)) }, null, 2));
if (issues.length || anchorIssues.length) process.exitCode = 1;
