import { PhantomLogo } from "./PhantomLogo";

type PhantomBrandProps = {
  size?: "nav" | "hero";
  priority?: boolean;
  className?: string;
};

/** Logo capuche + wordmark NADER ASSEL DEV WEB (navbar et hero). */
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
      ? "font-tech text-lg font-semibold uppercase leading-tight tracking-[0.12em] text-white sm:text-2xl md:text-3xl md:tracking-[0.14em]"
      : "font-tech text-[0.65rem] font-semibold uppercase leading-none tracking-[0.08em] text-white sm:text-xs md:text-sm md:tracking-[0.1em]";

  return (
    <span
      className={`flex min-w-0 shrink-0 items-center gap-2.5 ${className}`}
    >
      <PhantomLogo priority={priority} className={logoClass} />
      <span className={textClass}>NADER ASSEL DEV WEB</span>
    </span>
  );
}
