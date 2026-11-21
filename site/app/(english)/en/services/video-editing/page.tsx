import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";
export const metadata = getServiceMetadata("video-editing", "en");
export default function Page() { return <ServicePage slug="video-editing" language="en" />; }
