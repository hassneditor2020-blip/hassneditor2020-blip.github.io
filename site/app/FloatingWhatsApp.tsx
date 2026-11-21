"use client";

import { trackEvent } from "./analyticsEvents";

export default function FloatingWhatsApp({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  const message = en
    ? "Hello Hassn, I visited your website and would like to discuss a video project."
    : "مرحبًا حسن، شاهدت أعمالك على الموقع وأرغب في مناقشة مشروع فيديو.";
  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/971505918238?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={en ? "Chat with Hassn on WhatsApp" : "تواصل مع حسن عبر واتساب"}
      title={en ? "Chat on WhatsApp" : "تواصل عبر واتساب"}
      data-contact-placement="floating"
      onClick={() => trackEvent("floating_whatsapp_click")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.95c0 2.1.55 4.15 1.6 5.95L.04 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.66 23.83 24 18.47 24 11.88c0-3.17-1.24-6.15-3.48-8.4zm-8.44 18.34h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.71.98.99-3.62-.23-.37a9.9 9.9 0 1 1 8.35 4.6zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" /></svg>
      <span>{en ? "Chat on WhatsApp" : "تواصل عبر واتساب"}</span>
    </a>
  );
}
