import Nav from './components/Nav'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import Modalidades from './components/Modalidades'
import Proceso from './components/Proceso'
import Planes from './components/Planes'
import Requisitos from './components/Requisitos'
// import Testimonios from './components/Testimonios'
import Faq from './components/Faq'
import Contacto from './components/Contacto'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <ValueProps />
      <Modalidades />
      <Proceso />
      <Planes />
      <Requisitos />
      {/* <Testimonios /> */}
      <Faq />
      <Contacto />
      <CtaBand />
      <Footer />
    </div>
  )
}
