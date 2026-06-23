import { TESTIMONIOS } from '../data'

export default function Testimonios() {
  return (
    <section className="container section">
      <div className="section-head">
        <span className="eyebrow">Quienes ya facturan con nosotros</span>
        <h2 className="section-title">Empresas que confían en FiscalPoint</h2>
      </div>
      <div className="grid-cards">
        {TESTIMONIOS.map((t) => (
          <figure key={t.name} className="quote-card">
            <div className="stars">{'★'.repeat(t.stars)}</div>
            <blockquote className="quote">{t.quote}</blockquote>
            <figcaption className="quote-by">
              <span className="avatar">{t.initials}</span>
              <span>
                <strong>{t.name}</strong>
                <span className="meta">{t.meta}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="fineprint" style={{ fontSize: 12 }}>
        Testimonios de muestra — reemplázalos con clientes reales.
      </p>
    </section>
  )
}
