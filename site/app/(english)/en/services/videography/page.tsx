import ServicePage, { getServiceMetadata } from "../../../../(arabic)/services/ServicePage";

export const metadata = getServiceMetadata("videography", "en");

export default function Page() {
  return <ServicePage slug="videography" language="en" />;
}
