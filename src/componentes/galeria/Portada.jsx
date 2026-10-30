import BotonFucain from '../BotonFucain';
import Estrella from '../Estrella';
import { DIAS } from './datos';

// Portada: título "REVIVE CADA MOMENTO", botón de descarga y 4 tarjetas-filtro (Todas, Día 1, 2 y 3)
export default function Portada({ dia, conteos, total, onElegir, onDescargar }) {
  const tarjetas = [
    { n: 0, nombre: 'Todas', fecha: 'Las tres jornadas', cuenta: total, color: 'var(--tinta)', on: 'var(--blanco)' },
    ...DIAS.map((d) => ({ n: d.n, nombre: d.nombre, fecha: d.fecha, cuenta: conteos[d.n], color: d.color, on: d.on })),
  ];

  return (
    <section className="gp-portada" aria-labelledby="gp-titulo">
      <Estrella estilo={{ '--s': '110px', '--c': 'var(--turquesa)', left: '-34px', bottom: '8%', '--t': '28s' }} />
      <Estrella estilo={{ '--s': '64px', '--c': 'var(--rojo)', right: '4%', top: '12%', '--t': '17s' }} />

      <div className="gp-portada__grid">
        <div className="gp-portada__izq">
          <p className="gp-etiqueta gp-ent" style={{ '--d': 200 }}>Galería · FUCAIN 2026</p>
          <h1 className="gp-h1 gp-ent" id="gp-titulo" style={{ '--d': 290 }}>
            <span>Revive</span>
            <span className="gp-h1__cada">Cada</span>
            <span className="gp-h1__momento">Momento</span>
          </h1>
          <p className="gp-portada__txt gp-ent" style={{ '--d': 400 }}>
            Las fotos de las tres jornadas en resolución original. Míralas, descárgalas y compártelas.
          </p>
          <div className="gp-ent" style={{ '--d': 490 }}>
            <BotonFucain as="button" type="button" color="principal" inc="-1.4deg" icono="i-descargar" onClick={onDescargar}>
              {dia ? `Descargar Día ${dia}` : 'Descargar todo'}
            </BotonFucain>
          </div>
        </div>

        <div className="gp-filtros gp-ent" style={{ '--d': 560 }} role="group" aria-label="Filtrar por día">
          {tarjetas.map((t) => {
            const activa = dia === t.n;
            return (
              <button
                type="button"
                key={t.n}
                className={`gp-filtro${activa ? ' activa' : ''}`}
                style={{ '--c': t.color, '--on': t.on }}
                aria-pressed={activa}
                onClick={() => onElegir(t.n)}
              >
                {activa && <span className="gp-filtro__ins" aria-hidden="true">✓</span>}
                <span className="gp-filtro__nombre">{t.nombre}</span>
                <span className="gp-filtro__fecha">{t.fecha}</span>
                <span className="gp-filtro__num">{t.cuenta}</span>
                <span className="gp-filtro__fotos">{t.cuenta === 1 ? 'foto' : 'fotos'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
