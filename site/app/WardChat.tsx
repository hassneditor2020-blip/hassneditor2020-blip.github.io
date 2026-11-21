"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  checkWardAvailability,
  fetchWithTimeout,
  isWardWebhookRequest,
  requestMethod,
  WARD_RECOVERY_INTERVAL_MS,
  WARD_RESPONSE_TIMEOUT_MS,
  WARD_WEBHOOK_URL,
} from "./wardConnection";

const WARD_SESSION_KEY = "hassn-editor-ward-session-v1";
const WARD_STYLESHEET_ID = "ward-n8n-chat-styles";
const WARD_WHATSAPP_URL = "https://wa.me/971505918238";
const TECHNICAL_ERROR_PATTERN =
  /failed to receive response|failed to fetch|network error|webhook error|n8n error|ngrok error|ward_unavailable|ward request timed out/i;

type LoadState = "idle" | "loading" | "ready";
type ConnectionState = "unknown" | "checking" | "online" | "offline";
type OfflineCause = "availability" | "message";
type EmbeddedChatApp = { unmount: () => void };

function getWardSessionId() {
  const current = window.sessionStorage.getItem(WARD_SESSION_KEY);
  if (current) return current;

  const next = window.crypto?.randomUUID?.() ?? `ward-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(WARD_SESSION_KEY, next);
  return next;
}

function loadWardStyles() {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(WARD_STYLESHEET_ID) as HTMLLinkElement | null;
    if (existing?.sheet) {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => {
          existing.remove();
          reject(new Error("WARD stylesheet failed to load"));
        },
        { once: true },
      );
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.id = WARD_STYLESHEET_ID;
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/ward-n8n-chat.css";
    stylesheet.addEventListener("load", () => resolve(), { once: true });
    stylesheet.addEventListener(
      "error",
      () => {
        stylesheet.remove();
        reject(new Error("WARD stylesheet failed to load"));
      },
      { once: true },
    );
    document.head.appendChild(stylesheet);
  });
}

export default function WardChat() {
  const pathname = usePathname();
  const en = pathname === "/en" || pathname.startsWith("/en/");
  const language = en ? "en" : "ar";
  const [open, setOpen] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [connectionState, setConnectionState] = useState<ConnectionState>("unknown");
  const [offlineCause, setOfflineCause] = useState<OfflineCause>("availability");
  const [retryCount, setRetryCount] = useState(0);
  const appRef = useRef<EmbeddedChatApp | null>(null);
  const initializingRef = useRef(false);
  const mountedLanguageRef = useRef<string | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const nativeFetchRef = useRef<typeof window.fetch | null>(null);
  const connectionCheckRef = useRef<Promise<boolean> | null>(null);
  const connectionStateRef = useRef<ConnectionState>("unknown");

  const probeWard = useCallback(async (showChecking = false) => {
    if (connectionCheckRef.current) return connectionCheckRef.current;
    if (showChecking) setConnectionState("checking");

    const fetcher = nativeFetchRef.current ?? window.fetch.bind(window);
    const probe = checkWardAvailability(fetcher)
      .then((online) => {
        if (online) {
          setConnectionState("online");
          setOfflineCause("availability");
        } else {
          setConnectionState("offline");
          setOfflineCause((current) => current ?? "availability");
        }
        return online;
      })
      .finally(() => {
        connectionCheckRef.current = null;
      });

    connectionCheckRef.current = probe;
    return probe;
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.inert = !open;
  }, [open]);

  useEffect(() => {
    connectionStateRef.current = connectionState;
    const embed = document.getElementById("ward-chat-embed");
    if (embed) embed.inert = connectionState !== "online";
  }, [connectionState]);

  useEffect(() => {
    let active = true;
    const nativeFetch = window.fetch.bind(window);
    nativeFetchRef.current = nativeFetch;

    const guardedFetch: typeof window.fetch = async (input, init) => {
      const method = requestMethod(input, init);
      if (!isWardWebhookRequest(input) || method === "OPTIONS") {
        return nativeFetch(input, init);
      }

      try {
        const response = await fetchWithTimeout(
          nativeFetch,
          input,
          init,
          WARD_RESPONSE_TIMEOUT_MS,
        );
        if (!response.ok) throw new Error("WARD_UNAVAILABLE");
        if (active) {
          setConnectionState("online");
          setOfflineCause("availability");
        }
        return response;
      } catch (error) {
        if (active) {
          setOfflineCause("message");
          setConnectionState("offline");
        }
        throw error;
      }
    };

    window.fetch = guardedFetch;
    return () => {
      active = false;
      if (window.fetch === guardedFetch) window.fetch = nativeFetch;
      nativeFetchRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    void probeWard(connectionStateRef.current === "unknown");
  }, [language, open, probeWard]);

  useEffect(() => {
    if (connectionState !== "offline") return;

    const retryConnection = () => {
      void probeWard(false);
    };
    const interval = window.setInterval(retryConnection, WARD_RECOVERY_INTERVAL_MS);
    window.addEventListener("online", retryConnection);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", retryConnection);
    };
  }, [connectionState, probeWard]);

  useEffect(() => {
    const embed = document.getElementById("ward-chat-embed");
    if (!embed) return;

    const scrubTechnicalErrors = () => {
      embed.querySelectorAll<HTMLElement>(".chat-message").forEach((message) => {
        if (TECHNICAL_ERROR_PATTERN.test(message.textContent ?? "")) {
          message.hidden = true;
          message.setAttribute("aria-hidden", "true");
        }
      });
    };

    const observer = new MutationObserver(scrubTechnicalErrors);
    observer.observe(embed, { childList: true, subtree: true, characterData: true });
    scrubTechnicalErrors();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!appRef.current || mountedLanguageRef.current === language) return;
    appRef.current.unmount();
    appRef.current = null;
    mountedLanguageRef.current = null;
    document.getElementById("ward-chat-embed")?.replaceChildren();
    setLoadState("idle");
    setRetryCount((count) => count + 1);
  }, [language]);

  useEffect(() => {
    if (
      !open ||
      connectionState !== "online" ||
      appRef.current ||
      initializingRef.current
    ) {
      return;
    }

    let cancelled = false;

    async function initializeWard() {
      initializingRef.current = true;
      setLoadState("loading");
      try {
        await loadWardStyles();
        const { createChat } = await import("@n8n/chat");
        if (cancelled) return;

        const app = createChat({
          webhookUrl: WARD_WEBHOOK_URL,
          webhookConfig: { method: "POST", headers: {} },
          target: "#ward-chat-embed",
          mode: "fullscreen",
          showWelcomeScreen: false,
          loadPreviousSession: false,
          sessionId: getWardSessionId(),
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          allowFileUploads: false,
          enableStreaming: false,
          initialMessages: en
            ? ["Hi 👋", "I'm WARD, the AI assistant for Hassn Editor.\nHow can I help you today?"]
            : ["مرحبًا 👋", "أنا WARD، المساعد الذكي لـ Hassn Editor.\nكيف يمكنني مساعدتك اليوم؟"],
          i18n: {
            en: {
              title: "WARD",
              subtitle: "AI Assistant by Hassn Editor",
              footer: "",
              getStarted: en ? "Start a conversation" : "ابدأ محادثة",
              inputPlaceholder: en ? "Write your message…" : "اكتب رسالتك…",
              closeButtonTooltip: en ? "Close WARD" : "إغلاق WARD",
            },
          },
        });

        appRef.current = app as EmbeddedChatApp;
        mountedLanguageRef.current = language;
        setLoadState("ready");
        window.setTimeout(() => {
          document.querySelector<HTMLTextAreaElement>("#ward-chat-embed textarea")?.focus();
        }, 120);
      } catch {
        if (!cancelled) {
          setLoadState("idle");
          setOfflineCause("availability");
          setConnectionState("offline");
        }
      } finally {
        initializingRef.current = false;
      }
    }

    void initializeWard();
    return () => {
      cancelled = true;
    };
  }, [connectionState, en, language, open, retryCount]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(
    () => () => {
      appRef.current?.unmount();
      appRef.current = null;
    },
    [],
  );

  const offlineMessage =
    offlineCause === "message"
      ? en
        ? "Sorry, WARD can't be reached right now. Please try again shortly or contact Hassn directly on WhatsApp."
        : "عذرًا، تعذر الاتصال بـ WARD حاليًا. يمكنك المحاولة بعد قليل أو التواصل مباشرة مع Hassn عبر واتساب."
      : en
        ? "WARD is temporarily unavailable. You can contact Hassn directly on WhatsApp and we'll help you as soon as possible."
        : "WARD غير متاح مؤقتًا. يمكنك التواصل مباشرة مع Hassn عبر واتساب وسنساعدك في أقرب وقت.";

  const offline = connectionState === "offline";
  const checking = connectionState === "unknown" || connectionState === "checking";

  return (
    <aside
      id="ward-chat-root"
      dir={en ? "ltr" : "rtl"}
      data-open={open ? "true" : "false"}
      data-connection={connectionState}
    >
      <section
        ref={panelRef}
        id="ward-chat-panel"
        className="ward-chat__panel"
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        aria-labelledby="ward-chat-title"
      >
        <header className="ward-chat__header">
          <span className="ward-chat__mark" aria-hidden="true">W</span>
          <span className="ward-chat__identity">
            <strong id="ward-chat-title">WARD</strong>
            <small>AI Assistant by Hassn Editor</small>
          </span>
          <button
            className="ward-chat__close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label={en ? "Close WARD chat" : "إغلاق محادثة WARD"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        <div id="ward-chat-embed" className="ward-chat__embed" />

        {(checking || (loadState === "loading" && !offline)) && (
          <div className="ward-chat__state" role="status" aria-live="polite">
            <span className="ward-chat__typing" aria-hidden="true"><i /><i /><i /></span>
            <p>
              {checking
                ? en
                  ? "Checking WARD connection…"
                  : "جارٍ التحقق من اتصال WARD…"
                : en
                  ? "Starting WARD…"
                  : "جارٍ تشغيل WARD…"}
            </p>
          </div>
        )}

        {offline && (
          <div className="ward-chat__offline" role="alert" aria-live="assertive">
            <span className="ward-chat__offline-indicator" aria-hidden="true"><i /></span>
            <strong>{en ? "WARD is temporarily offline" : "WARD غير متاح مؤقتًا"}</strong>
            <p>{offlineMessage}</p>
            <div className="ward-chat__offline-actions">
              <a
                href={WARD_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={en ? "Contact Hassn on WhatsApp" : "تواصل مع Hassn عبر واتساب"}
              >
                {en ? "Contact via WhatsApp" : "تواصل عبر واتساب"}
                <span aria-hidden="true">↗</span>
              </a>
              <button type="button" onClick={() => void probeWard(true)}>
                {en ? "Try again" : "إعادة المحاولة"}
              </button>
            </div>
          </div>
        )}
      </section>

      <button
        className="ward-chat__launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="ward-chat-panel"
        aria-label={
          open
            ? en
              ? "Minimize WARD chat"
              : "تصغير محادثة WARD"
            : offline
              ? en
                ? "Open WARD contact options"
                : "فتح خيارات التواصل مع WARD"
              : en
                ? "Chat with WARD"
                : "تحدث مع WARD"
        }
      >
        <span className="ward-chat__launcher-icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
          ) : (
            <Image
              className="ward-chat__ai-icon-image"
              src="/ward-ai-icon.webp"
              alt=""
              width={48}
              height={48}
              sizes="48px"
              unoptimized
              draggable={false}
            />
          )}
          <i className="ward-chat__status-dot" />
        </span>
        <span className="ward-chat__launcher-copy">
          <strong>WARD</strong>
          <small>
            {offline
              ? en
                ? "Temporarily offline"
                : "غير متاح مؤقتًا"
              : en
                ? "AI Assistant"
                : "المساعد الذكي"}
          </small>
        </span>
      </button>
    </aside>
  );
}
