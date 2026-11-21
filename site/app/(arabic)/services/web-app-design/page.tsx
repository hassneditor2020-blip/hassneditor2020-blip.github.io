import ServicePage, { getServiceMetadata } from "../ServicePage";

export const metadata = getServiceMetadata("web-app-design", "ar");

export default function Page() {
  return <ServicePage slug="web-app-design" />;
}
