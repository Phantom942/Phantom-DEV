"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () =>
    import("@/components/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

const MouseGlow = dynamic(
  () =>
    import("@/components/MouseGlow").then((m) => ({ default: m.MouseGlow })),
  { ssr: false }
);

export function CursorAndGlow() {
  return (
    <>
      <CustomCursor />
      <MouseGlow />
    </>
  );
}
