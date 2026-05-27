import { PhantomLogo } from "./PhantomLogo";

type PhantomBrandProps = {
  size?: "nav" | "hero";
  priority?: boolean;
  className?: string;
};

/** Logo capuche + wordmark PhantomDev (navbar et hero). */
export function PhantomBrand({
  size = "nav",
  priority = false,
  className = "",
}: PhantomBrandProps) {
  const logoClass =
    size === "hero"
      ? "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
      : undefined;
  const textClass =
    size === "hero"
      ? "font-tech text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-3xl md:text-4xl md:tracking-[0.24em]"
      : "font-tech truncate text-xs font-semibold uppercase tracking-[0.2em] text-white md:text-sm md:tracking-[0.24em]";

  return (
    <span
      className={`flex min-w-0 shrink-0 items-center gap-2.5 overflow-hidden ${className}`}
    >
      <PhantomLogo priority={priority} className={logoClass} />
      <span className={textClass}>PhantomDev</span>
    </span>
  );
}
