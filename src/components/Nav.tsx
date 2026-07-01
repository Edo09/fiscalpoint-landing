import { Link } from 'react-router-dom'
import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL, APP_URL } from '../data'

// Section links are absolute (`/#id`) so they also work from /blog pages.
const LINKS = [
  { href: '/#modalidades', label: 'Modalidades' },
  { href: '/#proceso', label: 'Cómo funciona' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#requisitos', label: 'Requisitos' },
]

export default function Nav() {
  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label="FiscalPoint — inicio">
          <img
            src="/assets/fp-icon-160.png"
            alt="Logo de FiscalPoint, facturación electrónica e-CF"
            className="nav-logo"
            width={60}
            height={60}
          />
          <span className="brand-word">Fiscal<b>Point</b></span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
          <Link className="nav-link" to="/blog">Blog</Link>
        </div>
        <div className="nav-actions">
          <a
            className="btn btn-ghost nav-cta nav-login"
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar sesión
          </a>
          <a
            className="btn btn-primary nav-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
