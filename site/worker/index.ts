/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if ((url.hostname === "www.hassneditor.com" || url.hostname === "hassneditor.com") && (url.hostname.startsWith("www.") || url.protocol !== "https:")) {
      url.hostname = "hassneditor.com";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    const withSecurityHeaders = (response: Response) => {
      const headers = new Headers(response.headers);
      // Both HTML and navigation payloads contain the visitor's consent state.
      // Keep them out of shared/browser caches; fingerprinted assets stay separate.
      if (/^(?:text\/html|text\/x-component)\b/i.test(headers.get("Content-Type") || "")) {
        headers.set("Cache-Control", "private, no-store, must-revalidate");
      }
      headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com; media-src 'self'; frame-src https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self' https://reforest-squander-washboard.ngrok-free.dev https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; font-src 'self'; upgrade-insecure-requests");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("X-Frame-Options", "SAMEORIGIN");
      headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
      if (url.protocol === "https:") headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    };

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(response);
    }

    // Determine document language from the actual route, never a visitor-supplied
    // header. The layout can render the correct lang/dir before JavaScript runs.
    const localizedHeaders = new Headers(request.headers);
    const routePathname = url.pathname.replace(/\.rsc$/, "");
    localizedHeaders.set("x-hassn-language", /^\/en(?:\/|$)/.test(routePathname) ? "en" : "ar");
    localizedHeaders.set("x-hassn-pathname", routePathname);
    const localizedRequest = new Request(request, { headers: localizedHeaders });
    return withSecurityHeaders(await handler.fetch(localizedRequest, env, ctx));
  },
};

export default worker;
