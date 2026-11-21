import ContactPage, { getContactMetadata } from "../../../ContactPage";
export const metadata = getContactMetadata("en");
export default function Page() { return <ContactPage language="en" />; }
