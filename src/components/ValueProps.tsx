import { ShieldCheck, Zap, Layers } from './icons'

const ITEMS = [
  {
    icon: <ShieldCheck size={23} color="var(--accent)" />,
    title: 'Cumplimiento garantizado',
    text: 'Te acompañamos en todas las fases oficiales de certificación e-CF ante la DGII. Tus comprobantes salen firmados y válidos.',
  },
  {
    icon: <Zap size={23} color="var(--accent)" />,
    title: 'Menos trabajo manual',
    text: 'Factura, consulta estados y entrega documentos en segundos. Olvídate de procesos repetitivos y errores de tipeo.',
  },
  {
    icon: <Layers size={23} color="var(--accent)" />,
    title: 'Todo centralizado',
    text: 'Ventas, gastos, clientes, proveedores y documentos recibidos en un solo lugar. Información clara para decidir mejor.',
  },
]

export default function ValueProps() {
  return (
    <section className="container" style={{ paddingTop: 72, paddingBottom: 12 }} aria-labelledby="beneficios-title">
      <h2 id="beneficios-title" className="sr-only">
        Por qué elegir FiscalPoint para tu facturación electrónica en República Dominicana
      </h2>
      <div className="grid-cards">
        {ITEMS.map((it) => (
          <div key={it.title} className="card card-lift">
            <span className="feature-icon">{it.icon}</span>
            <h3 className="feature-title">{it.title}</h3>
            <p className="feature-text">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
