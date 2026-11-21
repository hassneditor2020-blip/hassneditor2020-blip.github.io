import IndustriesPage, { getIndustriesMetadata } from "../../IndustriesPage";

export const metadata = getIndustriesMetadata("ar");

export default function Page() {
  return <IndustriesPage language="ar" />;
}
