import Hero from '../componentes/Hero';
import Escenarios from '../componentes/Escenarios';
import Cronograma from '../componentes/Cronograma';
import Contadores from '../componentes/Contadores';
import Galeria from '../componentes/Galeria';
import LogoAnimado from '../componentes/LogoAnimado';
import CarruselUniversidades from '../componentes/CarruselUniversidades';
import BannerDecorativo from '../componentes/BannerDecorativo';
import Disciplinas from '../componentes/Disciplinas';
import SeparadorConfeti from '../componentes/SeparadorConfeti';
import useRevelar from '../hooks/useRevelar';
import useParallax from '../hooks/useParallax';

// Portada: las secciones en el orden en que se ven
export default function Inicio() {
  useRevelar();
  useParallax();
  return (
    <main id="contenido">
      <Hero />
      <Escenarios />
      <SeparadorConfeti nombre="asteriscos-1" ancho="clamp(200px, 30vw, 440px)" k="0.54" lado="izq" x="5%" />
      <Cronograma />
      <Contadores />
      <Galeria />
      <SeparadorConfeti nombre="asteriscos-3" ancho="clamp(70px, 8vw, 120px)" k="1.58" lado="der" x="7%" tiempo="12s" />
      <LogoAnimado />
      <CarruselUniversidades />
      <SeparadorConfeti nombre="asteriscos-2" ancho="clamp(200px, 30vw, 440px)" k="0.54" lado="der" x="6%" tiempo="10s" />
      <BannerDecorativo />
      <Disciplinas />
    </main>
  );
}
