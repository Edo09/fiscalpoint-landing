import { useState, type FormEvent } from 'react'
import { WhatsAppIcon, Phone, Mail, Check } from './icons'
import { WHATSAPP_URL, PHONE_TEL, EMAIL, PHONE_DISPLAY, CONTACT_NAME } from '../data'

// FormSubmit delivers submissions to EMAIL with no backend.
// First real submission triggers a one-time activation email (click to confirm).
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

type Status = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill hidden field → pretend success, send nothing.
    if (data.get('_honey')) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card">
        <div className="sent">
          <span className="sent-icon">
            <Check size={34} color="var(--success)" />
          </span>
          <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 8 }}>¡Solicitud enviada!</h3>
          <p>
            Gracias por tu interés. Te contactaremos muy pronto para coordinar tu demo. ¿Tienes prisa?
            Escríbenos por WhatsApp.
          </p>
          <a
            className="btn btn-primary"
            style={{ marginTop: 20, padding: '11px 20px', fontSize: 14.5 }}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: 19, fontWeight: 650, marginBottom: 4 }}>Solicitar demo</h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginBottom: 20 }}>
          Déjanos tus datos y te contactamos.
        </p>

        {/* FormSubmit config */}
        <input type="hidden" name="_subject" value="Nueva solicitud de demo · FiscalPoint" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        {/* Honeypot: hidden from humans, catches bots */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        <div className="form-fields">
          <div className="form-row">
            <label>
              <span className="field-label">Nombre</span>
              <input className="input" required type="text" name="nombre" autoComplete="name" placeholder="Tu nombre" />
            </label>
            <label>
              <span className="field-label">Empresa</span>
              <input className="input" type="text" name="empresa" autoComplete="organization" placeholder="Tu empresa" />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span className="field-label">RNC</span>
              <input className="input" type="text" name="rnc" inputMode="numeric" placeholder="1-31-xxxxx-x" />
            </label>
            <label>
              <span className="field-label">Teléfono</span>
              <input className="input" type="tel" name="telefono" autoComplete="tel" inputMode="tel" placeholder="809-000-0000" />
            </label>
          </div>
          <label>
            <span className="field-label">Correo</span>
            <input className="input" required type="email" name="correo" autoComplete="email" inputMode="email" placeholder="tucorreo@empresa.do" />
          </label>
          <label>
            <span className="field-label">¿Qué modalidad te interesa?</span>
            <select className="input" name="modalidad" aria-label="¿Qué modalidad te interesa?">
              <option>FiscalPoint Web App</option>
              <option>Integración API</option>
              <option>No estoy seguro / quiero orientación</option>
            </select>
          </label>
          {status === 'error' && (
            <p role="alert" style={{ fontSize: 13, color: 'var(--danger)', margin: 0 }}>
              No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.
            </p>
          )}
          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando…' : 'Solicitar demo'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Contacto() {
  return (
    <section id="contacto" className="container section">
      <div className="contact-grid">
        <div>
          <span className="eyebrow">Hablemos</span>
          <h2 className="req-title">Agenda una evaluación de 30 minutos</h2>
          <p className="req-lead">
            Confirmamos modalidad, estado de tu certificado digital, datos disponibles y fecha objetivo
            de certificación. Sin compromiso.
          </p>
          <div className="contact-channels">
            <a className="channel" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="channel-icon" style={{ background: 'var(--success-soft)' }}>
                <WhatsAppIcon size={22} />
              </span>
              <span>
                <small>WhatsApp</small>
                <strong>{PHONE_DISPLAY}</strong>
              </span>
            </a>
            <a className="channel" href={PHONE_TEL}>
              <span className="channel-icon" style={{ background: 'var(--accent-soft)' }}>
                <Phone size={20} color="var(--accent)" />
              </span>
              <span>
                <small>Teléfono · {CONTACT_NAME}</small>
                <strong>{PHONE_DISPLAY}</strong>
              </span>
            </a>
            <a className="channel" href={`mailto:${EMAIL}`}>
              <span className="channel-icon" style={{ background: 'var(--accent-soft)' }}>
                <Mail size={20} color="var(--accent)" />
              </span>
              <span>
                <small>Correo</small>
                <strong>{EMAIL}</strong>
              </span>
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
