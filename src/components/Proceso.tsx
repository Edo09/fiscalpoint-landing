import { STEPS } from '../data'
import { Check } from './icons'

export default function Proceso() {
  return (
    <section id="proceso" className="band-navy">
      <div className="container section">
        <div className="section-head" style={{ marginBottom: 52 }}>
          <span className="eyebrow">Proceso de implementación</span>
          <h2 className="section-title">De cero a facturando</h2>
          <p className="section-sub">
            Un camino claro y acompañado, paso a paso, hasta que emitas tu primer e-CF en producción.
          </p>
        </div>
        <div className="grid-steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className={`step${step.done ? ' step-final' : ''}`}>
              <span className={`step-num${step.done ? ' done' : ''}`}>
                {step.done ? (
                  <>
                    <Check size={20} />
                    <span className="sr-only">{i + 1}</span>
                  </>
                ) : (
                  i + 1
                )}
              </span>
              <div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
