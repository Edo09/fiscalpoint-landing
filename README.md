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

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR               |
| `npm run build`   | Type-check (`tsc -b`) + build de producción  |
| `npm run preview` | Sirve el build de `dist/` localmente         |

## Estructura

```
fiscalpoint-app/
├─ public/assets/        Logo y captura del dashboard
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
# fiscalpoint-landing
