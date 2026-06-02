/**
 * Redimensionne les mockups (~800 px) et génère des WebP pour le carousel projets.
 * Usage : node scripts/optimize-mockups.mjs
 */
import { readdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const MOCKUP_DIR = "public/images/mockups";
const MAX_WIDTH = 800;

const files = (await readdir(MOCKUP_DIR)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const input = join(MOCKUP_DIR, file);
  const output = join(MOCKUP_DIR, file.replace(/\.png$/i, ".webp"));

  const info = await sharp(input)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);

  console.log(`${file} → ${file.replace(/\.png$/i, ".webp")} (${info.width}×${info.height}, ${info.size} o)`);
}

console.log(`\n${files.length} mockup(s) optimisé(s).`);
