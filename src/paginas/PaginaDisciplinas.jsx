import BotonPdf from '../componentes/BotonPdf';
import EnlaceSeccion from '../componentes/EnlaceSeccion';
import Estrella from '../componentes/Estrella';
import Foto from '../componentes/Foto';
import Icono from '../componentes/Icono';
import { disciplinas } from '../data/contenido';
import useRevelar from '../hooks/useRevelar';

function TarjetaDisciplina({ d, indice }) {
  return (
    <article className={`dcard ${d.clase} rev`} style={{ '--d': indice % 3 }}>
      <Foto archivo={`disciplina-${d.slug}.jpg`} conEtiqueta={false} aria-hidden="true" />
      <svg className="garabato" aria-hidden="true" viewBox="0 0 120 120"><use href="#garabato" /></svg>
      <div className="dcard__icono"><Icono id={d.icono} /></div>
      <h2>{d.nombre}</h2>
      <p>{d.textoPagina || d.texto}</p>
      <span className="espacio" />
      <BotonPdf archivo={`${d.slug}.pdf`}>Ver programación (PDF)</BotonPdf>
    </article>
  );
}

// Página /disciplinas: programación por disciplina (un PDF por cada una)
export default function PaginaDisciplinas() {
  useRevelar();
  return (
    <main id="contenido">
      <section className="pag-cabecera" aria-labelledby="t-pag">
        <Estrella estilo={{ '--s': '120px', '--c': 'var(--amarillo)', left: '-30px', top: '30%', '--t': '26s' }} />
        <Estrella estilo={{ '--s': '70px', '--c': 'var(--rojo)', right: '8%', top: '22%', '--t': '16s' }} />
        <Estrella estilo={{ '--s': '100px', '--c': 'var(--turquesa)', right: '-24px', bottom: '10%', '--t': '22s' }} />
        <div className="contenedor">
          <div className="volver-wrap">
            <EnlaceSeccion id="programacion" className="volver">
              <Icono id="i-flecha" style={{ transform: 'scaleX(-1)' }} /> Volver al inicio
            </EnlaceSeccion>
          </div>
          <p className="eyebrow">Programación por disciplina</p>
          <h1 className="titulo" id="t-pag">Elige tu <span className="c2">disciplina</span> artística</h1>
          <p className="lead">Música, teatro, danza, artes visuales, literatura y cinematografía: descubre la programación de cada disciplina del festival.</p>
        </div>
      </section>
      <section className="disc-pag corte-izq" aria-label="Disciplinas del festival" style={{ paddingTop: 'calc(var(--corte) + 3rem)' }}>
        <div className="contenedor">
          <div className="grid">
            {disciplinas.map((d, i) => <TarjetaDisciplina d={d} indice={i} key={d.slug} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
