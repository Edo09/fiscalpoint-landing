// Datos de contacto y contenido de la landing de FiscalPoint

export const APP_URL = 'https://app.fiscalpoint.com.do/'
export const WHATSAPP_URL = 'https://wa.me/18494011017'
export const PHONE_TEL = 'tel:+18494011017'
export const PHONE_DISPLAY = '849-401-1017'
export const EMAIL = 'omareogm09@gmail.com'
export const CONTACT_NAME = 'Edwin García'

export interface Step {
  title: string
  text: string
  done?: boolean
}

export const STEPS: Step[] = [
  { title: 'Evaluación inicial', text: 'Revisamos tu operación, tipos de e-CF, volumen y modalidad.' },
  { title: 'Certificado digital', text: 'Configuramos y validamos tu firma electrónica.' },
  { title: 'Certificación DGII', text: 'Fases de prueba, documentos requeridos y seguimiento.' },
  { title: 'Configuración o API', text: 'FiscalPoint, usuarios y secuencias, o conexión de tu sistema.' },
  { title: 'Migración', text: 'Carga de datos si reemplazas tu software actual.' },
  { title: 'Pruebas y capacitación', text: 'Validación operativa con tu equipo administrativo y contable.' },
  { title: 'Producción', text: 'Activamos tu ambiente e-CF con acompañamiento inicial.', done: true },
]

export interface Requisito {
  title: string
  text: string
}

export const REQUISITOS: Requisito[] = [
  { title: 'Certificado digital', text: 'Firma digital vigente del contribuyente y su contraseña.' },
  { title: 'Datos fiscales', text: 'RNC, razón social, dirección, contacto y actividad económica.' },
  { title: 'Formato de factura', text: 'Tu layout actual para preparar la representación impresa.' },
  { title: 'Información DGII', text: 'Datos, formularios y accesos del proceso de certificación.' },
  { title: 'Secuencias e-CF', text: 'Tipos de comprobantes y autorizaciones de secuencias.' },
  { title: 'Responsable', text: 'Persona de contacto para validar pruebas y decisiones.' },
]

export interface Testimonio {
  stars: number
  quote: string
  initials: string
  name: string
  meta: string
}

export const TESTIMONIOS: Testimonio[] = [
  {
    stars: 5,
    quote:
      'La certificación con la DGII fue mucho más simple de lo que esperaba. En pocos días estábamos emitiendo e-CF sin errores.',
    initials: 'MR',
    name: 'María Rodríguez',
    meta: 'Ferretería del Centro · Santiago',
  },
  {
    stars: 5,
    quote:
      'Conectamos nuestro POS por API y todo quedó funcionando. El soporte responde rápido y en español, eso se agradece.',
    initials: 'JP',
    name: 'José Peña',
    meta: 'Distribuidora JP · Santo Domingo',
  },
  {
    stars: 5,
    quote:
      'Como contadora manejo varios clientes y FiscalPoint me deja todo centralizado. Menos trabajo manual, menos errores.',
    initials: 'CL',
    name: 'Carla Liriano',
    meta: 'Firma contable · La Vega',
  },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: '¿Qué es un e-CF y por qué lo necesito?',
    a: 'El e-CF (Comprobante Fiscal Electrónico) es la versión digital y firmada de tus comprobantes ante la DGII. La facturación electrónica es obligatoria de forma escalonada en República Dominicana, y FiscalPoint te prepara para cumplir.',
  },
  {
    q: '¿Cuánto tarda la certificación con la DGII?',
    a: 'Depende del estado de tu certificado digital y de la rapidez con que entregues la información requerida. Con los datos completos, el proceso de fases de prueba suele avanzar en pocos días hábiles.',
  },
  {
    q: 'Ya tengo un sistema. ¿Tengo que cambiarlo?',
    a: 'No necesariamente. Con la Integración API tu ERP, POS o sistema contable sigue funcionando: él envía los datos y nosotros devolvemos el XML firmado y el estado DGII. Si prefieres una plataforma lista, está FiscalPoint Web App.',
  },
  {
    q: '¿Puedo migrar mis datos actuales?',
    a: 'Sí. Si reemplazas tu software, entréganos un backup con clientes, productos, facturas históricas y suplidores. Revisamos una muestra, confirmamos campos obligatorios y acordamos el alcance antes de importar.',
  },
  {
    q: '¿Qué incluye el soporte?',
    a: 'Asistencia ante rechazos, errores o consultas de la DGII, apoyo a usuarios administrativos y contables, y mantenimiento de la plataforma con ajustes operativos.',
  },
]
