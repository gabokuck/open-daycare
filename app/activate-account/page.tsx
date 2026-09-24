import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenDayCare · Activar cuenta",
};

export default function ActivateAccountPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FBF4EC",
        padding: "40px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "22px",
            boxShadow: "0 12px 26px -10px rgba(238,129,100,.65)",
          }}
        >
          <svg
            width="30"
            height="30"
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

        <h1
          style={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: 1.15,
            margin: "0 0 8px",
            color: "#3F362E",
          }}
        >
          Bienvenida a OpenDayCare
        </h1>
        <p
          style={{
            margin: "0 0 26px",
            color: "#94887B",
            fontSize: "15.5px",
            lineHeight: 1.55,
          }}
        >
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "#fff",
            border: "1.5px solid #EADFD0",
            borderRadius: "16px",
            padding: "14px 16px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#A9D9E8",
              color: "#1F7A93",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: "19px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: "13px", color: "#94887B" }}>
              Te invitaron a seguir a
            </div>
            <div
              style={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "17px",
                color: "#3F362E",
              }}
            >
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.7px",
            color: "#94887B",
            marginBottom: "8px",
          }}
        >
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          defaultValue="7K4P9"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: "18px",
            letterSpacing: "3px",
            fontWeight: 700,
            color: "#3F362E",
            marginBottom: "18px",
            fontFamily: "var(--font-fredoka)",
          }}
        />

        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.7px",
            color: "#94887B",
            marginBottom: "8px",
          }}
        >
          EMAIL
        </div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: "15px",
            color: "#3F362E",
            marginBottom: "18px",
            fontFamily: "var(--font-nunito)",
          }}
        />

        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.7px",
            color: "#94887B",
            marginBottom: "8px",
          }}
        >
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #F2A78E",
            background: "#fff",
            fontSize: "15px",
            color: "#3F362E",
            marginBottom: "18px",
            fontFamily: "var(--font-nunito)",
          }}
        />

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            background: "#FBF1D6",
            borderRadius: "14px",
            padding: "14px 16px",
            marginBottom: "24px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              position: "relative",
              flex: "none",
              width: "24px",
              height: "24px",
              marginTop: "1px",
            }}
          >
            <input
              type="checkbox"
              defaultChecked
              aria-label="Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app."
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                margin: 0,
                cursor: "pointer",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "8px",
                background: "#5FB97E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#8A7234",
              lineHeight: 1.45,
            }}
          >
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
            de la app.
          </span>
        </label>

        <Link
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            padding: "15px",
            borderRadius: "15px",
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "16px",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </Link>

        <p
          style={{
            textAlign: "center",
            margin: "22px 0 0",
            color: "#94887B",
            fontSize: "14.5px",
          }}
        >
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" style={{ color: "#C5503A", fontWeight: 800 }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}