/**
 * Lueur d'ambiance Stealth — cyan + or, couvre tout le site (fixed, derrière le contenu).
 */
export function StealthAmbientBackground() {
  return (
    <div
      className="stealth-ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="stealth-ambient-halo absolute inset-0" />
      <div className="stealth-ambient-horizon absolute inset-0" />
      <div className="stealth-ambient-vignette absolute inset-0" />
      <div className="stealth-ambient-grid absolute inset-0 opacity-[0.18]" />
      <div className="stealth-ambient-noise absolute inset-0 opacity-[0.22]" />
    </div>
  );
}
