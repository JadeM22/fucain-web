import Icono from './Icono';
import { disciplinas, ubicacion } from '../data/contenido';

export default function Disciplinas() {
  return (
    <section className="seccion fondo-crema disciplinas corte-der" id="disciplinas" aria-labelledby="t-disc">
      <div className="contenedor">
        <div className="cabecera-seccion rev">
          <p className="eyebrow">Expresiones</p>
          <h2 className="titulo" id="t-disc">Seis <span className="c2">disciplinas</span>, una identidad</h2>
        </div>
        <div className="disc-grid">
          {disciplinas.map((d, i) => (
            <article className={`disc ${d.clase} rev`} style={{ '--d': i }} key={d.slug}>
              <div className="disc__icono"><Icono id={d.icono} /></div>
              <h3>{d.nombre}</h3>
              <p>{d.texto}</p>
            </article>
          ))}
        </div>

        <div className="mapa" id="ubicacion">
          <div className="rev">
            <p className="eyebrow">Dónde</p>
            <h3>{ubicacion.titulo}</h3>
            <p>{ubicacion.texto}</p>
          </div>
          <div className="mapa__marco rev" style={{ '--d': 1 }}>
            <iframe
              title="Mapa de Ciudad Universitaria UNAH, Tegucigalpa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={ubicacion.mapa}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
