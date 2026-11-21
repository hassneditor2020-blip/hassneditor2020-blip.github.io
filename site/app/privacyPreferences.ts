export const PRIVACY_PREFERENCES_EVENT = "hassn-editor:open-privacy-preferences";
export const ANALYTICS_ENABLED_EVENT = "hassn-editor:analytics-enabled";
export const ANALYTICS_DISABLED_EVENT = "hassn-editor:analytics-disabled";

export const CONSENT_COOKIE_NAME = "hassn-editor-consent-v1";
export type ConsentChoice = { analytics: boolean; advertising: boolean };

export function parseConsentCookie(value?: string): ConsentChoice | null {
  if (!value || !/^[01]{2}$/.test(value)) return null;
  return { analytics: value[0] === "1", advertising: value[1] === "1" };
}
