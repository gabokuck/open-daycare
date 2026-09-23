# SPEC 01 — Home del feed (reproducción visual de la plantilla)

> **Status:** Implementado
> **Depends on:** —
> **Date:** 2026-09-23
> **Objective:** Reproducir visualmente `references/pantallas/feed.dc.html` como la ruta `/`, con datos hardcodeados y links hacia placeholders, sin auth ni base de datos.

## Scope

**In:**

- Sidebar fija (248px) con logo "OpenDayCare / Sala Soles", botón "Nueva publicación", nav (Feed/Niños/Avisos/Mi cuenta) con Feed activo, y pie con avatar + nombre + rol + logout.
- Header del feed: saludo "Buenas, Caro", subtítulo "12 niños · martes 17 jun".
- Tarjeta "Compartí un momento…" (link a placeholder).
- Separador "PUBLICADO HOY" con línea horizontal.
- Tres posts hardcodeados en orden: Mateo / LOGRO, Mateo / ACTIVIDAD (con placeholder de foto), Anuncio general / ANUNCIO; cada uno con badge coloreado, autor, hora, audiencia, body, contador de likes, contador de comentarios y link "Editar".
- Placeholders `app/ninos/page.tsx`, `app/avisos/page.tsx`, `app/mi-cuenta/page.tsx`, `app/crear-publicacion/page.tsx` y `app/login/page.tsx` con un mensaje "Pantalla pendiente".
- Fonts Fredoka y Nunito cargadas vía `next/font/google` en `app/layout.tsx`.
- Metadata de la página cambia a "OpenDayCare · Feed".

**Out of scope (para futuros specs):**

- Autenticación (la pantalla `login.dc.html` queda como placeholder).
- Base de datos, persistencia, server actions, route handlers.
- Crear / editar / borrar publicaciones reales.
- Likes y comentarios reales.
- Las otras 16 plantillas de `references/pantallas/` (`index`, `agregar-nino`, `perfil-nino`, `resumen-dia`, `familia-cuenta`, `familia-feed`, `detalle-publicacion`, `foto`, `vincular-padre`, `activar-cuenta` y las cinco que ya quedaron como placeholder).
- Layout responsive / breakpoint para mobile.
- Modo dark.
- Animaciones, accesibilidad de teclado más allá de focus nativo de los `<a>`.

## Data model

Datos hardcodeados, **no se persiste nada**. La separación es estructural, no runtime.

```ts
// lib/mock/feed.ts
export type PostCategory = "achievement" | "activity" | "announcement";

// Spanish labels rendered inside the badge. Decoupling the enum from the
// displayed string keeps internal code in English while preserving the
// pixel-faithful Spanish copy of the template.
export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

export interface MockPost {
  id: string;                // "p-achievement", "p-activity", "p-announcement"
  category: PostCategory;
  child: {
    name: string;            // "Mateo" or empty for announcement
    initial: string;         // "M" or empty
    avatarBg: string;        // "#A9D9E8" / "#CCD8F4"
    avatarFg: string;        // "#1F7A93" / "#4E72C8"
    isGeneral?: boolean;     // true for "Anuncio general" (megaphone icon, no initial)
  };
  publishedAt: string;       // "14:20"
  audience: string;          // "Para: familia de Mateo" / "Para: toda la sala"
  body: string;
  photoCaption?: string;     // activity only: "Foto · pintando con témperas"
  reactions: number;
  comments: number;
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: "p-achievement",
    category: "achievement",
    child: { name: "Mateo", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" },
    publishedAt: "14:20",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    reactions: 3,
    comments: 1,
  },
  {
    id: "p-activity",
    category: "activity",
    child: { name: "Mateo", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" },
    publishedAt: "09:40",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoCaption: "Foto · pintando con témperas",
    reactions: 5,
    comments: 2,
  },
  {
    id: "p-announcement",
    category: "announcement",
    child: { name: "Anuncio general", initial: "", avatarBg: "#CCD8F4", avatarFg: "#4E72C8", isGeneral: true },
    publishedAt: "07:50",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    reactions: 8,
    comments: 0,
  },
];

export const CURRENT_USER = {
  initial: "C",
  name: "Caro Giménez",
  role: "Maestra · Soles",
} as const;
```

