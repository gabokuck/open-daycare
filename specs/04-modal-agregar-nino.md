# SPEC 04 — Modal "Agregar niño" en `/kids`

> **Status:** Aprobado
> **Depends on:** SPEC 02
> **Date:** 2026-09-23
> **Objective:** Reemplazar el placeholder `/kids/new` con un modal cliente en `/kids` que reproduce `references/pantallas/agregar-nino.dc.html`, abierto al pulsar el CTA "Agregar niño" y cerrable únicamente mediante los botones Cancelar / Guardar.

## Scope

**In:**

- `app/kids/page.tsx` se convierte a `"use client"` y posee el estado `isOpen` del modal (un único `useState<boolean>`).
- Nuevo componente `app/kids/_components/add-kid-modal.tsx` que renderiza el overlay: backdrop fijo full-screen (`rgba(63,54,46,.45)`) con `z-index` alto, tarjeta centrada (`max-width: 520px`, `background: #FBF4EC`, `border: 1px solid #ECE0D0`, `border-radius: 24px`, `box-shadow: 0 20px 50px -24px rgba(63,54,46,.35)`) y `overflow: hidden`.
- Header de la tarjeta (en flex con `border-bottom: 1px solid #ECE0D0`, `padding: 20px 26px`): `<button>Cancelar</button>` izquierda (`color: #94887B, font-weight: 700, font-size: 15px`), `<span>Agregar niño</span>` centro (Fredoka 600 / 18px / `#3F362E`), `<button>Guardar</button>` derecha (`color: #D9583C, font-weight: 800, font-size: 15px`). Cancelar y Guardar cierran (`setIsOpen(false)`).
- Body (`padding: 24px 26px`) dentro de un `<form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>` que envuelve la tarjeta completa para que Enter dispare "Guardar":
  - Label `NOMBRE COMPLETO` + `<input>` placeholder `Ej. Martina López`.
  - Fila flex `gap: 14px` con dos campos: Label `FECHA DE NACIMIENTO` + `<input type="text">` placeholder `dd/mm/aaaa`; Label `SALA` + bloque display estilo input con valor literal `Soles` y chevron SVG (no es un `<select>` real, sólo display para fidelidad).
  - Label `ALERGIAS (ETIQUETAS)` + `<input>` placeholder `Ej. Maní, Lactosa`.
  - Label `NOTAS MÉDICAS` + `<textarea>` placeholder `Indicaciones, medicación, contactos…`, `min-height: 90px`, `resize: vertical`.
- Estilo de cada label: `font-size: 12px, font-weight: 800, letter-spacing: .7px, color: #94887B, margin-bottom: 8px`. Estilo de cada input/textarea: `width: 100%, padding: 13px 16px, border-radius: 14px, border: 1.5px solid #EADFD0, background: #fff, font-size: 15px, color: #3F362E, font-family: inherit`.
- El CTA `<Link href="/kids/new">Agregar niño</Link>` del header de `/kids` se reemplaza por `<button type="button" onClick={() => setIsOpen(true)}>` que conserva exactamente el aspecto (mismo SVG `+`, gradiente `linear-gradient(180deg,#F4977E,#EE8164)`, `border-radius: 14px`, `box-shadow: 0 8px 18px -8px rgba(238,129,100,.7)`, `padding: 11px 18px`, texto blanco `Agregar niño` 14.5px peso 800). El nuevo `<button>` reemplaza visualmente al `<a>` sin cambios de estilo.
- Focus management: al pasar `isOpen` de `false` a `true`, focus automático al primer input del modal vía `useEffect` + `useRef`. Al cerrar, devolver el foco al CTA "Agregar niño".
- Accesibilidad: `<div role="dialog" aria-modal="true" aria-labelledby="add-kid-modal-title">`. Los botones Cancelar y Guardar llevan `type="button"` (Cancelar) y `type="submit"` (Guardar); el submit del form dispara `setIsOpen(false)`. El `<span>` del título lleva `id="add-kid-modal-title"`.
- Eliminación de `app/kids/new/` entero (carpeta y `page.tsx`) — la ruta deja de existir.
- Placeholders paralelos de SPEC 02 (`app/kids/[id]/edit`, `app/kids/[id]/parents/new`, `app/kids/[id]/day-summary`) no se tocan.
- `lib/mock/kids.ts` no se modifica.
- `app/_components/` no recibe nuevos archivos. El modal es específico de `/kids` y vive dentro de su segmento.

**Out of scope (para futuros specs):**

