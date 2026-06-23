import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL } from '../data'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band-glow" />
      <div className="cta-inner">
        <h2 className="cta-title">¿Listo para facturar electrónicamente?</h2>
        <p className="cta-sub">
          Te acompañamos desde la certificación DGII hasta tu primer e-CF en producción. Empieza hoy.
        </p>
        <div className="cta-actions">
          <a className="btn btn-white" href={WHATSAPP_URL} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} />
            Escríbenos por WhatsApp
          </a>
          <a className="btn btn-outline-light" href="#contacto">
            Solicitar demo
          </a>
        </div>
      </div>
    </section>
  )
}
