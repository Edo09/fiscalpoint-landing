import type { ReactNode } from 'react'
import { AppWindow, Plug, Check } from './icons'

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li>
      <Check size={18} color="var(--success)" />
      {children}
    </li>
  )
}

export default function Modalidades() {
  return (
    <section id="modalidades" className="container section">
      <div className="section-head">
        <span className="eyebrow">Dos formas de empezar</span>
        <h2 className="section-title">Elige cómo facturar</h2>
        <p className="section-sub">
          Usa nuestra plataforma completa o conecta el sistema que ya tienes. Tú decides según cómo
          trabaja tu empresa.
        </p>
      </div>
      <div className="grid-2-cards">
        {/* App */}
        <div className="mode-card">
          <div style={{ padding: '28px 28px 0' }}>
            <div className="mode-head">
              <span className="mode-name">
                <span className="mode-mark accent">
                  <AppWindow size={19} />
                </span>
                FiscalPoint Web App
              </span>
              <span className="tag accent">RD$ 1,500 / mes</span>
            </div>
            <p className="mode-desc">
              Ideal si quieres <strong>sustituir o complementar</strong> tu software actual con una
              plataforma lista para facturar.
            </p>
            <ul className="check-list" style={{ marginBottom: 24 }}>
              <Bullet>Facturas, clientes, productos y gastos</Bullet>
              <Bullet>Comprobantes recibidos y reportes</Bullet>
              <Bullet>Acceso cloud para todo tu equipo</Bullet>
            </ul>
          </div>
          <picture>
            <source srcSet="/assets/fp-dashboard.webp" type="image/webp" />
            <img
              src="/assets/fp-dashboard-opt.png"
              alt="FiscalPoint Web App: plataforma en la nube para facturación electrónica e-CF"
              className="mode-shot"
              width={1280}
              height={565}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* API */}
        <div className="mode-card">
          <div style={{ padding: 28, flex: 1 }}>
            <div className="mode-head">
              <span className="mode-name">
                <span className="mode-mark dark">
                  <Plug size={19} />
                </span>
                Integración API
              </span>
              <span className="tag neutral">RD$ 1,000 / mes</span>
            </div>
            <p className="mode-desc">
              Ideal si <strong>ya tienes ERP, POS o sistema contable</strong>. Conecta tu sistema y
              nosotros nos encargamos de la parte fiscal.
            </p>
            <ul className="check-list">
              <Bullet>Tu sistema envía datos, recibe XML firmado</Bullet>
              <Bullet>Estado DGII y trazabilidad completa</Bullet>
              <Bullet>Recepción por consulta o webhook</Bullet>
            </ul>
          </div>
          <div className="code-block">
            <span style={{ color: '#7fb1ff' }}>POST</span> /api/ecf/emitir<br />
            <span style={{ color: '#6c7380' }}>{'{ "rnc": "130xxxxx",'}</span><br />
            <span style={{ color: '#6c7380' }}>&nbsp;&nbsp;{'"tipo": "31" }'}</span><br />
            <span style={{ color: 'var(--success)' }}>→ 200 · e-CF aceptado</span>
          </div>
        </div>
      </div>
    </section>
  )
}
