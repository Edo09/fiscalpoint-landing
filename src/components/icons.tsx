import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    ...props,
  }
}

const strokeProps = {
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function WhatsAppIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })} fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.69-1.45 1.32-1.99 1.36-.53.06-1.03.24-3.47-.72-2.92-1.15-4.8-4.13-4.95-4.32-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .54.01.18.01.41-.07.64.49.25.6.84 2.07.91 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.38 1.47.29.15.46.12.64-.07.18-.19.74-.86.94-1.16.19-.29.39-.24.64-.15.26.09 1.66.78 1.95.93.29.15.48.22.55.34.07.12.07.69-.18 1.38Z" />
    </svg>
  )
}

export function ArrowRight({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke="currentColor" strokeWidth={2.2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ShieldCheck({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function Cloud({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color} strokeWidth={2.2}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9h-1.3A7 7 0 1 0 5 17.7" />
    </svg>
  )
}

export function MessageSquare({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color} strokeWidth={2.2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  )
}

export function Check({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color} strokeWidth={2.4}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function Zap({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  )
}

export function Layers({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

export function AppWindow({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

export function Plug({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <path d="M12 22v-5M9 8V2M15 8V2M18 8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8h12Z" />
    </svg>
  )
}

export function Box({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color} strokeWidth={2.2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    </svg>
  )
}

export function Phone({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export function Mail({ size = 24, color = 'currentColor', ...props }: IconProps & { color?: string }) {
  return (
    <svg {...base({ size, ...props })} {...strokeProps} stroke={color}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}
