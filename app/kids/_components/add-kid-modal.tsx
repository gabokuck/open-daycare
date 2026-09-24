"use client";

import { useEffect, useRef, useState } from "react";

type AddKidModalProps = {
  onClose: () => void;
};

type FormState = {
  name: string;
  birthDate: string;
  allergies: string;
  medicalNotes: string;
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.7px",
  color: "#94887B",
  marginBottom: "8px",
} as const;

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "14px",
  border: "1.5px solid #EADFD0",
  background: "#fff",
  fontSize: "15px",
  color: "#3F362E",
  fontFamily: "inherit",
} as const;

export function AddKidModal({ onClose }: AddKidModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    birthDate: "",
    allergies: "",
    medicalNotes: "",
  });

  const firstInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    firstInputRef.current?.focus();
    return () => {
      triggerRef.current?.focus();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(63,54,46,.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-kid-modal-title"
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#FBF4EC",
          border: "1px solid #ECE0D0",
          borderRadius: "24px",
          boxShadow: "0 20px 50px -24px rgba(63,54,46,.35)",
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          style={{ display: "block" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 26px",
              borderBottom: "1px solid #ECE0D0",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "#94887B",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Cancelar
            </button>
            <span
              id="add-kid-modal-title"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "18px",
                color: "#3F362E",
              }}
            >
              Agregar niño
            </span>
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "#D9583C",
                fontWeight: 800,
                fontSize: "15px",
              }}
            >
              Guardar
            </button>
          </div>

          <div style={{ padding: "24px 26px" }}>
            <div style={labelStyle}>NOMBRE COMPLETO</div>
            <input
              ref={firstInputRef}
              value={form.name}
              onChange={(e) =>
                setForm((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="Ej. Martina López"
              style={{ ...inputStyle, marginBottom: "18px" }}
            />

            <div style={{ display: "flex", gap: "14px", marginBottom: "18px" }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>FECHA DE NACIMIENTO</div>
                <input
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, birthDate: e.target.value }))
                  }
                  placeholder="dd/mm/aaaa"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>SALA</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 16px",
                    borderRadius: "14px",
                    border: "1.5px solid #EADFD0",
                    background: "#fff",
                    fontSize: "15px",
                    color: "#3F362E",
                    fontWeight: 700,
                  }}
                >
                  <span>Soles</span>
                  <span style={{ flex: 1 }} />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B0A290"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={labelStyle}>ALERGIAS (ETIQUETAS)</div>
            <input
              value={form.allergies}
              onChange={(e) =>
                setForm((s) => ({ ...s, allergies: e.target.value }))
              }
              placeholder="Ej. Maní, Lactosa"
              style={{ ...inputStyle, marginBottom: "18px" }}
            />

            <div style={labelStyle}>NOTAS MÉDICAS</div>
            <textarea
              value={form.medicalNotes}
              onChange={(e) =>
                setForm((s) => ({ ...s, medicalNotes: e.target.value }))
              }
              placeholder="Indicaciones, medicación, contactos…"
              style={{
                ...inputStyle,
                minHeight: "90px",
                resize: "vertical",
                lineHeight: 1.5,
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
