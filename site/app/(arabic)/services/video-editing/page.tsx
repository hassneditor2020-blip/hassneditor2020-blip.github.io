import ServicePage, { getServiceMetadata } from "../ServicePage";
export const metadata = getServiceMetadata("video-editing", "ar");
export default function Page() { return <ServicePage slug="video-editing" />; }
