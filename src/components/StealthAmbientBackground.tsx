import { StaticStarField } from "./StaticStarField";
import { StealthShootingStarsLazy } from "./StealthShootingStarsLazy";

/**
 * Fond Stealth — ciel étoilé fixe + filantes (chargées après hydratation), lueurs Phantom.
 */
export function StealthAmbientBackground() {
  return (
    <div
      className="stealth-ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="stealth-sky-base absolute inset-0" />
      <StaticStarField />
      <StealthShootingStarsLazy />
      <div className="stealth-ambient-halo stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-horizon stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-vignette stealth-ambient-overlay absolute inset-0" />
      <div className="stealth-ambient-grid stealth-ambient-overlay absolute inset-0 opacity-[0.12]" />
      <div className="stealth-ambient-noise stealth-ambient-overlay absolute inset-0 opacity-[0.15]" />
    </div>
  );
}
