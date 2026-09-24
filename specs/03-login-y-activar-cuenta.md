# SPEC 03 — Login (`/login`) y activar cuenta (`/activate-account`)

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-09-23
> **Objective:** Reproducir `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` como dos rutas públicas sin sidebar, omitiendo el selector "INGRESO COMO" del login, con datos hardcoded y CTAs hacia el feed (`/`).

## Scope

**In:**

- `app/login/page.tsx` reemplaza el placeholder actual: layout full-screen sin `AppShell`, dos columnas (1.05fr / 1fr) sobre fondo `#FBF4EC`. Columna izquierda = panel naranja con `linear-gradient(155deg,#F6A98E,#F2937A 45%,#EC7E62)`, dos círculos decorativos (`rgba(255,255,255,.12)` 420px arriba-derecha, `rgba(255,255,255,.10)` 300px abajo-izquierda), brand mark (cuadrado 46px con sol blanco + texto "OpenDayCare"), título Fredoka 42px "El día de cada niño, compartido con su familia.", subtítulo blanco 17px y footer "🌿 Guardería Sala Soles". Columna derecha = formulario: título "Iniciar sesión" (Fredoka 30px), subtítulo "Ingresá para ver el día de hoy.", **sin** selector "INGRESO COMO", label "EMAIL" + input pre-relleno con `caro@opendaycare.com`, label "CONTRASEÑA" + input con placeholder "••••••••", link "¿Olvidaste tu contraseña?" (color `#C5503A`, sin href), CTA "Iniciar sesión" (`linear-gradient(180deg,#F4977E,#EE8164)`, `border-radius: 15px`, sombra `0 10px 22px -8px rgba(238,129,100,.7)`) que navega a `/`, link inferior "¿Te invitó la guardería? Activá tu cuenta" → `/activate-account`.
- `app/activate-account/page.tsx`: layout full-screen sin `AppShell`, centrado vertical y horizontal, fondo `#FBF4EC`, tarjeta centrada `max-width: 440px`. Brand mark propio (cuadrado 58px `linear-gradient(155deg,#F8C3A8,#F2937A)` con sol blanco y sombra `0 12px 26px -10px rgba(238,129,100,.65)`), título Fredoka 32px "Bienvenida a OpenDayCare", subtítulo "Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.", tarjeta de invitación (bg `#fff`, border `#EADFD0`, `border-radius: 16px`, padding 14/16) con avatar Mateo 44px `#A9D9E8/#1F7A93` y texto "Te invitaron a seguir a / Mateo · Sala Soles" (Fredoka), label "CÓDIGO DE INVITACIÓN" + input `7K4P9` (Fredoka 18px, letter-spacing 3px, font-weight 700), label "EMAIL" + input `lucia.fernandez@gmail.com`, label "CREAR CONTRASEÑA" + input password (border `#F2A78E` igual al template), label-checkbox amarillo `#FBF1D6` con cuadrado verde `#5FB97E` y check blanco pre-marcado conteniendo "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.", CTA "Activar mi cuenta" → `/`, link inferior "¿Ya tenés cuenta? Iniciar sesión" → `/login`.
- Metadata: `app/login/page.tsx` → `title: "OpenDayCare · Iniciar sesión"`; `app/activate-account/page.tsx` → `title: "OpenDayCare · Activar cuenta"`.
- No se modifica `app/_components/app-shell.tsx`, `app/_components/sidebar.tsx`, ni `lib/mock/*`. El link de logout del sidebar ya apunta a `/login` (sin cambios).
- `SPEC 03` no introduce tipos ni archivos `lib/mock/*`: los valores son literales del template y viven dentro de cada página.

**Out of scope (para futuros specs):**

- Autenticación real: no hay sesión, cookie, JWT, server action ni route handler. Los CTAs son `<Link>` a `/` que navegan sin validar credenciales.
- Persistencia, base de datos, server actions, route handlers.
- Flujo "¿Olvidaste tu contraseña?" (se renderiza el texto, sin href).
- Validación de formulario, mensajes de error, estados de loading.
- Las otras 13 plantillas de `references/pantallas/` (`agregar-nino`, `avisos`, `crear-publicacion`, `detalle-publicacion`, `familia-cuenta`, `familia-feed`, `foto`, `index`, `mi-cuenta`, `resumen-dia`, `vincular-padre`, más `feed` y `kids` ya cubiertas).
- Layout responsive / breakpoint mobile (los templates son desktop-fixed).
- Modo dark.
- Tests automatizados (no hay runner en `package.json`; verificación visual con Playwright MCP).

## Data model

No se introduce nueva estructura de datos. Los valores son literales del template (`7K4P9`, `lucia.fernandez@gmail.com`, `caro@opendaycare.com`, "Mateo · Sala Soles", texto de autorización). Viven como constantes dentro de `app/login/page.tsx` y `app/activate-account/page.tsx`. El avatar de Mateo reutiliza los hex `#A9D9E8 / #1F7A93` ya presentes en `lib/mock/kids.ts` pero **no se importa** desde ese archivo: se copian inline para mantener este spec autocontenido y porque el significado es "el niño de la invitación", no "el primer niño de la lista de kids".

