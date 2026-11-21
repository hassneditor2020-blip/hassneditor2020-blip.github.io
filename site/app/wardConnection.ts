export const WARD_WEBHOOK_URL =
  "https://reforest-squander-washboard.ngrok-free.dev/webhook/02dedb6c-8cfe-4fba-8e99-d5b282775eca/chat";

export const WARD_HEALTH_TIMEOUT_MS = 6_000;
export const WARD_RESPONSE_TIMEOUT_MS = 45_000;
export const WARD_RECOVERY_INTERVAL_MS = 30_000;

type Fetcher = typeof fetch;

function requestUrl(input: RequestInfo | URL) {
  if (input instanceof Request) return input.url;
  if (input instanceof URL) return input.href;
  return String(input);
}

export function requestMethod(input: RequestInfo | URL, init?: RequestInit) {
  return (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
}

export function isWardWebhookRequest(input: RequestInfo | URL) {
  return requestUrl(input) === WARD_WEBHOOK_URL;
}

export async function fetchWithTimeout(
  fetcher: Fetcher,
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = WARD_RESPONSE_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const externalSignal = init.signal ?? (input instanceof Request ? input.signal : undefined);
  let timedOut = false;

  const relayAbort = () => controller.abort(externalSignal?.reason);
  if (externalSignal?.aborted) relayAbort();
  else externalSignal?.addEventListener("abort", relayAbort, { once: true });

  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    return await fetcher(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (timedOut) throw new DOMException("WARD request timed out", "TimeoutError");
    throw error;
  } finally {
    clearTimeout(timeout);
    externalSignal?.removeEventListener("abort", relayAbort);
  }
}

export async function checkWardAvailability(fetcher: Fetcher) {
  try {
    const response = await fetchWithTimeout(
      fetcher,
      WARD_WEBHOOK_URL,
      {
        method: "OPTIONS",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
      },
      WARD_HEALTH_TIMEOUT_MS,
    );

    return response.ok || response.status === 204;
  } catch {
    return false;
  }
}
