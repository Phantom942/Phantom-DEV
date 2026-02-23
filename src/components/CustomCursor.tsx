"use client";

import { useEffect, useState, useRef } from "react";

const SMOOTHING = 0.14;

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setShouldRender(true);
    mountedRef.current = true;
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      const { x: cx, y: cy } = cursorRef.current;

      const nx = cx + (tx - cx) * SMOOTHING;
      const ny = cy + (ty - cy) * SMOOTHING;

      cursorRef.current = { x: nx, y: ny };
      if (mountedRef.current) {
        setPosition({ x: nx, y: ny });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mountedRef.current = false;
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
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.25s ease-out",
      }}
    >
      <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5f5f0]/90 bg-transparent backdrop-blur-[1px]" />
      <div className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f5f0]" />
    </div>
  );
}
