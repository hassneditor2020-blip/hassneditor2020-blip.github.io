import LocalLandingPage, { getLocalLandingMetadata } from "../../../LocalLandingPage";

export const metadata = getLocalLandingMetadata("restaurant-videography-uae", "en");

export default function EnglishRestaurantVideographyUaePage() {
  return <LocalLandingPage slug="restaurant-videography-uae" language="en" />;
}