- Persistencia, base de datos, server actions, route handlers.
- Validación de campos, mensajes de error, estados de loading, animación de entrada/salida.
- Cerrar con tecla `ESC` o click en el backdrop (decidido en Phase 2 — sólo Cancelar y Guardar cierran).
- Tag system real para alergias (el campo es input libre pese al label `(ETIQUETAS)`).
- Dropdown real para "Sala" (es un display estático con `Soles` literal; no hay otras salas en el spec).
- CRUD real de niños (crear/editar/borrar) y los placeholders `edit` / `parents/new` / `day-summary` siguen mostrando "Pantalla pendiente".
- Vincular padres real.
- Layout responsive / breakpoint mobile (los templates son desktop-fixed; el modal también).
- Modo dark.
- Tests automatizados (no hay runner en `package.json`; verificación visual con Playwright MCP).
- Las otras 13 plantillas de `references/pantallas/`.

## Data model

No se introduce nueva estructura de datos. `MOCK_KIDS` queda intacto. El estado del form vive localmente dentro del modal con `useState<{ name: string; birthDate: string; allergies: string; medicalNotes: string }>({ name: "", birthDate: "", allergies: "", medicalNotes: "" })` y **no se persiste en ningún lado** — Guardar descarta los valores y cierra. Si en un spec futuro se conecta a DB, sólo hay que cambiar el handler `onSubmit` del modal.

Decisión explícita: no se agrega `lib/mock/kids-add.ts` ni se modifica `lib/mock/kids.ts`. Mantener los inputs como estado efímero es coherente con el resto del repo (todo hardcodeado, sin persistencia) y evita filtraciones accidentales a otros specs.

## Implementation plan

1. **Convertir `app/kids/page.tsx` a client component.** Agregar `"use client"` arriba, importar `useState`. Dentro de `KidsPage`, `const [isOpen, setIsOpen] = useState(false)`. Cambiar el `<Link href="/kids/new">…</Link>` por `<button type="button" onClick={() => setIsOpen(true)}>…</button>` conservando todo el `style` y el SVG. El resto del layout (cabecera "GESTIÓN / Niños", separador "SALA SOLES · 8 niños", `<KidsGrid />`) queda igual. Al final del JSX, justo antes del cierre de `</AppShell>`, agregar `{isOpen && <AddKidModal onClose={() => setIsOpen(false)} />}`.
2. **Crear `app/kids/_components/add-kid-modal.tsx` como client component.** Estructura:
   - Props: `{ onClose: () => void }`.
   - Estado local: `const [form, setForm] = useState({ name: "", birthDate: "", allergies: "", medicalNotes: "" })`.
   - Refs: `const firstInputRef = useRef<HTMLInputElement>(null)`; `const triggerRef = useRef<HTMLElement | null>(null)` capturado antes de abrir (esto último puede resolverse pasando `triggerEl` desde `KidsPage` o con `document.activeElement` al abrir — se decide en la implementación).
   - `useEffect(() => { firstInputRef.current?.focus(); }, [])` para autofocus al montar.
   - `useEffect(() => { return () => { triggerRef.current?.focus(); } }, [])` para devolver foco al cerrar.
   - Render: `<div role="dialog" aria-modal="true" aria-labelledby="add-kid-modal-title">` con backdrop absoluto y la tarjeta centrada que contiene el `<form onSubmit={(e) => { e.preventDefault(); onClose(); }}>`. Header con los tres elementos (Cancelar / título / Guardar) usando flex `space-between` y `border-bottom`. Body con los 4 campos siguiendo exactamente el orden, labels, placeholders y estilos del template.
   - El campo "Sala" se renderiza como un `<div>` styled idéntico al input (`border: 1.5px solid #EADFD0, border-radius: 14px, padding: 13px 16px, background: #fff, font-size: 15px, color: #3F362E, font-weight: 700`) con `<span>Soles</span>` y el SVG chevron del template.
   - Inputs controlados: `value={form.name}` `onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}` (y análogo para los otros tres).
3. **Eliminar `app/kids/new/`.** Borrar el archivo `app/kids/new/page.tsx` y, si quedó vacía, la carpeta `app/kids/new/`. Verificar que `grep -r "/kids/new"` en el repo no devuelva referencias.
4. **Verificación.** `npm run build` (incluye typecheck) y `npm run lint` deben pasar en limpio. Capturas con Playwright MCP a 1280×800, guardadas en `.playwright-mcp/`:
   - `/kids` (sin modal) → `kids-list-modal-closed.png` (para regresión: el listado sigue igual).
   - `/kids` con el modal abierto (click sobre el CTA) → `kids-add-modal.png`. Comparar contra `references/pantallas/agregar-nino.dc.html` y ajustar px por px hasta coincidir.
5. **Commit hygiene.** Sin commit en este spec (la regla de la repo es solo commit cuando el usuario lo pide).

## Acceptance criteria

