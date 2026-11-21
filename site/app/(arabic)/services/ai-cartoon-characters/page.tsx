import ServicePage, { getServiceMetadata } from "../ServicePage";

export const metadata = getServiceMetadata("ai-cartoon-characters", "ar");

export default function Page() {
  return <ServicePage slug="ai-cartoon-characters" />;
}
