# SPEC 02 — Listado de niños (`/kids`) y perfil de niño (`/kids/[id]`)

> **Status:** Implementado
> **Depends on:** SPEC 01
> **Date:** 2026-09-23
> **Objective:** Reproducir visualmente `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` como las rutas `/kids` y `/kids/[id]`, hardcodeando los 8 perfiles completos en `lib/mock/kids.ts`, eliminando el placeholder `/ninos` y dejando placeholders paralelos para los CTAs aún sin pantalla.

## Scope

**In:**

- `app/kids/page.tsx`: cabecera "GESTIÓN / Niños", botón "Agregar niño" (`/kids/new`), input "Buscar niño…" (filtra en cliente sobre `MOCK_KIDS` por nombre, case-insensitive, contiene), separador "SALA SOLES · 8 niños" y grid 2×4 con las 8 tarjetas de niño.
- Tarjeta de niño (`app/kids/_components/kid-card.tsx`): avatar 48px coloreado con inicial, nombre (Fredoka), línea de edad + estado de padres, chip de alergia (`MANÍ` / `LACTOSA` con bg `#FBD8CC` / fg `#D9684A`) o chip "VINCULAR" (bg `#F9D2DE` / fg `#C56486`); cuando no hay chip se renderiza una flecha `>` gris `#CBB89F`. Hover: borde `#F2A78E` + `translateY(-2px)`, transición 150ms. Link a `/kids/[id]`.
- Estado vacío del buscador: "Ningún niño coincide" centrado dentro del grid.
- `app/kids/[id]/page.tsx`: breadcrumb "Volver a Niños" (`/kids`); columna izquierda con avatar 84px + nombre (Fredoka 28px) + edad/sala, botón "Editar" (`/kids/[id]/edit`), panel de alergias (bg `#FBDAD6` con icono triangular — solo si `allergyText` existe) y tarjeta "blanca" con tres filas (Fecha de nacimiento / Sala / Ingreso); columna derecha 300px con botón "Resumen del día" (`/kids/[id]/day-summary`) y tarjeta "PADRES VINCULADOS" con cada padre (avatar 40px, nombre, rol, badge `ACTIVA` verde `#CFEBD8/#3E9B6C` o `PENDIENTE` amarillo `#F7E7A6/#9A7B1E`) y al final el dashed-circle "Vincular otro padre" (`/kids/[id]/parents/new`).
- `notFound()` de `next/navigation` cuando `:id` no está en `MOCK_KIDS` (renderiza el 404 nativo de Next por ahora).
- `lib/mock/kids.ts`: tipos `MockKid` / `MockParent` y array `MOCK_KIDS` con los 8 perfiles completos (ver sección **Data model**).
- Sidebar: cambiar el `NAV_ITEMS` de `"Niños"` de `/ninos` a `/kids`. La lógica existente `pathname === href || pathname?.startsWith(href + "/")` ya mantiene el item activo en `/kids`, `/kids/new`, `/kids/[id]`, etc.
- Placeholders paralelos al patrón SPEC 01, todos wrappeados en `<AppShell>` con `<div className="p-8 font-medium">Pantalla pendiente</div>`:
  - `app/kids/new/page.tsx`
  - `app/kids/[id]/edit/page.tsx`
  - `app/kids/[id]/parents/new/page.tsx`
  - `app/kids/[id]/day-summary/page.tsx`
- Eliminación de `app/ninos/page.tsx` (el placeholder huérfano queda sin ruta).
- Metadata: título en `app/kids/page.tsx` y `app/kids/[id]/page.tsx` queda en `"OpenDayCare · Kids"` y `"OpenDayCare · <Nombre>"` respectivamente. Los placeholders no setean metadata (igual que los actuales).

**Out of scope (para futuros specs):**

- Persistencia / base de datos / server actions / route handlers.
- CRUD real de niños (crear, editar, borrar).
- Vincular padres real (envío de invitaciones, marcar activo).
- "Resumen del día" más allá del placeholder.
- Autenticación, sesión, roles.
- Las otras 14 plantillas de `references/pantallas/` no mencionadas (`avisos`, `mi-cuenta`, `crear-publicacion`, `login`, `index`, `familia-*`, etc.) — quedan como están.
- Layout responsive / breakpoint mobile (los templates son desktop-fixed).
- Modo dark.
- Paginación del grid (con 8 niños no aplica).
- Filtros adicionales al buscador (por edad, sala, estado de padres) — solo nombre por ahora.
- Tests automatizados (no hay runner en `package.json`; la verificación visual sigue siendo captura con Playwright).

