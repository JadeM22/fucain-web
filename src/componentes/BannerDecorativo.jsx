import BotonFucain from './BotonFucain';
import EnlaceSeccion from './EnlaceSeccion';
import Estrella from './Estrella';
import Foto from './Foto';
import Grafico from './Grafico';
import { bannerDecorativo } from '../data/contenido';

export default function BannerDecorativo() {
  return (
    <section className="seccion fondo-rojo banner-decorativo corte-izq" id="banner-decorativo" aria-labelledby="t-banner">
      <Grafico nombre="asteriscos-3" className="g-banner-decorativo" />
      <Estrella estilo={{ '--s': '150px', '--c': 'var(--amarillo)', left: '44%', bottom: '-40px', '--t': '28s' }} />
      <Estrella estilo={{ '--s': '70px', '--c': 'var(--celeste)', right: '6%', top: '12%', '--t': '16s' }} />
      <div className="contenedor">
        <div className="banner-decorativo__grid">
          <div className="rev">
            <p className="eyebrow">{bannerDecorativo.eyebrow}</p>
            <h2 className="titulo" id="t-banner">{bannerDecorativo.linea1} <span>{bannerDecorativo.linea2}</span></h2>
            <p>{bannerDecorativo.texto}</p>
            {/* Con HashRouter la "#" es de la ruta: EnlaceSeccion hace el scroll (suave) por código */}
            <BotonFucain as={EnlaceSeccion} id="programacion" color="amarillo">{bannerDecorativo.boton}</BotonFucain>
          </div>
          <div className="banner-decorativo__foto rev" style={{ '--d': 1 }}>
            <Foto archivo="talento.jpg" alt="Artista universitario presentándose en escena" numero="★" />
            <p className="cinta">Entrada libre y gratuita</p>
          </div>
        </div>
      </div>
    </section>
  );
}
