import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";
export const metadata = getServiceMetadata("ai-video", "en");
export default function Page() { return <ServicePage slug="ai-video" language="en" />; }
