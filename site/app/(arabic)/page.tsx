import type { Metadata } from "next";
import { metadata as siteMetadata } from "../siteMetadata";

// Keep the existing location and remote-service details in search and social previews.
const socialDescription = "تصوير فيديو وريلز في عجمان والشارقة ودبي بموعد مسبق، مع مونتاج وموشن غرافيك وإنتاج فيديو بالذكاء الاصطناعي عن بُعد.";

export const metadata: Metadata = {
  description: "حسن حسن، مصور فيديو وريلز ومونتير في عجمان. تصوير في عجمان والشارقة ودبي بموعد مسبق، ومونتاج وموشن غرافيك وإنتاج فيديو بالذكاء الاصطناعي عن بُعد.",
  openGraph: { ...siteMetadata.openGraph, description: socialDescription },
  twitter: { ...siteMetadata.twitter, description: socialDescription },
};

export { default } from "../HomePage";
