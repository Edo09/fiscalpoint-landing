import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ScrollTop from './ScrollTop'
import { useScrollReveal } from '../motion'

/** Site chrome (header + main landmark + footer) shared by every route. */
export default function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useScrollReveal(pathname)

  return (
    <div className="page">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Nav />
      <main id="contenido">{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  )
}
