import { Link } from 'react-router-dom';
import BotonFucain from './BotonFucain';
import Mosaico from './Mosaico';
import VisorFotos from './VisorFotos';
import useVisor from '../hooks/useVisor';
import { galeria } from '../data/contenido';

// Galería de la portada: 9 fotos destacadas + enlace a la galería completa
const FOTOS = galeria.map((g) => ({ carpeta: 'fotos', archivo: g.foto, alt: g.alt }));

export default function Galeria() {
  const { actual, abrir, cerrar, mover } = useVisor(FOTOS.length);

  return (
    <>
      <section className="seccion fondo-crema galeria corte-der" id="galeria" aria-labelledby="t-gal">
        <div className="contenedor">
          <div className="cabecera-seccion rev">
            <p className="eyebrow">Momentos</p>
            <h2 className="titulo" id="t-gal">Galería del <span className="c3">festival</span></h2>
            <p className="lead">Un anticipo de la fiesta que nos espera. Toca una foto para verla en grande.</p>
          </div>
          <Mosaico fotos={FOTOS} onAbrir={abrir} id="mosaico" />
          <div className="galeria__acciones">
            <BotonFucain as={Link} to="/galeria" color="amarillo" inc="-1.4deg">Ver galería completa</BotonFucain>
          </div>
        </div>
      </section>

      <VisorFotos fotos={FOTOS} actual={actual} onCerrar={cerrar} onMover={mover} />
    </>
  );
}
