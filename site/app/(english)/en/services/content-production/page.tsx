import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";
export const metadata = getServiceMetadata("content-production", "en");
export default function Page() { return <ServicePage slug="content-production" language="en" />; }
