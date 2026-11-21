import ServicePage, { getServiceMetadata } from "../ServicePage";
export const metadata = getServiceMetadata("content-production", "ar");
export default function Page() { return <ServicePage slug="content-production" />; }