- [ ] `GET /kids` renderiza la cabecera, el CTA "Agregar niño" (mismo estilo naranja) y el grid 2×4 de los 8 niños exactamente como en SPEC 02. Ningún cambio visual respecto al estado actual de `/kids`.
- [ ] El CTA "Agregar niño" es ahora un `<button type="button">` (no un `<a>`); click sobre él abre el modal con backdrop oscuro y tarjeta centrada `max-width: 520px`. La URL no cambia.
- [ ] El modal renderiza, en este orden literal: header con `<button>Cancelar</button>` (color `#94887B`, peso 700) izquierda, `<span id="add-kid-modal-title">Agregar niño</span>` (Fredoka 600 / 18px / `#3F362E`) centro, `<button type="submit">Guardar</button>` (color `#D9583C`, peso 800) derecha; separador `border-bottom: 1px solid #ECE0D0`; body con label `NOMBRE COMPLETO` + input placeholder `Ej. Martina López`; fila flex con label `FECHA DE NACIMIENTO` + input placeholder `dd/mm/aaaa` y label `SALA` + bloque con texto `Soles` y chevron; label `ALERGIAS (ETIQUETAS)` + input placeholder `Ej. Maní, Lactosa`; label `NOTAS MÉDICAS` + textarea placeholder `Indicaciones, medicación, contactos…` (min-height 90px, resize vertical).
- [ ] Cada label coincide con el estilo `font-size: 12px, font-weight: 800, letter-spacing: .7px, color: #94887B`. Cada input/textarea coincide con `border: 1.5px solid #EADFD0, border-radius: 14px, padding: 13px 16px, background: #fff, font-size: 15px, color: #3F362E, font-family: inherit`.
- [ ] La tarjeta tiene `background: #FBF4EC, border: 1px solid #ECE0D0, border-radius: 24px, box-shadow: 0 20px 50px -24px rgba(63,54,46,.35), overflow: hidden`.
- [ ] Al abrir el modal, el foco salta al input de "Nombre completo". Al cerrarlo (vía Cancelar o Guardar), el foco vuelve al CTA "Agregar niño" del header.
- [ ] Click en "Cancelar" cierra el modal y descarta los valores tipeados.
- [ ] Click en "Guardar" cierra el modal y descarta los valores tipeados (no se persiste nada).
- [ ] Pulsar `Enter` desde cualquier input cierra el modal vía submit del `<form>`.
- [ ] Pulsar `ESC` **no** cierra el modal (decidido en Phase 2).
- [ ] Click en el backdrop (área oscura fuera de la tarjeta) **no** cierra el modal (decidido en Phase 2).
- [ ] El modal es accesible: `<div role="dialog" aria-modal="true" aria-labelledby="add-kid-modal-title">` envuelve la tarjeta; los inputs tienen labels asociados visualmente (la asociación es posicional/jerárquica, no por `htmlFor`, igual que el template).
- [ ] `app/kids/new/page.tsx` y la carpeta `app/kids/new/` ya no existen. `grep -r "/kids/new" .` (excluyendo `node_modules`, `.next`, `references`, `.playwright-mcp`) no devuelve coincidencias.
- [ ] `lib/mock/kids.ts` no se modifica.
- [ ] Los placeholders paralelos de SPEC 02 (`/kids/[id]/edit`, `/kids/[id]/parents/new`, `/kids/[id]/day-summary`) siguen renderizando "Pantalla pendiente" sin cambios.
- [ ] Fonts: Fredoka se aplica al título del modal, "GESTIÓN", `h1` "Niños" y a "Soles" (peso 700). Nunito al resto. No hay `<link>` a Google Fonts en el HTML servido.
- [ ] `npm run build` y `npm run lint` finalizan sin errores ni warnings nuevos.
- [ ] Captura del modal abierto en `.playwright-mcp/kids-add-modal.png` coincide visualmente con `references/pantallas/agregar-nino.dc.html` en paleta, tipografía, radios, sombras, espaciados y posición de elementos.

## Decisions

