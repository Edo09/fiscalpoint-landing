import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL, APP_URL } from '../data'

// Section links are absolute (`/#id`) so they also work from /blog pages.
const LINKS = [
  { href: '/#novedades', label: 'POS' },
  { href: '/#modalidades', label: 'Modalidades' },
  { href: '/#proceso', label: 'Cómo funciona' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#requisitos', label: 'Requisitos' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const progressRef = useRef<HTMLSpanElement>(null)

  // Compact shadow once scrolled + reading-progress bar (written straight to the DOM per frame).
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 8)
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, y / max) : 0))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Highlight the link of the section currently in the middle of the viewport.
  useEffect(() => {
    setActive('')
    if (pathname !== '/' || !('IntersectionObserver' in window)) return
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(2))).filter(
      (el): el is HTMLElement => el !== null,
    )
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`/#${e.target.id}`)
          else setActive((cur) => (cur === `/#${e.target.id}` ? '' : cur))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Navegación principal">
      <span className="nav-progress" ref={progressRef} aria-hidden="true" />
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
            <a
              key={l.href}
              className={`nav-link${active === l.href ? ' is-active' : ''}`}
              href={l.href}
              aria-current={active === l.href ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
          <Link className={`nav-link${pathname.startsWith('/blog') ? ' is-active' : ''}`} to="/blog">Blog</Link>
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
