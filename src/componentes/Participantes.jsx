import { useState } from 'react';
import Estrella from './Estrella';
import { participantes, textoParticipantes as t } from '../data/contenido';
import { ruta } from '../utils/ruta';

// Franja de color superior de cada tarjeta: rota por la paleta
const FRANJAS = ['var(--rojo)', 'var(--naranja)', 'var(--amarillo)', 'var(--verde)', 'var(--turquesa)', 'var(--celeste)', 'var(--morado)'];

// Logo de la institución; si el archivo no existe (p. ej. UNITEC) se muestra la sigla
function Marca({ p }) {
  const [falla, setFalla] = useState(!p.logo);
  if (falla) {
    return <span className="part__sigla" role="img" aria-label={p.nombre}>{p.sigla}</span>;
  }
  return <img className="part__logo" src={ruta(`img/${p.logo}`)} alt={p.nombre} loading="lazy" onError={() => setFalla(true)} />;
}

// Sección "Participantes" (id="universidades": el menú enlaza ahí). Los datos están en contenido.js
export default function Participantes() {
  return (
    <section className="part" id="universidades" aria-labelledby="t-part">
      <Estrella estilo={{ '--s': '90px', '--c': 'var(--turquesa)', right: '2%', top: '24px', '--t': '24s' }} />

      <div className="part__in">
        <div className="part__txt rev">
          <p className="part__etiqueta">{t.etiqueta}</p>
          <h2 className="part__titulo" id="t-part">
            {t.titulo}<span className="part__marca">{t.resaltado}</span>
          </h2>
          <p className="part__parrafo">{t.parrafo}</p>
          <div className="part__arcoiris" aria-hidden="true">
            {FRANJAS.map((c) => <span key={c} style={{ background: c }} />)}
          </div>
        </div>

        <ul className="part__lista">
          {participantes.map((p, i) => (
            <li
              className="part__li rev"
              key={p.sigla}
              title={p.nombre}
              style={{ '--v': (i % 3) + 1, '--franja': FRANJAS[i % FRANJAS.length], '--i': i + 1 }}
            >
              <div className="part__card"><Marca p={p} /></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