Decisión explícita: este array sigue el patrón que dejaremos en el repo para que cualquier spec futura de "feed real" lo reemplace leyendo desde la DB, sin tocar los componentes.

## Implementation plan

1. **Fonts.** En `app/layout.tsx` sumar `Fredoka` y `Nunito` desde `next/font/google`, exponiendo `--font-fredoka` y `--font-nunito` como CSS variables; añadirlas a la `className` del `<html>`. Borrar `Geist`/`Geist_Mono`. Actualizar `metadata` a `{ title: "OpenDayCare · Feed", description: "Sala Soles" }`.
2. **Mock data.** Crear `lib/mock/feed.ts` con los tipos y el array de la sección anterior.
3. **Componentes UI base.** Crear `app/_components/avatar.tsx` (círculo de 38/44 px con inicial o icono de megáfono si `isGeneral`) y `app/_components/post-badge.tsx` (chip coloreado por categoría, colores exactos del template: `#CFEBD8 / #3E9B6C`, `#C7E7F1 / #2E89A6`, `#CCD8F4 / #4E72C8`).
4. **AppShell y Sidebar.** Crear `app/_components/sidebar.tsx` con la barra fija y un `SidebarNavItem` por cada ruta. Crear `app/_components/app-shell.tsx` que wrappea `children` con el `<Sidebar />` y un `<main>` con el ancho y padding del template (sidebar 248px + main con `max-width: 760px`, `padding: 34px 40px 80px`). Leer `CURRENT_USER` desde `lib/mock/feed.ts`.
5. **PostCard.** Crear `app/_components/post-card.tsx` que consume `MockPost`. Cuando `category === "activity"`, renderiza el placeholder de foto con `border: 1.5px dashed #DBCDBA` y el caption recibido en `photoCaption`. El badge consume `POST_CATEGORY_LABELS[post.category]` para obtener el texto a mostrar (siempre español). Link "Editar" apunta a `/crear-publicacion`.
6. **Page principal.** En `app/page.tsx` reemplazar la landing de create-next-app por `<AppShell>` con el header (saludo + subtítulo), la tarjeta "Compartí un momento…" (link a `/crear-publicacion`), el separador "PUBLICADO HOY" (línea `#E7DAC8` extendida) y `MOCK_POSTS.map(PostCard)`.
7. **Placeholders.** Crear `app/ninos/page.tsx`, `app/avisos/page.tsx`, `app/mi-cuenta/page.tsx`, `app/crear-publicacion/page.tsx` y `app/login/page.tsx`. Cada uno envuelve un `<div className="p-8 font-medium">Pantalla pendiente</div>` con `<AppShell>`.
8. **Verificación.** `npm run build` (typecheck incluido) y `npm run lint`; ambos deben pasar en limpio. Capturar pantalla a 1280×800 con Playwright MCP a `localhost:3000` y guardar en `.playwright-mcp/feed-home.png` para comparar contra el template.

## Acceptance criteria

- [x] `GET /` renderiza la sidebar completa y el feed con el saludo literal "Buenas, Caro" y subtítulo literal "12 niños · martes 17 jun".
- [x] El item "Feed" del nav está pintado con el fondo `#FBE3D8` y el color `#D9583C`; el resto con fondo transparente y `#6E6359`.
- [x] Aparecen exactamente tres posts en este orden: Mateo/LOGRO/14:20/3 likes/1 comentario, Mateo/ACTIVIDAD/09:40/5 likes/2 comentarios + placeholder de foto con borde dasheado, Anuncio general/ANUNCIO/07:50/8 likes/0 comentarios.
- [x] El badge de LOGRO usa fondo `#CFEBD8` y texto `#3E9B6C`; ACTIVIDAD `#C7E7F1 / #2E89A6`; ANUNCIO `#CCD8F4 / #4E72C8`. La bolita y el texto del badge coinciden con el template.
- [x] El avatar "Anuncio general" renderiza el icono de megáfono del template en lugar de una inicial.
- [x] Click en "Niños" → navega a `/ninos` y muestra "Pantalla pendiente" manteniendo el sidebar.
- [x] Idem para "Avisos" (`/avisos`), "Mi cuenta" (`/mi-cuenta`), "Nueva publicación" (`/crear-publicacion`) y el icono de logout (`/login`).
- [x] La card "Compartí un momento…" navega a `/crear-publicacion`.
- [x] El link "Editar" de cada post también navega a `/crear-publicacion`.
- [x] Fredoka se aplica a los títulos de posts, header, logo y tags de usuario; Nunito al resto del texto. No hay `<link>` a Google Fonts en el HTML servido.
- [x] `npm run build` y `npm run lint` finalizan sin errores ni warnings nuevos.
- [x] Captura de `/` a 1280×800 en `.playwright-mcp/feed-home.png` coincide visualmente con el template en paleta, tipografía, espaciados y radios.

