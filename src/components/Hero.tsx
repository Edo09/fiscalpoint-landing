import { WhatsAppIcon, ArrowRight, ShieldCheck, Cloud, MessageSquare, Check } from './icons'
import { WHATSAPP_URL } from '../data'

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="hero-grid">
        <div>
          <span className="pill">
            <span className="pill-dot" />
            Facturación electrónica e-CF · DGII
          </span>
          <h1 className="hero-title">
            Factura electrónica<br />sin dolores de cabeza.
          </h1>
          <p className="hero-lead">
            Te certificamos ante la <strong>DGII</strong> y te damos una plataforma en la nube para
            emitir, recibir y consultar tus comprobantes fiscales electrónicos. Para PyMEs, contadores
            y empresas con sistema propio.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} />
              Escríbenos por WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href="#contacto">
              Solicitar demo
              <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-trust">
            <span className="trust-item">
              <ShieldCheck size={17} color="var(--success)" />
              Cumple con la DGII
            </span>
            <span className="trust-item">
              <Cloud size={17} color="var(--accent)" />
              100% en la nube
            </span>
            <span className="trust-item">
              <MessageSquare size={17} color="var(--accent)" />
              Soporte en español
            </span>
          </div>
        </div>

        <div className="browser">
          <div className="browser-frame">
            <div className="browser-bar">
              <span className="dot" style={{ background: '#ff5f57' }} />
              <span className="dot" style={{ background: '#febc2e' }} />
              <span className="dot" style={{ background: '#28c840' }} />
              <span className="browser-url">app.fiscalpoint.do</span>
            </div>
            <img src="/assets/fp-dashboard.png" alt="Dashboard de FiscalPoint" className="browser-shot" />
          </div>
          <div className="float-badge">
            <span className="icon-badge" style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--success-soft)' }}>
              <Check size={20} color="var(--success)" />
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>e-CF aceptado</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                B0100000487 · DGII
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
