"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = elRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden max-md:hidden"
      aria-hidden
    >
      <div
        ref={elRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0.06) 35%, rgba(180, 140, 50, 0.04) 55%, transparent 70%)",
        }}
      />
    </div>
  );
}
