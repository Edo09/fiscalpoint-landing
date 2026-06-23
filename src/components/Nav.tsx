import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL } from '../data'

const LINKS = [
  { href: '#modalidades', label: 'Modalidades' },
  { href: '#proceso', label: 'Cómo funciona' },
  { href: '#planes', label: 'Planes' },
  { href: '#requisitos', label: 'Requisitos' },
  { href: '#faq', label: 'Preguntas' },
]

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <img src="/assets/fp-icon.png" alt="FiscalPoint" className="nav-logo" />
          <span className="brand-word">Fiscal<b>Point</b></span>
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="btn btn-primary nav-cta" href={WHATSAPP_URL} target="_blank" rel="noopener">
          <WhatsAppIcon size={16} />
          WhatsApp
        </a>
      </div>
    </nav>
  )
}
