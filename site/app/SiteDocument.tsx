import { preload } from "react-dom";
const arabicBodyFont = "/site-fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2";
const englishBodyFont = "/site-fonts/space-grotesk-latin-400-normal.woff2";
const arabicIntroFont = "/site-fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2";
const englishIntroFont = "/site-fonts/space-grotesk-latin-500-normal.woff2";
const arabicHeadingFont = "/site-fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2";
const englishHeadingFont = "/site-fonts/space-grotesk-latin-700-normal.woff2";
import "./fonts.css";
import "./globals.css";
import "./site-refinements.css";
import "./kokab-fodool.css";
import "./portfolio-refresh.css";
import "./watch-pages.css";
import "./search-growth.css";
import VideoViewerProvider from "./VideoViewer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import "./ward-chat.css";
import CookieConsent from "./CookieConsent";
import AnalyticsTracker from "./AnalyticsTracker";
import { googleProfileUrl, filmingAreas } from "./ServiceArea";
import WardChat from "./WardChat";

const officialProfiles = [
  "https://www.instagram.com/hassn.editor",
  "https://youtube.com/@hassn-editor",
  "https://www.behance.net/hassneditor",
  "https://www.linkedin.com/in/hassn-editor/",
  "https://www.facebook.com/p/Hassn-Hassn-61587617576359/",
  googleProfileUrl,
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://hassneditor.com/#business",
      name: "HASSN EDITOR",
      url: "https://hassneditor.com",
      image: "https://hassneditor.com/hassn-editor-showreel-cover.jpg",
      logo: "https://hassneditor.com/hassn-logo.png",
      description: "Hassn Editor provides on-location videography and Reels production in Ajman, Sharjah and Dubai by appointment, plus remote video editing, motion graphics and AI video production. Website and app design is available as a complementary digital service.",
      telephone: "+971505918238",
      email: "hassneditor2020@gmail.com",
      areaServed: [
        { "@type": "City", name: "Ajman" },
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Ajman", addressRegion: "Ajman", addressCountry: "AE" },
      sameAs: officialProfiles,
      founder: { "@id": "https://hassneditor.com/#hassn-editor" },
      availableLanguage: ["Arabic", "English"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971505918238",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        areaServed: "AE",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Video production services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Professional Videography", areaServed: filmingAreas.map((name) => ({ "@type": "City", name })) } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Editing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion Graphics" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Video Production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Cartoon Character Video Production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Restaurant and Event Video Production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Content Production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website & App Design" } },
        ],
      },
      knowsAbout: ["Professional Videography", "Videography in the UAE", "Video Editing", "Motion Graphics", "Content Creation", "AI Video", "AI Cartoon Characters", "Video Production", "Restaurant Videography", "Food Videography", "Event Videography", "Website Design", "Web Applications", "Mobile App Design"],
    },
    {
      "@type": "Person",
      "@id": "https://hassneditor.com/#hassn-editor",
      name: "Hassn Hassn",
      alternateName: ["HASSN EDITOR", "Hassn Editor", "حسن إيديتور", "حسن حسن"],
      url: "https://hassneditor.com/about-hassn-editor",
      jobTitle: ["Video Editor", "Motion Designer", "Videographer", "Content Creator", "Web & App Designer"],
      homeLocation: { "@type": "City", name: "Ajman" },
      knowsLanguage: ["Arabic", "English"],
      knowsAbout: ["Video Editing", "Motion Graphics", "Videography", "Dental Motion Graphics", "AI Video Production", "AI Cartoon Character Video Production", "Restaurant Videography", "Event Videography", "Website Design", "Web Applications", "Mobile App Design"],
      sameAs: officialProfiles,
      worksFor: { "@id": "https://hassneditor.com/#business" },
      mainEntityOfPage: { "@id": "https://hassneditor.com/about-hassn-editor#profilepage" },
    },
    {
      "@type": "WebSite",
      "@id": "https://hassneditor.com/#website",
      url: "https://hassneditor.com",
      name: "HASSN EDITOR",
      alternateName: "Hassn Editor Portfolio",
      inLanguage: ["ar", "en"],
      publisher: { "@id": "https://hassneditor.com/#business" },
    },
  ],
};

export default function RootLayout({
  children,
  language,
}: Readonly<{
  children: React.ReactNode;
  language: "ar" | "en";
}>) {
  const visibleFonts = language === "en"
    ? [englishBodyFont, englishHeadingFont, englishIntroFont]
    : [arabicBodyFont, arabicHeadingFont, arabicIntroFont];
  for (const font of visibleFonts) {
    preload(font, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
  return (
    <html lang={language} dir={language === "en" ? "ltr" : "rtl"}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CookieConsent language={language} />
        <VideoViewerProvider>{children}</VideoViewerProvider>
        <FloatingWhatsApp language={language} />
        <WardChat />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
