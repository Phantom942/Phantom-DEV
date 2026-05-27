import { STATIC_STARS } from "@/data/static-stars";

/** Déterministe — décale durée / délai du scintillement par étoile. */
function starHash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Étoiles fixes — points DOM (toujours visibles, pas de SVG étiré). */
export function StaticStarField() {
  return (
    <div className="static-stars-field" aria-hidden>
      {STATIC_STARS.map((star, i) => (
        <span
          key={i}
          className={star.glow ? "static-star static-star--glow" : "static-star"}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            ["--star-opacity" as string]: star.opacity,
            animationDuration: `${2 + starHash(i) * 2.5}s`,
            animationDelay: `${starHash(i + 400) * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
