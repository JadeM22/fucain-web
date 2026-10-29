import { universidades } from '../data/contenido';
import { ruta } from '../utils/ruta';

export default function CarruselUniversidades() {
  return (
    <section className="unis" id="universidades" aria-labelledby="t-uni">
      <div className="contenedor">
        <div className="cabecera-seccion rev">
          <p className="eyebrow">Nos acompañan</p>
          <h2 className="titulo" id="t-uni">Universidades <span className="c1">participantes</span></h2>
        </div>
      </div>
      <div className="marquee" aria-label="Logos de las universidades participantes" tabIndex={0}>
        <ul className="marquee__track" id="marquee-track">
          {/* La lista se repite dos veces para que el carrusel sea infinito; la copia se oculta a lectores de pantalla */}
          {universidades.map((u) => (
            <li className="uni" key={u.archivo}><img src={ruta(`img/${u.archivo}`)} alt={u.alt} loading="lazy" /></li>
          ))}
          {universidades.map((u) => (
            <li className="uni" aria-hidden="true" key={`copia-${u.archivo}`}><img src={ruta(`img/${u.archivo}`)} alt="" loading="lazy" /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
