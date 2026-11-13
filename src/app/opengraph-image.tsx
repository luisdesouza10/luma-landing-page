import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

// Uses the default next/og font: Satori can't read the project's woff2 variable fonts.
export const alt = "Luma — Practical courses that move you forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f9f8f3",
          color: "#171b2c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#3157f6" }} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>{siteName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Practical courses that move you forward.
          </div>
          <div style={{ fontSize: 30, color: "#656770", maxWidth: 860 }}>
            Taught by people who do the work every day.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ height: 12, width: 120, borderRadius: 999, background: "#3157f6" }} />
          <div style={{ height: 12, width: 60, borderRadius: 999, background: "#ff704d" }} />
          <div style={{ height: 12, width: 40, borderRadius: 999, background: "#ffee7e" }} />
        </div>
      </div>
    ),
    size,
  );
}
