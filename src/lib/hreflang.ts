const BASE = "https://phantomdev.fr";

export function getHreflangAlternates(path: string): Record<string, string> {
  const frPath = path.replace(/^\/en-(gb|us)/, "") || "/";
  return {
    fr: `${BASE}${frPath}`,
    "en-GB": `${BASE}/en-gb${frPath === "/" ? "" : frPath}`,
    "en-US": `${BASE}/en-us${frPath === "/" ? "" : frPath}`,
    "x-default": `${BASE}${frPath}`,
  };
}
