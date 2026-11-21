import GuidePage, { getGuideMetadata } from "../../../../GuidePage";

const slug = "real-estate-video-marketing-guide";

export const metadata = getGuideMetadata(slug, "en");

export default function Page() {
  return <GuidePage slug={slug} language="en" />;
}
