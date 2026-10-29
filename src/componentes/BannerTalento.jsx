import BotonFucain from './BotonFucain';
import EnlaceSeccion from './EnlaceSeccion';
import Estrella from './Estrella';
import Foto from './Foto';
import Grafico from './Grafico';
import { talento } from '../data/contenido';

export default function BannerTalento() {
  return (
    <section className="seccion fondo-rojo talento corte-izq" id="talento" aria-labelledby="t-tal">
      <Grafico nombre="asteriscos-3" className="g-talento" />
      <Estrella estilo={{ '--s': '150px', '--c': 'var(--amarillo)', left: '44%', bottom: '-40px', '--t': '28s' }} />
      <Estrella estilo={{ '--s': '70px', '--c': 'var(--celeste)', right: '6%', top: '12%', '--t': '16s' }} />
      <div className="contenedor">
        <div className="talento__grid">
          <div className="rev">
            <p className="eyebrow">{talento.eyebrow}</p>
            <h2 className="titulo" id="t-tal">{talento.linea1} <span>{talento.linea2}</span></h2>
            <p>{talento.texto}</p>
            <BotonFucain as={EnlaceSeccion} id="contacto" color="amarillo">{talento.boton}</BotonFucain>
          </div>
          <div className="talento__foto rev" style={{ '--d': 1 }}>
            <Foto archivo="talento.jpg" alt="Artista universitario presentándose en escena" numero="★" />
            <p className="cinta">Entrada libre y gratuita</p>
          </div>
        </div>
      </div>
    </section>
  );
}
