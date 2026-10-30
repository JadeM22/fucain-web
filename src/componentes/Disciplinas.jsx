import Icono from './Icono';
import MapaDiferido from './MapaDiferido';
import { disciplinas } from '../data/contenido';

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

        {/* Mapa interactivo de los escenarios (reemplaza al mapa de Google) */}
        <MapaDiferido />
      </div>
    </section>
  );
}
