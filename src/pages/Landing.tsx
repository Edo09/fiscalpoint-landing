import Shell from '../components/Shell'
import Hero from '../components/Hero'
import Modalidades from '../components/Modalidades'
import Proceso from '../components/Proceso'
import Planes from '../components/Planes'
import Requisitos from '../components/Requisitos'
import Faq from '../components/Faq'
import Contacto from '../components/Contacto'
import CtaBand from '../components/CtaBand'

export default function Landing() {
  return (
    <Shell>
      <Hero />
      <Modalidades />
      <Proceso />
      <Planes />
      <Requisitos />
      <Faq />
      <Contacto />
      <CtaBand />
    </Shell>
  )
}
