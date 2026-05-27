import { writeFileSync } from "fs";

/** Hash 0–1, positions indépendantes (pas de bande diagonale). */
function hash(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const dots = [];
for (let i = 0; i < 400; i++) {
  const x = (hash(i + 1) * 100).toFixed(2);
  const y = (hash(i + 401) * 100).toFixed(2);
  const r = hash(i + 802) > 0.92 ? 1.4 : hash(i + 1203) > 0.55 ? 0.9 : 0.5;
  const o = (0.5 + hash(i + 1604) * 0.5).toFixed(2);
  const fill = hash(i + 2005) > 0.92 ? "#a5f3fc" : "#ffffff";
  dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${o}"/>`);
}

const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">${dots.join("")}</svg>`;
writeFileSync("public/images/stars-sky.svg", svg);
console.log("Generated", dots.length, "scattered static stars");
