import { ArrowRight, InstagramIcon, WhatsAppIcon } from './icons'
import { INSTAGRAM_URL, WHATSAPP_URL } from '../data'

const hasInstagramUrl = INSTAGRAM_URL.trim().length > 0

export default function Novedades() {
  return (
    <section id="novedades" className="announcement band-paper" aria-labelledby="novedades-title">
      <div className="announcement-inner">
        <div className="announcement-copy">
          <span className="eyebrow">Novedades FiscalPoint</span>
          <h2 id="novedades-title" className="announcement-title">
            Conoce el nuevo FiscalPoint POS.
          </h2>
          <p className="announcement-lead">
            Presentamos el nuevo punto de venta de FiscalPoint para negocios que quieren evaluar
            su operación de caja junto a la facturación electrónica: ventas rápidas, cobro en
            efectivo, tarjeta o transferencia y crédito fiscal con RNC. Pide una demo y
            conversemos sobre tu caso.
          </p>
          <div className="announcement-actions">
            <a className="btn btn-primary btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} />
              Preguntar por POS
            </a>
            <a className="btn btn-ghost btn-lg" href="#contacto">
              Solicitar demo
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="announcement-panel" aria-label="Capturas de FiscalPoint POS">
          <div className="pos-shots">
            <figure className="pos-shot pos-shot-main">
              <picture>
                <source srcSet="/assets/fp-pos-venta.webp" type="image/webp" />
                <img
                  src="/assets/fp-pos-venta-opt.png"
                  alt="FiscalPoint POS: catálogo de productos por categoría y venta en curso con subtotal, ITBIS y total"
                  width={1280}
                  height={609}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
            <figure className="pos-shot pos-shot-overlay">
              <picture>
                <source srcSet="/assets/fp-pos-cobro.webp" type="image/webp" />
                <img
                  src="/assets/fp-pos-cobro-opt.png"
                  alt="FiscalPoint POS: pantalla de cobro con efectivo, tarjeta o transferencia y teclado numérico"
                  width={638}
                  height={608}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          </div>

          {hasInstagramUrl && (
            <div className="instagram-card">
              <span className="instagram-icon">
                <InstagramIcon size={22} />
              </span>
              <div>
                <h3>FiscalPoint también llega a Instagram</h3>
                <p>
                  Usaremos este canal para compartir novedades y contenido útil sobre facturación
                  electrónica en República Dominicana.
                </p>
                <a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Seguir en Instagram
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