## Decisions

- **Yes:** descomponer en componentes (`AppShell`, `Sidebar`, `PostCard`, `PostBadge`, `Avatar`) desde el día uno. Reduce el archivo a leer y deja reutilizables para futuras pantallas de la app.
- **Yes:** `app/_components/` con prefijo `_` para que Next.js no los exponga como rutas.
- **Yes:** `lib/mock/feed.ts` aunque los datos sean hardcoded — la separación archivo/tipos ayuda a que el spec futuro "feed con DB" reemplace solo el import.
- **Yes:** `AppShell` en `app/_components/app-shell.tsx` que envuelve `children` con el `<Sidebar />`. Las seis páginas (`/`, `/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/login`) lo consumen; no repetimos el layout del sidebar.
- **Yes:** cada link a un placeholder dedicado para que no haya 404. La pantalla `login.dc.html` también queda como placeholder pese a ser un destino de auth futuro.
- **Yes:** `next/font/google` para Fredoka y Nunito. Coherente con el patrón Geist ya presente, evita FOUT y mantiene el bundle auto-hospedado.
- **Yes:** identificadores internos en inglés (`PostCategory` con `"achievement" | "activity" | "announcement"`, IDs `p-achievement / p-activity / p-announcement`) y etiquetas visibles en español vía `POST_CATEGORY_LABELS`. Cumple la regla del repo "nombres, funciones, variables en inglés" sin sacrificar la copia literal del template.
- **Yes:** comentarios del código en inglés. La copia visible al usuario (audiencia, body, `name: "Anuncio general"`, etc.) queda en español tal como aparece en la plantilla.
- **No:** `<link>` literal a Google Fonts copiado del template. Genera FOUT y duplica el patrón que ya tiene el layout.
- **No:** mover la paleta (`#F6ECDF`, `#FBE3D8`, etc.) a `tailwind.config` o `@theme` en `globals.css`. El template usa hex inline; copiarlos así preserva fidelidad exacta y no bloquea el spec futuro que decida el sistema de tokens.
- **No:** responsive / mobile. El template es fixed-sidebar desktop; queda para un spec de layout adaptativo.
- **No:** dark mode. El template es claro.
- **No:** pruebas automatizadas. El repo no tiene runner configurado (`package.json` no define `test`); usaremos captura de Playwright como verificación visual.

## Risks

| Risk | Mitigation |
| --- | --- |
| Fidelidad visual imperfecta (tamaños, pesos, tracking, sombras del CTA naranja) | Comparar captura final con el template; ajustar px por px hasta coincidir. |
| Cambio futuro a DB rompe los IDs `p-achievement / p-activity / p-announcement` | El tipo `MockPost.id: string` está pensado para ser sustituido por un UUID al migrar; ninguna UI depende del valor literal. |
| `next/font/google` falla en build por red | Fredoka y Nunito están en el catálogo oficial de Google Fonts; si el build sin red es problema, fallback documentado en el spec de CI, no en este. |
| Algún screen reader extrae contenido incorrecto por el orden visual | Los placeholders usan un `<h1>` con el nombre del destino y un `<p>`, suficiente para un spec futuro de a11y que toque todo en bloque. |

## What is **not** in this spec

- Autenticación, sesión, roles reales.
- Persistencia / base de datos / server actions / route handlers.
- Crear, editar, borrar, comentar o reaccionar a publicaciones reales.
- Las 16 pantallas restantes de `references/pantallas/`.
- Layout responsive o tratamiento mobile.
- Modo dark.
- Tests automatizados.

Cada uno de esos puntos, si entra, merece su propio spec.