## Data model

Hardcodeado, sin persistencia. La separación archivo/tipos facilita que un spec futuro de "niños con DB" reemplace solo el import.

```ts
// lib/mock/kids.ts

export type AllergyLabel = "MANÍ" | "LACTOSA";
export type LinkChipLabel = "VINCULAR";
export type KidChip =
  | { kind: "allergy"; label: AllergyLabel }
  | { kind: "link"; label: LinkChipLabel };

export type ParentStatus = "active" | "pending";

export interface MockParent {
  initial: string;          // "L"
  name: string;             // "Lucía Fernández"
  role: string;             // "Mamá" / "Papá"
  status: ParentStatus;     // "active" → ACTIVA; "pending" → PENDIENTE
  avatarBg: string;         // "#C9B6E8"
  avatarFg: string;         // "#fff"
}

export interface MockKid {
  id: string;               // "mateo-fernandez"
  name: string;
  initial: string;
  avatarBg: string;         // color de fondo del círculo del avatar
  avatarFg: string;         // color de la inicial
  age: string;              // "3 años"
  birthDate: string;        // "12 mar 2022" (formato tal como aparece en el template)
  ingreso: string;          // "feb 2025"
  chip: KidChip | null;
  allergyText?: string;     // texto del panel de alergias; presente solo si chip.kind === "allergy"
  parentsCountText: string; // "2 padres vinculados" / "1 padre vinculado" / "sin padres vinculados"
  parents: MockParent[];    // [] cuando chip.kind === "link"; misma cantidad que el texto pero con estados
}

export const MOCK_KIDS: MockKid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    avatarBg: "#A9D9E8", avatarFg: "#1F7A93",
    age: "3 años",
    birthDate: "12 mar 2022",
    ingreso: "feb 2025",
    chip: { kind: "allergy", label: "MANÍ" },
    allergyText: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parentsCountText: "2 padres vinculados",
    parents: [
      { initial: "L", name: "Lucía Fernández", role: "Mamá", status: "active",  avatarBg: "#C9B6E8", avatarFg: "#fff" },
      { initial: "D", name: "Diego Fernández", role: "Papá", status: "pending", avatarBg: "#A9C7E8", avatarFg: "#fff" },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initial: "S",
    avatarBg: "#F4B8CC", avatarFg: "#C44A7A",
    age: "2 años",
    birthDate: "8 jul 2023",
    ingreso: "mar 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      { initial: "A", name: "Andrea Méndez", role: "Mamá", status: "active", avatarBg: "#F4B8CC", avatarFg: "#fff" },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initial: "B",
    avatarBg: "#B9DEC4", avatarFg: "#3E8B62",
    age: "3 años",
    birthDate: "3 oct 2021",
    ingreso: "ene 2025",
    chip: null,
    parentsCountText: "2 padres vinculados",
    parents: [
      { initial: "M", name: "Mariana Ortiz", role: "Mamá", status: "active", avatarBg: "#B9DEC4", avatarFg: "#fff" },
      { initial: "P", name: "Pablo Ruiz",     role: "Papá", status: "active", avatarBg: "#F4DC8E", avatarFg: "#3F362E" },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initial: "V",
    avatarBg: "#F4DC8E", avatarFg: "#9A7B1E",
    age: "2 años",
    birthDate: "19 may 2023",
    ingreso: "abr 2025",
    chip: { kind: "link", label: "VINCULAR" },
    parentsCountText: "sin padres vinculados",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initial: "T",
    avatarBg: "#C9B6E8", avatarFg: "#7B5FC0",
    age: "3 años",
    birthDate: "27 ene 2022",
    ingreso: "feb 2025",
    chip: { kind: "allergy", label: "LACTOSA" },
    allergyText: "Intolerancia a la lactosa. Usar leche sin lactosa en todas las comidas.",
    parentsCountText: "1 padre vinculado",
    parents: [
      { initial: "L", name: "Laura Díaz", role: "Mamá", status: "active", avatarBg: "#C9B6E8", avatarFg: "#fff" },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initial: "E",
    avatarBg: "#F4B8CC", avatarFg: "#C44A7A",
    age: "2 años",
    birthDate: "14 sep 2023",
    ingreso: "mar 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      { initial: "R", name: "Ricardo Castro", role: "Papá", status: "active", avatarBg: "#F4B8CC", avatarFg: "#fff" },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initial: "L",
    avatarBg: "#A9D9E8", avatarFg: "#1F7A93",
    age: "3 años",
    birthDate: "6 mar 2022",
    ingreso: "ene 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      { initial: "M", name: "María Romero", role: "Mamá", status: "active", avatarBg: "#A9D9E8", avatarFg: "#fff" },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initial: "O",
    avatarBg: "#B9DEC4", avatarFg: "#3E8B62",
    age: "2 años",
    birthDate: "22 nov 2023",
    ingreso: "abr 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      { initial: "J", name: "José Vega", role: "Papá", status: "active", avatarBg: "#B9DEC4", avatarFg: "#fff" },
    ],
  },
];
```

