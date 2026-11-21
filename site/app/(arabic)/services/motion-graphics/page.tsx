import ServicePage, { getServiceMetadata } from "../ServicePage";
export const metadata = getServiceMetadata("motion-graphics", "ar");
export default function Page() { return <ServicePage slug="motion-graphics" />; }
