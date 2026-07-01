import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import ScrollTop from './ScrollTop'

/** Site chrome (header + main landmark + footer) shared by every route. */
export default function Shell({ children }: { children: ReactNode }) {
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
