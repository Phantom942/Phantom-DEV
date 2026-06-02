import Image from "next/image";

type ProjectMockupImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/** Aperçu projet — WebP prioritaire, PNG fallback (export statique, images non optimisées). */
export function ProjectMockupImage({
  src,
  alt,
  priority = false,
  className = "",
}: ProjectMockupImageProps) {
  const webpSrc = src.replace(/\.png$/i, ".webp");

  return (
    <picture className="absolute inset-0 block">
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        priority={priority}
        className={className}
      />
    </picture>
  );
}
