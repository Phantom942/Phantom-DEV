type ClientFooterSignatureProps = {
  /** Classes optionnelles pour s’intégrer au footer du site client. */
  className?: string;
};

const PHANTOMDEV_URL = "https://phantomdev.fr/";

/**
 * Signature discrète pour le footer des sites clients (ex. REDK Motors).
 * Copier le composant tel quel ou l’importer dans le projet client.
 */
export function ClientFooterSignature({ className = "" }: ClientFooterSignatureProps) {
  return (
    <p
      className={`text-center text-[11px] font-normal leading-relaxed tracking-wide text-neutral-500 ${className}`.trim()}
    >
      Propulsé par{" "}
      <a
        href={PHANTOMDEV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 underline decoration-neutral-600/60 underline-offset-[3px] transition-colors hover:text-neutral-300 hover:decoration-neutral-400/80"
      >
        Phantom Dev
      </a>
      {" — Sites internet & Automatisation IA"}
    </p>
  );
}
