import GuidePage, { getGuideMetadata } from "../../../GuidePage";

const slug = "ai-cartoon-character-video-guide";

export const metadata = getGuideMetadata(slug, "ar");

export default function Page() {
  return <GuidePage slug={slug} language="ar" />;
}
