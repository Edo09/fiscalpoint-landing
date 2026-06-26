import { ShieldCheck } from './icons'
import { WHATSAPP_URL, PHONE_TEL, EMAIL, PHONE_DISPLAY, CONTACT_NAME, APP_URL } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a href="#top" className="footer-brand" aria-label="FiscalPoint — inicio">
            <img
              src="/assets/fp-icon-160.png"
              alt="Logo de FiscalPoint"
              className="footer-logo"
              width={46}
              height={46}
              loading="lazy"
            />
            <span className="brand-word" style={{ fontSize: 19 }}>Fiscal<b>Point</b></span>
          </a>
          <p className="footer-about">
            Facturación electrónica e-CF con cumplimiento DGII para empresas en República Dominicana.
          </p>
          <span className="seal">
            <ShieldCheck size={14} />
            Cumple DGII
          </span>
        </div>
        <div className="footer-col">
          <h2>Producto</h2>
          <div className="footer-col-links">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer">Iniciar sesión</a>
            <a href="#modalidades">Modalidades</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#planes">Planes y precios</a>
            <a href="#requisitos">Requisitos</a>
          </div>
        </div>
        <div className="footer-col">
          <h2>Contacto</h2>
          <div className="footer-col-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp · {PHONE_DISPLAY}</a>
            <a href={PHONE_TEL}>Llamar · {PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>{CONTACT_NAME}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 FiscalPoint · República Dominicana</span>
          <span>Facturación electrónica e-CF · DGII</span>
        </div>
      </div>
    </footer>
  )
}
