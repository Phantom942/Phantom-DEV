import { STATIC_STARS } from "@/data/static-stars";

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
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
