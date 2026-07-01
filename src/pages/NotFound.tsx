import { Link } from 'react-router-dom'
import Shell from '../components/Shell'

export default function NotFound() {
  return (
    <Shell>
      <section className="container section" style={{ textAlign: 'center', maxWidth: 640 }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Error 404</span>
        <h1 className="section-title" style={{ marginTop: 12 }}>Página no encontrada</h1>
        <p className="section-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          La página que buscas no existe o fue movida. Vuelve al inicio o explora el blog.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
          <Link className="btn btn-primary btn-lg" to="/">Ir al inicio</Link>
          <Link className="btn btn-ghost btn-lg" to="/blog">Ver el blog</Link>
        </div>
      </section>
    </Shell>
  )
}
