import Image from "next/image";

type PhantomLogoProps = {
  className?: string;
  priority?: boolean;
};

/** Logo Phantom officiel (capuche néon cyan) — WebP prioritaire, PNG fallback. */
export function PhantomLogo({
  className = "h-9 w-9 md:h-10 md:w-10",
  priority = false,
}: PhantomLogoProps) {
  return (
    <picture>
      <source srcSet="/images/phantom-logo.webp" type="image/webp" />
      <Image
        src="/images/phantom-logo.png"
        alt=""
        width={80}
        height={80}
        priority={priority}
        sizes="(max-width: 768px) 48px, 64px"
        className={`shrink-0 object-contain ${className}`}
        aria-hidden
      />
    </picture>
  );
}
