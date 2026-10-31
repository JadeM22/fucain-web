import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BotonFucain from './BotonFucain';
import BotonPdf from './BotonPdf';
import Estrella from './Estrella';
import { programacion } from '../data/contenido';

export default function Programacion() {
  // Acordeón horizontal: una sola tarjeta activa (por defecto la primera). La última activa se queda abierta.
  const [activa, setActiva] = useState(0);

  // Entrada con el scroll: la fila completa aparece una vez, al entrar en pantalla
  const fila = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisible(true); return undefined; }
    const io = new IntersectionObserver(
      (es) => { if (es[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(fila.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="seccion fondo-amarillo corte-der" id="programacion" aria-labelledby="t-prog" style={{ position: 'relative' }}>
      <Estrella estilo={{ '--s': '130px', '--c': 'var(--turquesa)', left: '-30px', top: '18%', '--t': '30s' }} />
      <Estrella estilo={{ '--s': '80px', '--c': 'var(--rojo)', right: '4%', top: '14%', '--t': '18s' }} />
      <div className="contenedor" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cabecera-seccion rev">
          <p className="eyebrow" style={{ color: 'var(--marino)' }}>Programación</p>
          <h2 className="titulo" id="t-prog">Consulta la <span style={{ color: 'var(--rojo)' }}>programación</span></h2>
        </div>
        <div className={`prog-grid${visible ? ' visible' : ''}`} ref={fila}>
          {programacion.map((c, i) => (
            <article
              className={`tarjeta-prog${activa === i ? ' activa' : ''}`}
              key={c.titulo}
              tabIndex={0}
              onMouseEnter={() => setActiva(i)}
              onFocus={() => setActiva(i)}
            >
              <svg className="garabato" aria-hidden="true" viewBox="0 0 120 120"><use href="#garabato" /></svg>
              <svg className="estrella" aria-hidden="true"><use href="#estrella" /></svg>
              <span className="tarjeta-prog__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className="tarjeta-prog__tag">{c.etiqueta}</p>
              <h3>{c.titulo}</h3>
              <p className="tarjeta-prog__desc">{c.texto}</p>
              <span className="espacio" />
              {c.pdf ? (
                <BotonPdf archivo={c.pdf} color={c.color}>Ver PDF</BotonPdf>
              ) : (
                <BotonFucain as={Link} to={c.ruta} color={c.color}>Entrar</BotonFucain>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
