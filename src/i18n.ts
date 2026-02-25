export const locales = ["fr", "en-GB", "en-US"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  "en-GB": "English (UK)",
  "en-US": "English (US)",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  "en-GB": "🇬🇧",
  "en-US": "🇺🇸",
};

export const localePaths: Record<Locale, string> = {
  fr: "/",
  "en-GB": "/en-gb",
  "en-US": "/en-us",
};

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en-gb")) return "en-GB";
  if (pathname.startsWith("/en-us")) return "en-US";
  return "fr";
}
