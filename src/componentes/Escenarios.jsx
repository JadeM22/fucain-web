import Foto from './Foto';
import { escenarios } from '../data/contenido';

// Los escenarios se editan en src/data/contenido.js. Las fotos van en public/img/escenarios/
export default function Escenarios() {
  return (
    <section className="seccion escenarios corte-izq" id="escenarios" aria-labelledby="t-esc">
      <div className="contenedor">
        <div className="cabecera-seccion rev">
          <p className="eyebrow">Lugares de fiesta</p>
          <h2 className="titulo" id="t-esc">Nuestros <span className="c2">escenarios</span></h2>
          <p className="lead">Los espacios de Ciudad Universitaria donde el arte toma la palabra. ¡Ven a recorrerlos!</p>
        </div>
        <div className="esc-grid">
          {escenarios.map((e, i) => (
            <article className="esc rev" style={{ '--d': i % 3 }} key={e.num}>
              <span className="esc__num" aria-hidden="true">{e.num}</span>
              <Foto
                carpeta="escenarios"
                archivo={e.fotos || e.foto}
                alt={`Escenario ${e.num}: ${e.nombre}`}
                numero={e.num}
              />
              <div className="esc__txt">
                <h3>{e.nombre}</h3>
                <p>{e.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