Decisión explícita: los nombres, iniciales y fechas de los 7 niños distintos de Mateo son **datos inventados** para que las 8 fichas del perfil queden completas (decidido en Phase 2: "Hardcodear los 8 perfiles completos"). El único niño con datos literales del template es Mateo. Si en un spec futuro se quiere alinear con una realidad, se reemplaza este único archivo.

## Implementation plan

1. **Migración del sidebar.** En `app/_components/sidebar.tsx` cambiar el `href` del item "Niños" de `"/ninos"` a `"/kids"`. Verificar que la lógica de `active` (que ya hace `startsWith(`${href}/`)`) siga marcando activo en `/kids`, `/kids/new`, `/kids/mateo-fernandez`, etc. Borrar `app/ninos/` entero (`page.tsx` y la carpeta).
2. **Mock de niños.** Crear `lib/mock/kids.ts` con los tipos `MockParent` / `MockKid` / `KidChip` y el array `MOCK_KIDS` de la sección anterior.
3. **Componente `KidChip`** en `app/_components/kid-chip.tsx`. Recibe `kind` y `label`; renderiza un `<span>` con `padding: 5px 9px`, `font-size: 11px`, `font-weight: 800`, `border-radius: 999px`. Paleta: `kind === "allergy"` → bg `#FBD8CC` / fg `#D9684A`; `kind === "link"` → bg `#F9D2DE` / fg `#C56486`. Sin estado vacío — el chip se renderiza solo cuando hay chip.
4. **Componente `KidCard`** en `app/kids/_components/kid-card.tsx`. Recibe `MockKid`, renderiza el `<a>` con `display: flex`, `gap: 14px`, `background: #FFFDF9`, `border: 1px solid #ECE0D0`, `border-radius: 18px`, `padding: 16px`, `box-shadow: 0 4px 14px -12px rgba(120,90,60,.5)`. Avatar 48px (reusa `<Avatar>` con `size={48}`). Nombre en Fredoka 16px, peso 600. Subtítulo con `parentsCountText` en `#A89A8B` 13px. A la derecha: si `kid.chip !== null` renderiza `<KidChip>`; si no, una flecha `>` (`<svg>` con `stroke: #CBB89F`, `strokeWidth: 2.2`). Hover: `border-color: #F2A78E`, `transform: translateY(-2px)`, transition 150ms (la regla `.kid:hover` ya estaba en `globals.css` de SPEC 01; verificar que sigue).
5. **`KidsGrid`** client component en `app/kids/_components/kids-grid.tsx`. Maneja `query` con `useState`. Filtra `MOCK_KIDS` por `kid.name.toLowerCase().includes(query.trim().toLowerCase())`. Renderiza el grid 2×4 (`grid-template-columns: repeat(2,1fr); gap: 14px`). Cuando el filtro deja la lista vacía, muestra un `<div>` que ocupa las 2 columnas del grid con el texto "Ningún niño coincide" centrado (Fredoka 16px, color `#A89A8B`). Si llega un `kid.chip` que es link, el click del card sigue navegando a `/kids/[id]` (no a un flujo de vinculación) — la vinculación vive en el perfil.
6. **Página `/kids`** en `app/kids/page.tsx` (server component). Layout interior: `max-width: 880px`, `margin: 0 auto`, `padding: 34px 40px 80px`. Cabecera: bloque "GESTIÓN" (`font-size: 12.5px, font-weight: 800, letter-spacing: .8px, color: #D9583C`) + `<h1>Niños</h1>` (Fredoka 600, 30px, color `#3F362E`), y a la derecha `<a href="/kids/new">Agregar niño</a>` con el mismo estilo del CTA naranja de SPEC 01 (`linear-gradient(180deg,#F4977E,#EE8164)`, `border-radius: 14px`, `box-shadow: 0 8px 18px -8px rgba(238,129,100,.7)`). Search row: `<input>` placeholder "Buscar niño…" con icono de lupa, bg `#FFFDF9`, `border: 1px solid #ECE0D0`, `border-radius: 14px`, `padding: 12px 16px`, `gap: 11px`. Separador: bloque "SALA SOLES" + "8 niños" + línea `#E7DAC8` extendida (igual al separador del feed de SPEC 01). Por último `<KidsGrid />`. `export const metadata = { title: "OpenDayCare · Kids" };`.
7. **Página `/kids/[id]/page.tsx`** (server component, async). Tipo de props:
   ```ts
   export default async function KidProfilePage({
     params,
   }: {
     params: Promise<{ id: string }>;
   }) {
     const { id } = await params;
     const kid = MOCK_KIDS.find((k) => k.id === id);
     if (!kid) notFound();
     // render…
   }
   ```
   Layout interior: `max-width: 820px`, `margin: 0 auto`, `padding: 34px 40px 80px`. Breadcrumb "Volver a Niños" (`<a href="/kids">` con flecha `<`). Luego un flex con dos columnas: izquierda `flex: 1; min-width: 300px` con header (avatar 84px + nombre + "3 años · Sala Soles" + botón "Editar" outline `#ECE0D0`), panel de alergias (solo si `kid.allergyText`), tarjeta blanca con tres `<div>` flex separados por `border-bottom: 1px solid #F0E6D8`. Derecha `width: 300px, flex: none` con botón "Resumen del día" (bg `#3F362E`) y tarjeta "PADRES VINCULADOS" iterando `kid.parents` (avatar 40px + nombre + rol + badge `ACTIVA` verde o `PENDIENTE` amarillo); al final `<a href="/kids/[id]/parents/new">Vincular otro padre</a>` con el dashed-circle. `generateMetadata` con `title: kid.name`.
