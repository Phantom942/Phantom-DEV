import { ShootingStarsCodePen } from "./ShootingStarsCodePen";
import { StaticStarField } from "./StaticStarField";

/**
 * Fond Stealth — ciel étoilé fixe + filantes, puis lueurs Phantom (sans masquer les étoiles).
 */
export function StealthAmbientBackground() {
  return (
    <div
      className="stealth-ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="stealth-sky-base absolute inset-0" />
      <StaticStarField />
      <ShootingStarsCodePen />
      <div className="stealth-ambient-halo stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-horizon stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-vignette stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-grid stealth-ambient-overlay absolute inset-0 opacity-[0.12]" />
      <div className="stealth-ambient-noise stealth-ambient-overlay absolute inset-0 opacity-[0.15]" />
    </div>
  );
}
