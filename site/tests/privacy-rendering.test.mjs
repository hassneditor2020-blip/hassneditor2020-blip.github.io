import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");
const environment = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };
const page = async (route, cookie) => {
  const response = await worker.fetch(new Request(`https://hassneditor.com${route}`, { headers: cookie ? { cookie } : {} }), environment, context);
  assert.equal(response.status, 200);
  return response.text();
};

test("first-visit privacy strip is present before the page in server HTML in the correct language", async () => {
  for (const [route, title] of [["/services/ai-video", "خصوصيتك:"], ["/en/services/ai-video", "Your privacy:"]]) {
    const html = await page(route);
    const position = html.indexOf('class="cookie-consent"');
    assert.ok(position > 0 && position < html.indexOf('<main'), route);
    assert.ok(html.includes(`<strong id="cookie-title">${title}</strong>`), route);
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/www\.googletagmanager\.com/);
  }
});

test("saved decisions avoid inserting or removing a privacy strip on returning visits", async () => {
  for (const value of ["00", "10", "11", "01"]) {
    const html = await page("/en/services/ai-video", `hassn-editor-consent-v1=${value}`);
    assert.ok(!html.includes('class="cookie-consent"'), value);
  }
  const malformed = await page("/en/services/ai-video", "hassn-editor-consent-v1=invalid");
  assert.ok(malformed.includes('class="cookie-consent"'));
});
