import { Link } from 'react-router-dom';
import BotonFucain from '../BotonFucain';
import EnlaceSeccion from '../EnlaceSeccion';
import Estrella from '../Estrella';
import { ruta } from '../../utils/ruta';

// Cierre morado: invita a volver cada noche
export default function Cierre() {
  return (
    <section className="gp-cierre corte-izq" aria-labelledby="gp-cierre-tit">
      <Estrella estilo={{ '--s': '120px', '--c': 'var(--amarillo)', left: '-30px', top: '30%', '--t': '26s' }} />
      <Estrella estilo={{ '--s': '70px', '--c': 'var(--celeste)', right: '6%', bottom: '14%', '--t': '16s' }} />
      <div className="contenedor gp-cierre__in">
        <div className="gp-cierre__logo" aria-hidden="true">
          <span className="gp-cierre__forma" />
          <img src={ruta('img/logos/fucain-color.png')} alt="" width="500" height="500" />
        </div>
        <p className="gp-etiqueta gp-etiqueta--amarillo">Cada noche, nuevas fotos</p>
        <h2 className="titulo" id="gp-cierre-tit">Vuelve al cierre de cada <span className="c4">jornada</span></h2>
        <div className="gp-cierre__botones">
          <BotonFucain as={EnlaceSeccion} id="cronograma" color="amarillo" inc="-1.4deg">Ver programación</BotonFucain>
          <BotonFucain as={Link} to="/" color="blanco" inc="1.2deg" icono={null}>Volver al inicio</BotonFucain>
        </div>
      </div>
    </section>
  );
}
