"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "./analyticsEvents";

export default function SiteHeader({ language, alternatePath }: { language: "ar" | "en"; alternatePath: string }) {
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const home = prefix || "/";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);
  const links = [
    { href: home, label: en ? "Home" : "الرئيسية" },
    { href: `${prefix}/works`, label: en ? "Work" : "أعمالي" },
    { href: `${prefix}/services/videography`, label: en ? "Videography" : "تصوير فيديو" },
    { href: `${prefix}/services`, label: en ? "Services" : "خدماتي" },
    { href: `${prefix}/about-hassn-editor`, label: en ? "About me" : "نبذة عني" },
    { href: `${prefix}/contact`, label: en ? "Contact" : "تواصل" },
  ];
  return <header className="site-header unified-header">
    <Link prefetch={false} className="brand" href={home} aria-label={en ? "HASSN EDITOR home" : "الرئيسية — HASSN EDITOR"}>
      <span className="brand-mark"><img src="/hassn-logo-small.webp" alt="" width="46" height="36" /></span><span>HASSN EDITOR</span>
    </Link>
    <nav ref={navigationRef} id="main-navigation" className={`site-nav ${open ? "open" : ""}`} aria-label={en ? "Main navigation" : "التنقل الرئيسي"} dir={en ? "ltr" : "rtl"}>
      {links.map(({ href, label }) => <Link prefetch={false} key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => { setOpen(false); trackEvent("navigation_click", { destination: href, page_path: pathname }); }}>{label}</Link>)}
    </nav>
    <div className="header-tools">
      <a className="language-toggle" href={alternatePath} hrefLang={en ? "ar" : "en"} aria-label={en ? "Switch to Arabic" : "التبديل إلى الإنجليزية"} onClick={() => trackEvent("language_switch", { language: en ? "ar" : "en", page_path: pathname })}>{en ? "عربي" : "EN"}</a>
      <button ref={menuButtonRef} className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? (en ? "Close menu" : "إغلاق القائمة") : (en ? "Open menu" : "فتح القائمة")} onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? "×" : "☰"}</span>{en ? "Menu" : "القائمة"}</button>
    </div>
  </header>;
}
