import SiteDocument from "../SiteDocument";

export { metadata } from "../siteMetadata";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument language="en">{children}</SiteDocument>;
}
