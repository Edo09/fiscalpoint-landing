# FiscalPoint — Landing page

Landing comercial de **FiscalPoint**, facturación electrónica e-CF con cumplimiento DGII para República Dominicana. Construida con **Vite + React + TypeScript**.

## Requisitos

- Node.js 18+ (recomendado 20+)

## Empezar

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

## Scripts

| Comando                | Descripción                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo con HMR                                              |
| `npm run build`        | Type-check + optimización de imágenes + build cliente + **prerender (SSG)** |
| `npm run build:client` | Build sólo del cliente (sin prerender), para depurar                       |
| `npm run optimize:img` | Regenera favicons, logo e imágenes optimizadas desde `assets-src/`          |
| `npm run preview`      | Sirve el build de `dist/` localmente                                        |

### Build SEO (prerender)

`npm run build` genera HTML estático: tras el build del cliente, `vite build --ssr
src/entry-server.tsx` produce un bundle de servidor (en `dist-ssr/`, ignorado por git) y
`scripts/prerender.mjs` inyecta el HTML renderizado + el JSON-LD (Schema.org) dentro de
`dist/index.html`. El cliente luego **hidrata** ese HTML — mismo diseño y comportamiento,
pero el contenido y los datos estructurados ya están en el código fuente para buscadores y
vistas previas (WhatsApp/Facebook). Los datos estructurados se generan desde `src/seo.ts`.

## Estructura

```text
fiscalpoint-app/
├─ assets-src/           Imágenes originales (fuente para optimize:img; no se publican)
├─ public/assets/        Logo e imágenes optimizadas (generadas) servidas al cliente
├─ src/
│  ├─ components/        Una sección por archivo (Nav, Hero, Planes, …)
│  │  └─ icons.tsx       Íconos SVG (Lucide-style) tipados
│  ├─ data.ts            Contenido y datos de contacto (un solo lugar)
│  ├─ styles.css         Tokens del sistema de diseño Fiscalo + estilos
│  ├─ App.tsx            Composición de la página
│  └─ main.tsx           Punto de entrada
└─ index.html
```

## Personalizar

- **Contenido / contacto:** edita `src/data.ts` (WhatsApp, teléfono, correo, planes, FAQ, testimonios).
- **Colores y tipografía:** variables CSS en `:root` dentro de `src/styles.css` (tokens del sistema Fiscalo).
- **Imágenes:** reemplaza los archivos en `public/assets/`.
- **Formulario de demo:** `src/components/Contacto.tsx` → `handleSubmit` (conéctalo a tu backend o servicio de correo).

> Los testimonios son de muestra; sustitúyelos por clientes reales.