8. **Componente interno del panel de alergias** (puede vivir inline en el archivo de la página si no se reutiliza). `<div>` flex con bg `#FBDAD6`, `border-radius: 16px`, `padding: 16px 18px`, `gap: 14px`. Izquierda un cuadrado 40px bg `#F4A8A0` con el icono triangular de alerta del template (`stroke: #fff`). Derecha: título "Alergias y notas" (Fredoka/peso 800, color `#C5413A`, 15px) y body `kid.allergyText` (color `#B25249`, 14.5px, line-height: 1.5).
9. **Placeholders.** Crear:
   - `app/kids/new/page.tsx`
   - `app/kids/[id]/edit/page.tsx`
   - `app/kids/[id]/parents/new/page.tsx`
   - `app/kids/[id]/day-summary/page.tsx`

   Cada uno como server component que importa `AppShell` y renderiza `<div className="p-8 font-medium">Pantalla pendiente</div>`. Los que tienen `[id]` reciben `params` aunque no lo usen (el layout de Next exige el parámetro declarado). El de `parents/new` debe respetar que otro layout padre no exista; si Next requiere agrupar, va dentro de `app/kids/[id]/parents/new/` directamente sin agrupador.
10. **Verificación.** `npm run build` (incluye typecheck) y `npm run lint` deben pasar en limpio. Capturar dos pantallas a 1280×800 con Playwright MCP y guardar en `.playwright-mcp/`:
    - `/kids` → `kids-list.png`
    - `/kids/mateo-fernandez` → `kids-profile-mateo.png`

    Comparar contra `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` respectivamente, ajustando px por px hasta coincidir. Capturar también un caso del buscador filtrado y otro del estado "ningún niño coincide" para evidencia.
11. **Commit hygiene.** Sin commit en este spec (la regla de la repo es solo commit cuando el usuario lo pide).

## Acceptance criteria

