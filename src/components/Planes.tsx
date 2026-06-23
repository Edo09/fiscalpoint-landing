import { WHATSAPP_URL } from '../data'

export default function Planes() {
  return (
    <section id="planes" className="container section">
      <div className="section-head">
        <span className="eyebrow">Inversión</span>
        <h2 className="section-title">Precios claros, sin sorpresas</h2>
        <p className="section-sub">
          Una certificación de pago único y una suscripción mensual según la modalidad que elijas.
        </p>
      </div>
      <div className="grid-plans">
        <div className="plan card-lift">
          <span className="plan-kicker">Pago único</span>
          <h3 className="plan-name">Certificación DGII e-CF</h3>
          <p className="plan-desc">Acompañamiento completo en el proceso oficial de certificación.</p>
          <div className="plan-price">
            <span className="plan-amount num">RD$ 2,000</span>
            <span className="plan-period">único</span>
          </div>
          <a className="btn btn-ghost plan-cta" href="#contacto">Iniciar certificación</a>
        </div>

        <div className="plan featured card-lift">
          <span className="plan-flag">MÁS POPULAR</span>
          <span className="plan-kicker accent">Plataforma completa</span>
          <h3 className="plan-name">FiscalPoint Web App</h3>
          <p className="plan-desc">Factura, gestiona y reporta desde la nube. Todo incluido.</p>
          <div className="plan-price">
            <span className="plan-amount num">RD$ 1,500</span>
            <span className="plan-period">/ mes</span>
          </div>
          <a className="btn btn-primary plan-cta" href={WHATSAPP_URL} target="_blank" rel="noopener">
            Empezar ahora
          </a>
        </div>

        <div className="plan card-lift">
          <span className="plan-kicker">Conecta tu sistema</span>
          <h3 className="plan-name">Integración API</h3>
          <p className="plan-desc">Para empresas con ERP, POS o contabilidad propia.</p>
          <div className="plan-price">
            <span className="plan-amount num">RD$ 1,000</span>
            <span className="plan-period">/ mes</span>
          </div>
          <a className="btn btn-ghost plan-cta" href="#contacto">Conectar mi sistema</a>
        </div>
      </div>
      <p className="fineprint">
        Precios en pesos dominicanos (DOP). La certificación se paga una sola vez; la mensualidad
        depende de la modalidad.
      </p>
    </section>
  )
}
