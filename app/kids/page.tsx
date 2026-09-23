import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/app/_components/app-shell";
import { KidsGrid } from "./_components/kids-grid";

export const metadata: Metadata = {
  title: "OpenDayCare · Kids",
};

export default function KidsPage() {
  return (
    <AppShell contentMaxWidth={880}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "12.5px",
              fontWeight: 800,
              letterSpacing: "0.8px",
              color: "#D9583C",
              marginBottom: "4px",
            }}
          >
            GESTIÓN
          </div>
          <h1
            style={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "30px",
              margin: 0,
              color: "#3F362E",
            }}
          >
            Niños
          </h1>
        </div>
        <Link
          href="/kids/new"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 18px",
            borderRadius: "14px",
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "14.5px",
            boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
            flex: "none",
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Agregar niño
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "12.5px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: "#3F362E",
          }}
        >
          SALA SOLES
        </span>
        <span style={{ fontSize: "13px", color: "#A89A8B" }}>8 niños</span>
        <span
          style={{
            flex: 1,
            height: "1px",
            background: "#E7DAC8",
          }}
        />
      </div>

      <KidsGrid />
    </AppShell>
  );
}