Decisión explícita: aceptar la duplicación de `#A9D9E8 / #1F7A93` para no generar una dependencia cruzada entre un flujo de auth y la lista de niños hardcodeada. Si más adelante se conecta a DB, ambas pantallas leen del mismo registro y la duplicación desaparece.

## Implementation plan

1. **Reemplazar `app/login/page.tsx`**. Borrar el `import` de `AppShell` y el contenido placeholder. Renderizar un `<div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1.05fr 1fr", background: "#FBF4EC" }}>` con dos hijos: panel izquierdo y formulario derecho. El panel izquierdo contiene los dos círculos decorativos absolutos, el brand mark (cuadrado 46px, sol blanco inline svg igual al del sidebar), título/subtítulo/footer literales. El formulario (max-width 392px, centrado vertical) contiene las labels uppercase `#94887B` 12px peso 700 letter-spacing 0.7px, los inputs con `border: 1.5px solid #EADFD0`, `border-radius: 14px`, `padding: 14px 16px`, `background: #fff`. El CTA y el link "¿Olvidaste tu contraseña?" con los hex exactos del template. El link inferior usa `<Link href="/activate-account">Activá tu cuenta</Link>` con color `#C5503A` peso 800. `export const metadata = { title: "OpenDayCare · Iniciar sesión" };`.
2. **Crear `app/activate-account/page.tsx`**. Layout full-screen flex centered sobre `#FBF4EC`. Tarjeta `max-width: 440px` con brand mark propio (cuadrado 58px + sombra del template), título Fredoka 32px, subtítulo, tarjeta de invitación, los tres inputs con sus labels y el checkbox pre-marcado. CTA `<Link href="/">` "Activar mi cuenta". Link inferior `<Link href="/login">Iniciar sesión</Link>` con color `#C5503A` peso 800. `export const metadata = { title: "OpenDayCare · Activar cuenta" };`.
3. **Verificación**. `npm run build` (incluye typecheck) y `npm run lint` deben pasar en limpio. Capturar dos pantallas a 1280×800 con Playwright MCP y guardar en `.playwright-mcp/`:
   - `/login` → `login.png`
   - `/activate-account` → `activate-account.png`
   
   Comparar contra `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` respectivamente, ajustando px por px hasta coincidir.
4. **Commit hygiene**. Sin commit en este spec (la regla del repo es solo commit cuando el usuario lo pide).

## Acceptance criteria

- [x] `GET /login` renderiza la pantalla completa sin sidebar. Layout en dos columnas (panel naranja izquierdo + form derecho). Panel izquierdo: gradiente exacto `#F6A98E → #F2937A → #EC7E62`, dos círculos decorativos, brand mark 46px, título "El día de cada niño, compartido con su familia.", subtítulo literal, footer "🌿 Guardería Sala Soles".
- [x] El form de login **no** muestra el bloque "INGRESO COMO" con los botones Personal/Familia. Solo aparecen label "EMAIL", label "CONTRASEÑA" y el CTA "Iniciar sesión", en ese orden.
- [x] El input de email de `/login` viene pre-relleno con `caro@opendaycare.com`. El input de password tiene placeholder "••••••••" y queda vacío.
- [x] El CTA "Iniciar sesión" navega a `/`.
- [x] El link inferior "¿Te invitó la guardería? Activá tu cuenta" navega a `/activate-account`.
- [x] El link "¿Olvidaste tu contraseña?" se renderiza con color `#C5503A` y no navega a ningún destino.
- [x] `GET /activate-account` renderiza la pantalla centrada sin sidebar. Tarjeta max-width 440px sobre `#FBF4EC`. Brand mark propio (cuadrado 58px con sombra del template).
- [x] El bloque de invitación muestra avatar "M" 44px con bg `#A9D9E8` y fg `#1F7A93`, texto pequeño "Te invitaron a seguir a" y nombre "Mateo · Sala Soles" en Fredoka.
- [x] El input de "CÓDIGO DE INVITACIÓN" muestra `7K4P9` con font Fredoka, letter-spacing 3px y peso 700.
- [x] El input de email muestra `lucia.fernandez@gmail.com`. El input de password está vacío y tiene border `#F2A78E` (idéntico al template).
- [x] El checkbox de autorización aparece pre-marcado con el cuadrado verde `#5FB97E` y check blanco, sobre fondo amarillo `#FBF1D6`, con el texto literal del template.
- [x] El CTA "Activar mi cuenta" navega a `/`.
- [x] El link inferior "¿Ya tenés cuenta? Iniciar sesión" navega a `/login`.
- [x] Metadata: `<title>` de `/login` es "OpenDayCare · Iniciar sesión"; el de `/activate-account` es "OpenDayCare · Activar cuenta".
- [x] El icono de logout del sidebar (en cualquier ruta autenticada) sigue navegando a `/login` sin cambios.
- [x] Fonts: Fredoka y Nunito se aplican como en SPEC 01/02. No hay `<link>` a Google Fonts en el HTML servido.
- [x] `npm run build` y `npm run lint` finalizan sin errores ni warnings nuevos.
- [x] Capturas de `/login` y `/activate-account` en `.playwright-mcp/login.png` y `.playwright-mcp/activate-account.png` coinciden visualmente con sus templates. Aceptado: drift vertical ~17 px al pie en `/activate-account` (CTA 54px vs 52px; link inferior recortado en 1280×800) por diferencia de métricas entre Fredoka auto-hospedada (`next/font/google`) y la versión CDN que carga `pantallas/support.js`. Resto de paleta, tipografía, radios, sombras, brand mark y posiciones coinciden pixel a pixel.

