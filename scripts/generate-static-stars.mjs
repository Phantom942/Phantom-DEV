import { writeFileSync } from "fs";

function hash(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.round(hash(i + 1) * 10000) / 100,
    y: Math.round(hash(i + 500) * 10000) / 100,
    size: hash(i + 900) > 0.9 ? 2.5 : hash(i + 1300) > 0.6 ? 1.75 : 1.25,
    opacity: Math.round((0.55 + hash(i + 1700) * 0.45) * 100) / 100,
    glow: hash(i + 2100) > 0.82,
  });
}

const out = `/** Étoiles fixes — généré par scripts/generate-static-stars.mjs */\nexport const STATIC_STARS = ${JSON.stringify(stars, null, 2)} as const;\n`;
writeFileSync("src/data/static-stars.ts", out);
console.log("Wrote", stars.length, "stars to src/data/static-stars.ts");
