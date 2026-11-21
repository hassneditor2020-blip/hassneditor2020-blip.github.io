import assert from "node:assert/strict";
import test from "node:test";
import {
  checkWardAvailability,
  fetchWithTimeout,
  isWardWebhookRequest,
  requestMethod,
  WARD_WEBHOOK_URL,
} from "../app/wardConnection.ts";

test("recognizes only the configured WARD webhook", () => {
  assert.equal(isWardWebhookRequest(WARD_WEBHOOK_URL), true);
  assert.equal(isWardWebhookRequest(new Request(WARD_WEBHOOK_URL)), true);
  assert.equal(isWardWebhookRequest("https://example.com/chat"), false);
  assert.equal(requestMethod(WARD_WEBHOOK_URL, { method: "post" }), "POST");
});

test("checks availability with OPTIONS and never sends a chat message", async () => {
  let captured;
  const fetcher = async (input, init) => {
    captured = { input: String(input), init };
    return new Response(null, { status: 204 });
  };

  assert.equal(await checkWardAvailability(fetcher), true);
  assert.equal(captured.input, WARD_WEBHOOK_URL);
  assert.equal(captured.init.method, "OPTIONS");
  assert.equal(captured.init.body, undefined);
});

test("recovers when a later availability check succeeds", async () => {
  let online = false;
  const fetcher = async () => {
    if (!online) {
      throw new TypeError("offline");
    }

    return new Response(null, { status: 204 });
  };

  assert.equal(await checkWardAvailability(fetcher), false);
  online = true;
  assert.equal(await checkWardAvailability(fetcher), true);
});

test("stops an unresponsive WARD request after the configured timeout", async () => {
  const fetcher = (_input, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener(
        "abort",
        () => reject(new DOMException("aborted", "AbortError")),
        { once: true },
      );
    });

  await assert.rejects(
    fetchWithTimeout(fetcher, WARD_WEBHOOK_URL, { method: "POST" }, 15),
    (error) => error instanceof DOMException && error.name === "TimeoutError",
  );
});
