import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";
import { createRscRequestHeaders, createRscRequestUrl } from "../node_modules/vinext/dist/server/app-rsc-cache-busting.js";

const origin = "https://hassneditor.com";
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };
const fetchPage = (path, headers = {}) => worker.fetch(new Request(new URL(path, origin), { headers }), env, context);

test("every primary navigation destination serves HTML and a language-correct app navigation payload", async () => {
  for (const prefix of ["", "/en"]) {
    const language = prefix ? "en" : "ar";
    const direction = prefix ? "ltr" : "rtl";
    const home = await (await fetchPage(prefix || "/")).text();
    const navigation = home.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)?.[0];
    const paths = [...navigation.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(paths.length, 6);
    for (const path of paths) {
      const htmlResponse = await fetchPage(path);
      assert.equal(htmlResponse.status, 200, path);
      assert.match(await htmlResponse.text(), new RegExp(`<html lang="${language}" dir="${direction}"`));
      const headers = createRscRequestHeaders();
      // The proxy's untrusted locale header must not override the actual route.
      headers.set("x-hassn-language", language === "en" ? "ar" : "en");
      const rscPath = await createRscRequestUrl(path, headers);
      const rscResponse = await fetchPage(rscPath, headers);
      assert.equal(rscResponse.status, 200, rscPath);
      assert.match(rscResponse.headers.get("content-type"), /^text\/x-component/);
      const payload = await rscResponse.text();
      assert.ok(payload.includes(`"lang":"${language}","dir":"${direction}"`), rscPath);
      assert.ok(payload.includes(`"language":"${language}","initialChoice":null`), rscPath);
    }
  }
});

test("personalized HTML and navigation responses never enter a shared cache", async () => {
  for (const path of ["/", "/en", "/services/ai-video", "/en/services/ai-video"]) {
    for (const preference of ["00", "10", "11"]) {
      for (const rsc of [false, true]) {
        const headers = rsc ? createRscRequestHeaders() : new Headers();
        headers.set("cookie", `hassn-editor-consent-v1=${preference}`);
        const requestPath = rsc ? await createRscRequestUrl(path, headers) : path;
        const response = await fetchPage(requestPath, headers);
        assert.equal(response.status, 200, requestPath);
        assert.equal(response.headers.get("cache-control"), "private, no-store, must-revalidate");
        const body = await response.text();
        if (rsc) {
          assert.ok(body.includes(`"initialChoice":{"analytics":${preference[0] === "1"},"advertising":${preference[1] === "1"}}`));
          assert.match(response.headers.get("vary"), /RSC/);
        } else {
          assert.doesNotMatch(body, /<section class="cookie-consent"/);
        }
      }
    }
  }
});

test("critical font hints are deduplicated, language-specific and point to actual stylesheet resources", async () => {
  for (const [path, family, weights] of [["/", "ibm-plex-sans-arabic-arabic", [400, 700, 500]], ["/en", "space-grotesk-latin", [400, 700, 500]], ["/en/services/ai-video", "space-grotesk-latin", [400, 700]]]) {
    const html = await (await fetchPage(path)).text();
    const hints = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).filter((tag) => tag.includes('as="font"'));
    assert.equal(hints.length, weights.length, path);
    const hrefs = hints.map((tag) => tag.match(/href="([^"]+)"/)[1]);
    assert.equal(new Set(hrefs).size, weights.length, path);
    const stylesheet = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/)[1];
    const css = await fs.readFile(new URL(`../dist/client${stylesheet}`, import.meta.url), "utf8");
    for (const [index, href] of hrefs.entries()) {
      assert.ok(href.includes(`${family}-${weights[index]}-normal`), href);
      assert.ok(css.includes(href.split("/").at(-1)), href);
      const buffer = await fs.readFile(new URL(`../dist/client${href}`, import.meta.url));
      assert.equal(buffer.toString("ascii", 0, 4), "wOF2", href);
      assert.match(hints[index], /crossorigin="(?:anonymous)?"/);
    }
    assert.ok(/unicode-range:U\+(?:600-6FF|6\?\?)/i.test(css), "Arabic Unicode range remains in the built font face");
  }
});
