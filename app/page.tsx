import Link from "next/link";
import { CURRENT_USER, MOCK_POSTS } from "@/lib/mock/feed";
import { AppShell } from "./_components/app-shell";
import { Avatar } from "./_components/avatar";
import { PostCard } from "./_components/post-card";

export default function Home() {
  return (
    <AppShell>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "12.5px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: "#D9583C",
            marginBottom: "4px",
          }}
        >
          GUARDERÍA · SALA SOLES
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
          Buenas, Caro
        </h1>
        <p
          style={{
            margin: "5px 0 0",
            color: "#94887B",
            fontSize: "14.5px",
          }}
        >
          12 niños · martes 17 jun
        </p>
      </div>

      <Link
        href="/crear-publicacion"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          background: "#FFFDF9",
          border: "1px solid #ECE0D0",
          borderRadius: "18px",
          padding: "14px 18px",
          marginBottom: "24px",
          boxShadow: "0 4px 14px -10px rgba(120,90,60,.4)",
        }}
      >
        <Avatar
          size={40}
          bg="#F2937A"
          fg="#fff"
          initial={CURRENT_USER.initial}
          name={CURRENT_USER.name}
        />
        <span
          style={{
            flex: 1,
            color: "#A89A8B",
            fontSize: "15px",
          }}
        >
          Compartí un momento…
        </span>
        <span
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "#FBE3D8",
            color: "#E0654A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </span>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "12.5px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: "#8A7C6D",
          }}
        >
          PUBLICADO HOY
        </span>
        <span
          style={{
            flex: 1,
            height: "1px",
            background: "#E7DAC8",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AppShell>
  );
}
