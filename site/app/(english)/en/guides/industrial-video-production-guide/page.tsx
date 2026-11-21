import GuidePage, { getGuideMetadata } from "../../../../GuidePage";

const slug = "industrial-video-production-guide";

export const metadata = getGuideMetadata(slug, "en");

export default function Page() {
  return <GuidePage slug={slug} language="en" />;
}
