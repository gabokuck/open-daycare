"use client";

import { useState } from "react";
import { MOCK_KIDS } from "@/lib/mock/kids";
import { KidCard } from "./kid-card";

export function KidsGrid() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? MOCK_KIDS.filter((kid) => kid.name.toLowerCase().includes(normalized))
    : MOCK_KIDS;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
          background: "#FFFDF9",
          border: "1px solid #ECE0D0",
          borderRadius: "14px",
          padding: "12px 16px",
          marginBottom: "22px",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B0A290"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar niño…"
          aria-label="Buscar niño"
          style={{
            flex: 1,
            border: "none",
            background: "none",
            fontSize: "15px",
            color: "#3F362E",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "14px",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((kid) => <KidCard key={kid.id} kid={kid} />)
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 16px",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "16px",
              color: "#A89A8B",
            }}
          >
            Ningún niño coincide
          </div>
        )}
      </div>
    </>
  );
}
