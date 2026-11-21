import GuidesIndexPage, { getGuidesMetadata } from "../../../GuidesIndexPage";
export const metadata = getGuidesMetadata(true);
export default function Page() { return <GuidesIndexPage language="en" />; }