## Decisions

- **Yes:** dos páginas full-screen independientes, sin `AppShell` ni sidebar. Las dos plantillas son pantallas de auth previas a la sesión y romperían el layout desktop-fixed de SPEC 01 si heredaran el sidebar.
- **Yes:** omitir el selector "INGRESO COMO" del login. Decidido en Phase 2 (pregunta 2). Coherente con el alcance del spec (solo flujo de Personal). El bloque de JavaScript del template que alterna entre rol staff y parent deja de existir con el selector.

- **Yes:** ambos CTAs navegan a `/`. Decidido en Phase 2 (pregunta 3). El feed es la única pantalla post-login implementada.
- **Yes:** ruta `/activate-account` en inglés, alineada con SPEC 02 (`/kids`) en lugar de `/activar-cuenta` de SPEC 01 (`/login`, `/ninos`). Decidido en Phase 2 (pregunta 4). El archivo de login se mantiene en `/login` por compatibilidad con el link de logout del sidebar existente.
- **Yes:** datos literales del template (`7K4P9`, emails, "Mateo · Sala Soles") hardcodeados dentro de cada `page.tsx`. No crean `lib/mock/auth.ts`: no hay tipos compartidos ni reutilización entre las dos pantallas, y agregar un archivo para dos strings sería ruido.
- **Yes:** hex del avatar de Mateo copiados inline en `app/activate-account/page.tsx` en vez de importarlos de `lib/mock/kids.ts`. Evita una dependencia cruzada entre el flujo de auth y la lista de niños; al migrar a DB ambas pantallas leen del mismo registro y la duplicación desaparece.
- **Yes:** sin extracción de componentes compartidos (`AuthShell`, `AuthInput`, `BrandMark`). Las dos pantallas tienen layouts distintos (login = 2 columnas con panel naranja, activar-cuenta = centrada) y solo comparten visualmente el sol del brand mark, que son ~10 líneas de SVG inline. SPEC 02 tampoco extrajo piezas de un solo uso.
- **Yes:** checkbox de foto pre-marcado visualmente. El template lo muestra con check verde; lo renderizamos igual sin estado React (atributo `checked` en el `<input type="checkbox">`, con un `<span>` absoluto encima que muestra el check para que se vea idéntico al template aunque el checkbox nativo esté oculto).
- **No:** mover la paleta al `tailwind.config` / `@theme`. Mismo razonamiento que SPEC 01/02.
- **No:** tests automatizados. El repo no tiene runner configurado.

## Risks

| Risk | Mitigation |
| --- | --- |
| Fidelidad visual imperfecta (sombras, gradientes del panel naranja, peso del CTA, radios de inputs) | Comparar capturas finales con los templates; ajustar px por px hasta coincidir. |
| Hex `#A9D9E8 / #1F7A93` duplicados entre `lib/mock/kids.ts` y `app/activate-account/page.tsx` | Documentado en "Data model". Cuando llegue el spec de DB real, ambas pantallas leen del mismo registro. |
| Link "¿Olvidaste tu contraseña?" sin href puede confundir a un revisor | Aceptado en Phase 2 (pregunta 2 colateral): el flujo vive en otro spec. |
| Activar-cuenta renderiza un flujo de Familia (código, autorización de fotos) pero el login ya no expone Familia | Aceptado por el usuario en la consigna original ("implementar las dos pantallas … no ocupamos la opción de Personal y Familia" se refiere solo al login). El spec reproduce las dos pantallas tal como están diseñadas; la coherencia semántica entre auth/login y auth/activate-account es un tema de producto que excede este spec. |

## What is **not** in this spec

- Autenticación real (sesión, cookie, JWT, server action, route handler).
- Validación de credenciales o mensajes de error del formulario.
- Flujo "¿Olvidaste tu contraseña?".
- Persistencia / base de datos.
- Las 13 pantallas restantes de `references/pantallas/`.
- Layout responsive / breakpoint mobile.
- Modo dark.
- Tests automatizados.

Cada uno, si entra, merece su propio spec.
