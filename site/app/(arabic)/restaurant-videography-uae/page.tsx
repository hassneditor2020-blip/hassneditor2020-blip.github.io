import LocalLandingPage, { getLocalLandingMetadata } from "../../LocalLandingPage";

export const metadata = getLocalLandingMetadata("restaurant-videography-uae", "ar");

export default function RestaurantVideographyUaePage() {
  return <LocalLandingPage slug="restaurant-videography-uae" language="ar" />;
}
