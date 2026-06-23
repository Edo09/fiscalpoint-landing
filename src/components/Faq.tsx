import { FAQS } from '../data'

export default function Faq() {
  return (
    <section id="faq" className="section-tint">
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px' }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 className="section-title">Resolvemos tus dudas</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details key={f.q} className="faq">
              <summary>
                {f.q}
                <span className="faq-plus">+</span>
              </summary>
              <p className="faq-answer">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
