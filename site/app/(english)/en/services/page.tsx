import ServicesIndexPage, { getServicesIndexMetadata } from "../../../ServicesIndexPage";
export const metadata = getServicesIndexMetadata("en");
export default function Page() { return <ServicesIndexPage language="en" />; }
