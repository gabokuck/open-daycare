import Link from "next/link";
import type { MockPost } from "@/lib/mock/feed";
import { Avatar } from "./avatar";
import { PostBadge } from "./post-badge";

interface PostCardProps {
  post: MockPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      style={{
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: "20px",
        padding: "20px 22px",
        boxShadow: "0 4px 16px -12px rgba(120,90,60,.5)",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <Avatar
          size={44}
          bg={post.child.avatarBg}
          fg={post.child.avatarFg}
          initial={post.child.initial}
          name={post.child.name}
          isGeneral={post.child.isGeneral}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "16.5px",
              color: "#3F362E",
            }}
          >
            {post.child.name}
          </div>
          <div
            style={{
              fontSize: "12.5px",
              color: "#A89A8B",
            }}
          >
            {post.publishedAt} · publicado por vos
          </div>
        </div>
        <PostBadge category={post.category} />
      </header>

      <div
        style={{
          fontSize: "12.5px",
          color: "#A89A8B",
          marginBottom: "10px",
        }}
      >
        {post.audience}
      </div>

      <p
        style={{
          fontSize: "15.5px",
          lineHeight: 1.55,
          color: "#4A4038",
          margin: 0,
        }}
      >
        {post.body}
      </p>

      {post.category === "activity" && post.photoCaption && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "14px",
            border: "1.5px dashed #DBCDBA",
            borderRadius: "16px",
            background: "#F4ECE1",
            height: "200px",
            color: "#B0A290",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span style={{ fontSize: "13.5px" }}>{post.photoCaption}</span>
        </div>
      )}

      <footer
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid #F0E6D8",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "#E0654A",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="#E0654A"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.reactions}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "#94887B",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comments}
        </span>
        <span style={{ flex: 1 }} />
        <Link
          href="/crear-publicacion"
          style={{
            color: "#C5503A",
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          Editar
        </Link>
      </footer>
    </article>
  );
}
