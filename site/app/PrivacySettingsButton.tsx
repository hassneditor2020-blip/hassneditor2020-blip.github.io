"use client";

import { PRIVACY_PREFERENCES_EVENT } from "./privacyPreferences";

export default function PrivacySettingsButton({ label }: { label: string }) {
  return (
    <button
      className="footer-privacy-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(PRIVACY_PREFERENCES_EVENT))}
    >
      {label}
    </button>
  );
}
