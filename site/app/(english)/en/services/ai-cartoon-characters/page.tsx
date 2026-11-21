import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";

export const metadata = getServiceMetadata("ai-cartoon-characters", "en");

export default function Page() {
  return <ServicePage slug="ai-cartoon-characters" language="en" />;
}
