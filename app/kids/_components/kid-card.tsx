import Link from "next/link";
import type { MockKid } from "@/lib/mock/kids";
import { Avatar } from "@/app/_components/avatar";
import { KidChip } from "@/app/_components/kid-chip";

interface KidCardProps {
  kid: MockKid;
}

export function KidCard({ kid }: KidCardProps) {
  return (
    <Link
      href={`/kids/${kid.id}`}
      className="kid"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        minWidth: 0,
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: "18px",
        padding: "16px",
        boxShadow: "0 4px 14px -12px rgba(120,90,60,.5)",
      }}
    >
      <Avatar
        size={48}
        bg={kid.avatarBg}
        fg={kid.avatarFg}
        initial={kid.initial}
        name={kid.name}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            fontSize: "16px",
            color: "#3F362E",
          }}
        >
          {kid.name}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#A89A8B",
            marginTop: "2px",
          }}
        >
          {kid.age} · {kid.parentsCountText}
        </div>
      </div>
      {kid.chip ? (
        <KidChip chip={kid.chip} />
      ) : (
        <svg
          style={{ flex: "none" }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}
