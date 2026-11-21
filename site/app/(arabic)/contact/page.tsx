import ContactPage, { getContactMetadata } from "../../ContactPage";
export const metadata = getContactMetadata("ar");
export default function Page() { return <ContactPage language="ar" />; }