- **Yes:** convertir `app/kids/page.tsx` a client component. Decidido en Phase 2 (pregunta 4). Más simple que extraer un wrapper server/client y mantiene el árbol de estado junto.
- **Yes:** cerrar el modal sólo con Cancelar y Guardar. Decidido en Phase 2 (pregunta 3). Sin listeners de `ESC` ni de click en backdrop. Coherente con el template original que tampoco muestra esos affordances.
- **Yes:** Guardar cierra sin validar ni persistir. Decidido en Phase 2 (pregunta 1). El spec futuro de CRUD real conecta el handler.
- **Yes:** borrar `app/kids/new/` entero. Decidido en Phase 2 (pregunta 2). No queda ruta huérfana apuntando a un placeholder.
- **Yes:** `<form>` envolviendo la tarjeta completa para que Enter dispare Guardar y se respete la semántica. Cancelar y Guardar son botones dentro del form (uno `type="button"`, otro `type="submit"`). El `border-bottom` del header pasa a ser estilo CSS, no separación DOM.
- **Yes:** backdrop oscuro `rgba(63,54,46,.45)` con `position: fixed, inset: 0` y z-index alto (50). El hex coincide con el color de la sombra de la tarjeta del template, manteniendo la coherencia de paleta.
- **Yes:** focus automático al primer input al abrir y restauración del foco al CTA al cerrar. A11y básica sin pedirlo (es lo mínimo esperable para un modal accesible).
- **Yes:** `<div role="dialog">` en vez del elemento nativo `<dialog>`. Razón: queremos control total del estilo del backdrop y la tarjeta (el nativo `<dialog>` tiene `::backdrop` propio y posicionamiento que no matchean el template); el equivalente ARIA cubre la semántica.
- **Yes:** inputs controlados con `useState` local. Más explícito que uncontrolled + `FormData`; el spec es chico y la verbosidad no es problema.
- **Yes:** "Sala" como display estático (no `<select>`). El template muestra sólo `Soles` literal con chevron; no hay otras salas en este spec, así que un `<select>` con una sola opción es ruido. Si en el futuro se suman salas, se reemplaza este bloque.
- **Yes:** "Alergias (etiquetas)" como input libre pese al label. El template no muestra chips reales ni lógica de tags; es un input de texto con placeholder que da ejemplos. Coherente con la fidelidad pixel-perfect.
- **Yes:** identificadores internos en inglés (`AddKidModal`, `form`, `firstInputRef`, `triggerRef`) y todo lo visible en español literal del template (labels, placeholders, copy).
- **Yes:** comentarios del código en inglés.
- **No:** `<dialog>` nativo HTML (decidido arriba).
- **No:** animación de entrada/salida (fade/scale). El template no la muestra; la fidelidad gana.
- **No:** cerrar con `ESC` ni con click en backdrop (decidido en Phase 2).
- **No:** tests automatizados. El repo no tiene runner configurado; verificación visual con Playwright MCP.
- **No:** mover la paleta al `tailwind.config` / `@theme`. Mismo razonamiento que SPEC 01/02/03: hex inline preservan fidelidad exacta.

## Risks

| Risk | Mitigation |
| --- | --- |
| Foco no se restaura al CTA tras cerrar (porque el `<button>` se desmonta y vuelve a montar) | Usar `document.activeElement` capturado en `useEffect` al abrir, o pasar `triggerRef` desde `KidsPage`. Verificar manualmente con Playwright que el foco vuelve. |
| `<form>` envolviendo toda la tarjeta hace que el `border-bottom` sea visual pero no DOM; si en una revisión alguien espera que el header esté fuera del form, hay que explicar la decisión | Documentado en Decisions. El submit del form sigue funcionando aunque el botón Guardar esté "lejos" de los inputs. |
| Borrar `app/kids/new/` rompe algún link externo no detectado | `grep -r "/kids/new" .` antes de borrar y revisar los resultados. Las specs existentes referencian la ruta sólo en el propio SPEC 02. |
| Autofocus del input dentro de un modal sin abrir todavía (`isOpen && <AddKidModal>`) puede intentar enfocar un nodo desmontado | El `useEffect` con deps `[]` corre sólo al montar el modal (que está condicionado por `isOpen`); no hay race condition porque el modal sólo existe cuando `isOpen` es true. |
| Fidelidad visual imperfecta (sombra del backdrop vs. la sombra de la tarjeta, padding del header 20/26 vs. 24/26 del template, font-weight del placeholder) | Comparar captura final con el template; ajustar px por px hasta coincidir. |
| `ESC` y click en backdrop explícitamente NO cierran: un revisor podría verlo como bug de a11y | Documentado en Phase 2 y en acceptance criteria. SPEC futuro de "accesibilidad de modales" puede revertir esta decisión si lo amerita. |

## What is **not** in this spec

- Persistencia, base de datos, server actions, route handlers, CRUD real.
- Validación de campos, mensajes de error, estados de loading, animación.
- Cierre del modal con `ESC` o click en backdrop (decisión explícita de Phase 2).
- Tag system real para alergias, dropdown real para Sala.
- Vincular padres real, "Resumen del día" más allá del placeholder, edición real.
- Las otras 13 plantillas de `references/pantallas/`.
- Layout responsive / breakpoint mobile.
- Modo dark.
- Tests automatizados.

Cada uno, si entra, merece su propio spec.
