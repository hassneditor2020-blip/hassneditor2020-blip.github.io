import ServicePage, { getServiceMetadata } from "../ServicePage";

export const metadata = getServiceMetadata("videography", "ar");

export default function Page() {
  return <ServicePage slug="videography" />;
}
