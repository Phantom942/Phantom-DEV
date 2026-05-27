import { readFileSync, writeFileSync, mkdirSync } from "fs";

const lines = readFileSync("src/data/translations.ts", "utf8").split(/\r?\n/);

const slices = [
  { file: "fr.ts", exportName: "fr", start: 2, end: 531, strip: /^\s*fr:\s*/ },
  { file: "en-gb.ts", exportName: "enGb", start: 532, end: 1059, strip: /^\s*"en-GB":\s*/ },
  { file: "en-us.ts", exportName: "enUs", start: 1060, end: 1587, strip: /^\s*"en-US":\s*/ },
];

mkdirSync("src/data/translations", { recursive: true });

for (const { file, exportName, start, end, strip } of slices) {
  let block = lines.slice(start - 1, end).join("\n");
  block = block.replace(strip, "").trimEnd().replace(/,\s*$/, "");
  const out = `/** Traductions ${exportName} */\nexport const ${exportName} = ${block} as const;\n`;
  writeFileSync(`src/data/translations/${file}`, out);
  console.log("Wrote", file);
}

writeFileSync(
  "src/data/translations/index.ts",
  `import { fr } from "./fr";\nimport { enGb } from "./en-gb";\nimport { enUs } from "./en-us";\nimport type { Locale } from "@/i18n";\n\nexport type TranslationPack = typeof fr;\n\nexport const translations: Record<Locale, TranslationPack> = {\n  fr,\n  "en-GB": enGb,\n  "en-US": enUs,\n};\n\nexport type TranslationKey = keyof TranslationPack;\n`
);

console.log("Done.");
