"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CURRENT_USER } from "@/lib/mock/feed";
import { Avatar } from "./avatar";

interface SidebarNavItemProps {
  href: string;
  label: string;
  active: boolean;
  icon: ReactNode;
}

function SidebarNavItem({ href, label, active, icon }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="flex items-center gap-3 rounded-xl"
      style={{
        padding: "11px 12px",
        background: active ? "#FBE3D8" : "transparent",
        color: active ? "#D9583C" : "#6E6359",
        fontWeight: active ? 800 : 600,
        fontSize: "14.5px",
      }}
    >
      <span className="flex h-[19px] w-[19px] items-center justify-center">
        {icon}
      </span>
      {label}
    </Link>
  );
}

const NAV_ITEMS: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/",
    label: "Feed",
    icon: (
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
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    href: "/ninos",
    label: "Niños",
    icon: (
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
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
      </svg>
    ),
  },
  {
    href: "/avisos",
    label: "Avisos",
    icon: (
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
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    href: "/mi-cuenta",
    label: "Mi cuenta",
    icon: (
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "248px",
        flex: "none",
        background: "#FFFDF9",
        borderRight: "1px solid #ECE0D0",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
          padding: "4px 8px 22px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "17px",
              color: "#3F362E",
              lineHeight: 1,
            }}
          >
            OpenDayCare
          </div>
          <div style={{ fontSize: "11.5px", color: "#A89A8B", marginTop: "2px" }}>
            Sala Soles
          </div>
        </div>
      </Link>

      <Link
        href="/crear-publicacion"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          padding: "12px",
          borderRadius: "14px",
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: "14.5px",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
          marginBottom: "18px",
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
        Nueva publicación
      </Link>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flex: 1,
        }}
      >
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isHome = href === "/";
          const active = isHome
            ? pathname === "/"
            : pathname === href || pathname?.startsWith(`${href}/`);

          return (
            <SidebarNavItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              active={active}
            />
          );
        })}
      </nav>

      <div
        style={{
          borderTop: "1px solid #ECE0D0",
          paddingTop: "14px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            padding: "6px 8px",
          }}
        >
          <Avatar
            size={38}
            bg="#F2937A"
            fg="#fff"
            initial={CURRENT_USER.initial}
            name={CURRENT_USER.name}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#3F362E",
                lineHeight: 1.15,
              }}
            >
              {CURRENT_USER.name}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#A89A8B",
              }}
            >
              {CURRENT_USER.role}
            </div>
          </div>
          <Link
            href="/login"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            style={{
              flex: "none",
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: "#F6ECDF",
              color: "#94887B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
