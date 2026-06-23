import { Box } from './icons'
import { REQUISITOS } from '../data'

export default function Requisitos() {
  return (
    <section id="requisitos" className="section-tint">
      <div className="container section">
        <div className="req-grid">
          <div>
            <span className="eyebrow">Lo que necesitamos de ti</span>
            <h2 className="req-title">Para arrancar sin demoras</h2>
            <p className="req-lead">
              Reúne esta información antes de la configuración técnica y la certificación DGII. Es
              responsabilidad del cliente y nos permite firmar, certificar y operar correctamente.
            </p>
            <div className="note">
              <div className="note-head">
                <Box size={18} color="var(--warning)" />
                ¿Vas a migrar datos?
              </div>
              <p className="note-text">
                Entréganos un backup con clientes, productos, facturas históricas y suplidores.
                Revisamos una muestra y acordamos el alcance exacto antes de importar.
              </p>
            </div>
          </div>
          <div className="req-cards">
            {REQUISITOS.map((r, i) => (
              <div key={r.title} className="req-card">
                <div className="req-card-head">
                  <span className="req-num">{i + 1}</span>
                  <strong>{r.title}</strong>
                </div>
                <span>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
