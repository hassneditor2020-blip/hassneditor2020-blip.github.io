import ServicePage, { getServiceMetadata } from "../ServicePage";
export const metadata = getServiceMetadata("ai-video", "ar");
export default function Page() { return <ServicePage slug="ai-video" />; }
