import IndustriesPage, { getIndustriesMetadata } from "../../../IndustriesPage";

export const metadata = getIndustriesMetadata("en");

export default function Page() {
  return <IndustriesPage language="en" />;
}
