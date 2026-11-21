import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";

export const metadata = getServiceMetadata("web-app-design", "en");

export default function Page() {
  return <ServicePage slug="web-app-design" language="en" />;
}
