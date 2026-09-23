import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MOCK_KIDS,
  PARENT_STATUS_LABELS,
  type MockParent,
} from "@/lib/mock/kids";
import { AppShell } from "@/app/_components/app-shell";
import { Avatar } from "@/app/_components/avatar";

interface KidProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: KidProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const kid = MOCK_KIDS.find((k) => k.id === id);
  return { title: kid ? `OpenDayCare · ${kid.name}` : "OpenDayCare · Kids" };
}

export default async function KidProfilePage({ params }: KidProfilePageProps) {
  const { id } = await params;
  const kid = MOCK_KIDS.find((k) => k.id === id);
  if (!kid) notFound();

  return (
    <AppShell contentMaxWidth={820}>
      <a
        href="/kids"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          color: "#94887B",
          fontWeight: 700,
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </a>

      <div
        style={{
          display: "flex",
          gap: "26px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <Avatar
              size={84}
              bg={kid.avatarBg}
              fg={kid.avatarFg}
              initial={kid.initial}
              name={kid.name}
            />
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  fontSize: "28px",
                  margin: 0,
                  color: "#3F362E",
                  lineHeight: 1.15,
                }}
              >
                {kid.name}
              </h1>
              <p
                style={{
                  margin: "3px 0 0",
                  color: "#94887B",
                  fontSize: "15px",
                }}
              >
                {kid.age} · Sala Soles
              </p>
            </div>
            <a
              href={`/kids/${kid.id}/edit`}
              style={{
                border: "1.5px solid #ECE0D0",
                background: "#FFFDF9",
                color: "#6E6359",
                fontWeight: 700,
                fontSize: "14px",
                padding: "9px 16px",
                borderRadius: "12px",
                flex: "none",
              }}
            >
              Editar
            </a>
          </div>

          {kid.allergyText && (
            <div
              style={{
                display: "flex",
                gap: "14px",
                background: "#FBDAD6",
                borderRadius: "16px",
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "#F4A8A0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-fredoka)",
                    fontWeight: 800,
                    color: "#C5413A",
                    fontSize: "15px",
                    marginBottom: "2px",
                  }}
                >
                  Alergias y notas
                </div>
                <div
                  style={{
                    color: "#B25249",
                    fontSize: "14.5px",
                    lineHeight: 1.5,
                  }}
                >
                  {kid.allergyText}
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              background: "#FFFDF9",
              border: "1px solid #ECE0D0",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 18px",
                borderBottom: "1px solid #F0E6D8",
              }}
            >
              <span style={{ color: "#94887B", fontSize: "14.5px" }}>
                Fecha de nacimiento
              </span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#3F362E",
                  fontSize: "14.5px",
                }}
              >
                {kid.birthDate}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 18px",
                borderBottom: "1px solid #F0E6D8",
              }}
            >
              <span style={{ color: "#94887B", fontSize: "14.5px" }}>
                Sala
              </span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#3F362E",
                  fontSize: "14.5px",
                }}
              >
                Soles
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 18px",
              }}
            >
              <span style={{ color: "#94887B", fontSize: "14.5px" }}>
                Ingreso
              </span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#3F362E",
                  fontSize: "14.5px",
                }}
              >
                {kid.ingreso}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "300px",
            flex: "none",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <a
            href={`/kids/${kid.id}/day-summary`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              width: "100%",
              padding: "13px",
              borderRadius: "14px",
              background: "#3F362E",
              color: "#fff",
              fontWeight: 800,
              fontSize: "15px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Resumen del día
          </a>

          <div
            style={{
              background: "#FFFDF9",
              border: "1px solid #ECE0D0",
              borderRadius: "16px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                color: "#8A7C6D",
                marginBottom: "14px",
              }}
            >
              PADRES VINCULADOS
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {kid.parents.map((parent) => (
                <ParentRow key={parent.initial + parent.name} parent={parent} />
              ))}
              <a
                href={`/kids/${kid.id}/parents/new`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0 0",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1.5px dashed #D8CBBA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#B0A290",
                    flex: "none",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "14.5px",
                    color: "#C5503A",
                  }}
                >
                  Vincular otro padre
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const PARENT_STATUS_COLORS: Record<
  MockParent["status"],
  { bg: string; fg: string }
> = {
  active: { bg: "#CFEBD8", fg: "#3E9B6C" },
  pending: { bg: "#F7E7A6", fg: "#9A7B1E" },
};

function ParentRow({ parent }: { parent: MockParent }) {
  const { bg, fg } = PARENT_STATUS_COLORS[parent.status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar
        size={40}
        bg={parent.avatarBg}
        fg={parent.avatarFg}
        initial={parent.initial}
        name={parent.name}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: "14.5px",
            color: "#3F362E",
          }}
        >
          {parent.name}
        </div>
        <div
          style={{
            fontSize: "12.5px",
            color: "#A89A8B",
            marginTop: "1px",
          }}
        >
          {parent.role}
        </div>
      </div>
      <span
        style={{
          flex: "none",
          fontSize: "10.5px",
          fontWeight: 800,
          padding: "4px 9px",
          borderRadius: "999px",
          backgroundColor: bg,
          color: fg,
        }}
      >
        {PARENT_STATUS_LABELS[parent.status]}
      </span>
    </div>
  );
}
