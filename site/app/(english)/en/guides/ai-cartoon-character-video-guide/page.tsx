import GuidePage, { getGuideMetadata } from "../../../../GuidePage";

const slug = "ai-cartoon-character-video-guide";

export const metadata = getGuideMetadata(slug, "en");

export default function Page() {
  return <GuidePage slug={slug} language="en" />;
}
