"use client";

import { useEffect, useRef, useState } from "react";

const SMOOTHING = 0.14;

export function CustomCursor() {
  const [shouldRender, setShouldRender] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    queueMicrotask(() => setShouldRender(true));
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      elRef.current?.style.setProperty("opacity", "1");
    };

    const handleMouseLeave = () => {
      elRef.current?.style.setProperty("opacity", "0");
    };

    const animate = () => {
      const el = elRef.current;
      const { x: tx, y: ty } = targetRef.current;
      const { x: cx, y: cy } = cursorRef.current;
      const nx = cx + (tx - cx) * SMOOTHING;
      const ny = cy + (ty - cy) * SMOOTHING;
      cursorRef.current = { x: nx, y: ny };
      if (el) {
        el.style.transform = `translate(${nx}px, ${ny}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200"
      aria-hidden
      style={{ willChange: "transform" }}
    >
      <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5f5f0]/90 bg-transparent backdrop-blur-[1px]" />
      <div className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f5f0]" />
    </div>
  );
}
