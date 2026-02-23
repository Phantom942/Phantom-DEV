import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PhantomDev — Création de sites web premium sur-mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 200,
              color: "#f5f5f0",
              letterSpacing: "0.15em",
              fontFamily: "Georgia, serif",
            }}
          >
            PHANTOMDEV
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "rgba(245, 245, 240, 0.9)",
              letterSpacing: "0.08em",
              maxWidth: 700,
              textAlign: "center",
            }}
          >
            Création de sites web premium sur-mesure
          </div>
          <div
            style={{
              marginTop: 32,
              padding: "12px 28px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              color: "#d4af37",
              fontSize: 18,
              letterSpacing: "0.15em",
            }}
          >
            Devis gratuit — phantomdev.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
