import { useEffect, useMemo, useRef, useState } from 'react';
import BotonFucain from '../BotonFucain';
import Estrella from '../Estrella';
import TarjetaFoto from './TarjetaFoto';
import { DIAS } from './datos';

const BLOQUE = 24; // fotos que se cargan cada vez (scroll infinito)

// 4, 3, 2 o 1 columnas según el ancho (≥1200 / ≥900 / ≥560)
function useColumnas() {
  const calcular = () => {
    if (window.matchMedia('(min-width: 1200px)').matches) return 4;
    if (window.matchMedia('(min-width: 900px)').matches) return 3;
    if (window.matchMedia('(min-width: 560px)').matches) return 2;
    return 1;
  };
  const [n, setN] = useState(calcular);
  useEffect(() => {
    const alCambiar = () => setN(calcular());
    window.addEventListener('resize', alCambiar);
    return () => window.removeEventListener('resize', alCambiar);
  }, []);
  return n;
}

// Masonry: cada foto va a la columna más corta (se usa el aspect-ratio real), así se conserva el orden de lectura
function repartir(fotos, n) {
  const cols = Array.from({ length: n }, () => ({ alto: 0, items: [] }));
  fotos.forEach((f, indice) => {
    const col = cols.reduce((m, c) => (c.alto < m.alto ? c : m), cols[0]);
    col.items.push({ foto: f, indice });
    col.alto += 1 / f.ratio + 0.3; // 0.3 ≈ marco y pie
  });
  return cols;
}

export default function Album({
  fotos, dia, conteos, total, listo, saliendo, onDia,
  modoSel, onModoSel, seleccion, onToggle, onAbrir, onDescargarFoto, onDescargarVisibles,
}) {
  const nCols = useColumnas();
  const [cuenta, setCuenta] = useState(BLOQUE);
  const [cargando, setCargando] = useState(false);
  const centinela = useRef(null);

  // Al cambiar de filtro se vuelve al primer bloque
  useEffect(() => { setCuenta(BLOQUE); setCargando(false); }, [dia]);

  const mostradas = useMemo(() => fotos.slice(0, cuenta), [fotos, cuenta]);
  const columnas = useMemo(() => repartir(mostradas, nCols), [mostradas, nCols]);
  const quedan = fotos.length > cuenta;

  // Scroll infinito: al llegar al final se cargan 24 fotos más (con esqueletos mientras tanto)
  useEffect(() => {
    if (!quedan || cargando || !centinela.current) return undefined;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      setCargando(true);
      setTimeout(() => { setCuenta((c) => c + BLOQUE); setCargando(false); }, 420);
    }, { rootMargin: '0px 0px 400px 0px' });
    io.observe(centinela.current);
    return () => io.disconnect();
  }, [quedan, cargando, cuenta]);

  const chips = [{ n: 0, texto: 'Todas', cuenta: total, color: 'marino' }, ...DIAS.map((d) => ({ n: d.n, texto: d.nombre, cuenta: conteos[d.n], color: d.boton }))];
  const diaActual = dia ? DIAS[dia - 1] : null;

  return (
    <section className="gp-album fondo-crema corte-der" id="album" aria-labelledby="gp-album-tit">
      <div className="contenedor">
        <div className="gp-album__cab">
          <p className="gp-etiqueta gp-etiqueta--morado">Álbum</p>
          <h2 className="titulo" id="gp-album-tit">Elige, mira y <span className="c2">descarga</span></h2>
        </div>
      </div>

      {/* Barra fija bajo el header */}
      <div className="gp-barra">
        <div className="gp-barra__in">
          <div className="gp-chips" role="group" aria-label="Filtrar por día">
            {chips.map((c) => (
              <BotonFucain
                as="button"
                type="button"
                key={c.n}
                icono={null}
                className="btn--chico"
                color={dia === c.n ? c.color : 'blanco'}
                aria-pressed={dia === c.n}
                onClick={() => onDia(c.n)}
              >
                {c.texto} · {c.cuenta}
              </BotonFucain>
            ))}
          </div>
          <div className="gp-barra__acc">
            <BotonFucain as="button" type="button" icono={null} className="btn--chico" color={modoSel ? 'morado' : 'celeste'} aria-pressed={modoSel} onClick={onModoSel}>
              {modoSel ? 'Listo' : 'Seleccionar'}
            </BotonFucain>
            <BotonFucain as="button" type="button" icono="i-descargar" className="btn--chico" color="principal" onClick={onDescargarVisibles}>
              Descargar
            </BotonFucain>
          </div>
        </div>
      </div>

      <div className="contenedor">
        {fotos.length > 0 ? (
          <div className={`gp-mosaico${saliendo ? ' saliendo' : ''}`} key={dia}>
            {columnas.map((col, c) => (
              <div className="gp-mosaico__col" key={c}>
                {col.items.map(({ foto, indice }) => (
                  <TarjetaFoto
                    key={foto.id}
                    foto={foto}
                    indice={indice}
                    modoSel={modoSel}
                    seleccionada={seleccion.has(foto.id)}
                    onAbrir={onAbrir}
                    onToggle={onToggle}
                    onDescargar={onDescargarFoto}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          listo && (
            <div className="gp-vacio">
              <Estrella estilo={{ '--s': '120px', '--c': diaActual ? diaActual.color : 'var(--turquesa)', '--t': '14s' }} className="gp-vacio__est" />
              <p className="gp-vacio__dia">{diaActual ? `${diaActual.nombre} · ${diaActual.fecha}` : 'Las tres jornadas'}</p>
              <p className="gp-vacio__txt">
                {diaActual ? 'Las fotos de este día se publican al cierre de la jornada.' : 'Las fotos se publican al cierre de cada jornada.'}
              </p>
            </div>
          )
        )}

        {cargando && (
          <div className="gp-esqueletos" aria-hidden="true">
            {Array.from({ length: Math.max(nCols, 2) }, (_, i) => <span className="gp-esqueleto" style={{ '--h': `${190 + ((i * 53) % 90)}px` }} key={i} />)}
          </div>
        )}

        {quedan && <div ref={centinela} className="gp-centinela" aria-hidden="true" />}
        {!quedan && fotos.length > 0 && (
          <p className="gp-fin">Eso es todo · {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}</p>
        )}
      </div>
    </section>
  );
}