- [x] `app/ninos/` ya no existe; `nav item` "Niños" del sidebar apunta a `/kids`.
- [x] `GET /kids` renderiza la cabecera "GESTIÓN / Niños", botón "Agregar niño" (`/kids/new`), input "Buscar niño…", separador "SALA SOLES · 8 niños" con línea `#E7DAC8`, y 8 tarjetas en grid 2×4 exactamente en este orden: Mateo / Sofía / Benjamín / Valentina / Tomás / Emma / Lucas / Olivia.
- [x] Mateo / Tomás muestran chip de alergia con label "MANÍ" / "LACTOSA" respectivamente (bg `#FBD8CC`, fg `#D9684A`, padding 5px 9px, radius 999px, font 11px, peso 800). Valentina muestra chip "VINCULAR" (bg `#F9D2DE`, fg `#C56486`). El resto muestra la flecha `>` `#CBB89F`.
- [x] El subtítulo de cada tarjeta coincide literalmente con `parentsCountText` del mock (Mateo "2 padres vinculados", Valentina "sin padres vinculados", etc.).
- [x] Hover sobre una tarjeta: `border-color: #F2A78E` + `translateY(-2px)` con transición 150ms.
- [x] Click en cualquier tarjeta → navega a `/kids/<su-id>` y carga el perfil correspondiente.
- [x] Escribir una subcadena case-insensitive del nombre del niño (p. ej. "sof", "tom") en el buscador filtra al instante. Escribir "zzz" muestra "Ningún niño coincide" en vez del grid. (Resuelto durante la verificación: el ejemplo "lucía" del draft inicial era incorrecto — el scope del spec y el scope del criterio aplican solo al nombre del niño; extender el filtro a los nombres de los padres queda fuera de este spec.)
- [x] `GET /kids/mateo-fernandez` renderiza avatar 84px `#A9D9E8/#1F7A93`, nombre "Mateo Fernández" (Fredoka 600 28px), subtítulo "3 años · Sala Soles", botón "Editar" outline → `/kids/mateo-fernandez/edit`, panel rojo `#FBDAD6` con texto literal del template, tarjeta blanca con Fecha "12 mar 2022", Sala "Soles", Ingreso "feb 2025", botón "Resumen del día" `#3F362E` → `/kids/mateo-fernandez/day-summary`, y tarjeta "PADRES VINCULADOS" con Lucía (badge ACTIVA `#CFEBD8/#3E9B6C`) y Diego (badge PENDIENTE `#F7E7A6/#9A7B1E`), más el dashed "Vincular otro padre" → `/kids/mateo-fernandez/parents/new`.
- [x] Los 7 perfiles distintos de Mateo renderizan con sus datos del mock (avatars con los hex correctos, panel de alergias solo en Mateo y Tomás, "Vincular otro padre" sigue presente aunque ya haya 2 padres vinculados).
- [x] El perfil oculta el panel de alergias cuando `kid.allergyText` es `undefined` (Sofía, Benjamín, Valentina, Emma, Lucas, Olivia).
- [x] La tarjeta "PADRES VINCULADOS" de Valentina está vacía salvo por el dashed-circle "Vincular otro padre" (parents array = []).
- [x] `GET /kids/no-existe-999` invoca `notFound()` y renderiza la 404 nativa de Next (no romper el layout).
- [x] `/kids/new`, `/kids/mateo-fernandez/edit`, `/kids/mateo-fernandez/parents/new`, `/kids/mateo-fernandez/day-summary` renderizan "Pantalla pendiente" envuelto en `<AppShell>` con sidebar visible (item "Niños" activo en `/kids/**`).
- [x] "Volver a Niños" desde el perfil navega a `/kids`.
- [x] El item "Niños" del sidebar queda activo tanto en `/kids` como en cualquier ruta bajo `/kids/**`.
- [x] Fonts: Fredoka se aplica a los títulos (`<h1>`, "GESTIÓN", "PADRES VINCULADOS", "Alergias y notas", nombres) y Nunito al resto. No hay `<link>` a Google Fonts en el HTML servido.
- [x] `npm run build` y `npm run lint` finalizan sin errores ni warnings nuevos.
- [x] Captura de `/kids` y `/kids/mateo-fernandez` en `.playwright-mcp/kids-list.png` y `.playwright-mcp/kids-profile-mateo.png` coincide visualmente con sus templates.

## Decisions

- **Yes:** listar las dos pantallas nuevas y hardcodear los 8 perfiles completos. Decidido en Phase 2 (pregunta 2); evita el "todo id desconocido va a Mateo" sin sobrecumplir con perfiles inventados.
- **Yes:** borrar `app/ninos/` y actualizar el `Sidebar`. Decidido en Phase 2 (pregunta 1); una sola ruta canónica.
- **Yes:** buscador funcional, filtrado en cliente sobre `MOCK_KIDS` por nombre. Decidido en Phase 2 (pregunta 3); suficiente para 8 niños, no necesita debounce ni paginación.
- **Yes:** placeholders paralelos al patrón SPEC 01 en rutas anidadas (`/kids/[id]/edit`, etc.). Decidido en Phase 2 (pregunta 4); preserva la jerarquía de URL sin 404s.
- **Yes:** `notFound()` para ids inexistentes. Coherente con el patrón de Next y evita el "cualquier id muestra a Mateo" que ya rechazamos.
- **Yes:** `lib/mock/kids.ts` aunque los datos sean hardcoded — mismo patrón que `lib/mock/feed.ts`; el spec futuro "DB de niños" reemplaza solo el import.
- **Yes:** componentes específicos dentro de `app/kids/_components/` (`kid-card`, `kids-grid`) por scoping; `KidChip` en `app/_components/` porque es tiny y reusable (posiblemente útil en otros specs de gestión).
- **Yes:** panel de alergias, filas k/v y padres como markup inline en `app/kids/[id]/page.tsx`, no componentes separados. Son secciones únicas que no se reutilizan; extraerlas agrega ruido sin beneficio.
- **Yes:** estados de padres representados como enum `"active" | "pending"` y mapeados a texto visible ("ACTIVA" / "PENDIENTE") via un lookup — mirror del patrón `POST_CATEGORY_LABELS` de SPEC 01.
- **Yes:** identificadores internos en inglés (`MockKid`, `kid.chip.kind`, `ParentStatus`) y todo lo visible (nombres, labels de chip, copy del panel) en español literal del template. Cumple la regla del repo sin sacrificar fidelidad.
- **Yes:** comentarios del código en inglés. La copia visible queda en español.
- **No:** mover la paleta al `tailwind.config` / `@theme`. Mismo razonamiento que SPEC 01: los templates usan hex inline; copiarlos así preserva fidelidad y no bloquea el spec que defina el sistema de tokens.
- **No:** mover `MockParent` a su propio archivo. Vive dentro de `kids.ts` porque solo lo consume el detalle del niño.
- **No:** tests automatizados. El repo no tiene runner configurado; verificación sigue siendo captura de Playwright (reutilizar `.playwright-mcp/`).

## Risks

| Risk | Mitigation |
| --- | --- |
| Inventar 7 perfiles de niños arrastra inconsistencia si en un futuro se conecta a la DB real | El array vive solo en `lib/mock/kids.ts`. El spec futuro de "niños con DB" reemplaza este archivo entero; las páginas (`/kids`, `/kids/[id]`) consumen `MockKid` ya tipado y no se enteran del cambio. |
| `params: Promise<{ id: string }>` cambia entre versiones menores de Next 16 | Es la firma ya usada por layouts/páginas de esta versión; el AGENTS.md lo fija. Si rompe al subir Next, ajustar el unwrap — no es un cambio de UI. |
| El buscador cliente pierde foco al navegar entre páginas (`/kids` → `/kids/[id]` → `/kids`) | El input vive dentro de `KidsGrid` (client component) montado por una server page; al navegar se desmonta y se pierde el query, lo cual es aceptable para este spec. Persistir el filtro va en el spec de "estado de UI". |
| Fidelidad visual imperfecta (tracking, sombra del CTA, padding del grid 2×4 vs. width 880px) | Comparar captura de Playwright con el template; ajustar px por px hasta coincidir. |
| `notFound()` con `app/kids/[id]/` layout por defecto de Next | No definimos `layout.tsx` para ese segmento, hereda el root; la 404 nativa de Next se renderiza con `<html>` propio — aseguramos en build que coexiste con las otras páginas. |

## What is **not** in this spec

- Persistencia, base de datos, server actions, route handlers.
- CRUD real de niños (crear, editar, borrar).
- Vincular padres real (envío de invitaciones, marcar activo).
- "Resumen del día" más allá del placeholder.
- Las otras 14 plantillas de `references/pantallas/`.
- Layout responsive / breakpoint mobile.
- Modo dark.
- Paginación del grid.
- Filtros adicionales al buscador (por edad, sala, estado de padres).
- Tests automatizados.

Cada uno, si entra, merece su propio spec.
