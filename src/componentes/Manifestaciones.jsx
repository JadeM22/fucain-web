import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BotonFucain from './BotonFucain';
import BotonPdf from './BotonPdf';
import Estrella from './Estrella';
import { manifestaciones } from '../data/contenido';
import { ruta } from '../utils/ruta';

// Capa 3: ilustración o foto anclada abajo. Si el archivo no existe, un marcador con los colores FUCAIN.
function Imagen({ archivo }) {
  const [falta, setFalta] = useState(false);
  if (falta) {
    return (
      <figure className="ph vacio manif__img manif__img--vacia">
        <span className="ph__label"><span><b>★</b>Imagen {archivo}</span></span>
      </figure>
    );
  }
  return (
    <img
      className="manif__img"
      src={ruta(`img/manifestaciones/${archivo}`)}
      alt=""
      loading="lazy"
      onError={() => setFalta(true)}
    />
  );
}

// Sección "Elige tu manifestación": 3 tarjetas en acordeón horizontal.
// Los textos, imágenes y enlaces se editan en src/data/contenido.js (manifestaciones).
export default function Manifestaciones() {
  // Una sola tarjeta activa (la primera por defecto); al salir, la última activa se queda abierta
  const [activa, setActiva] = useState(0);

  // Entrada con el scroll: la fila aparece una vez, al entrar en pantalla
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
    <div className="manif">
      <Estrella estilo={{ '--s': '90px', '--c': 'var(--turquesa)', left: '-26px', top: '6%', '--t': '26s' }} />
      <Estrella estilo={{ '--s': '56px', '--c': 'var(--rojo)', right: '5%', top: '3%', '--t': '16s' }} />

      <div className="contenedor">
        <div className="cabecera-seccion rev">
          <p className="eyebrow">Expresiones</p>
          <h2 className="titulo" id="t-manif">Elige tu <span className="c2">manifestación</span></h2>
        </div>

        <div className={`manif__fila${visible ? ' visible' : ''}`} ref={fila}>
          {manifestaciones.map((m, i) => (
            <div className={`manif__item${activa === i ? ' activa' : ''}`} key={m.titulo}>
              <article
                className="manif__card"
                style={{ '--c': m.color, '--f': m.figura }}
                onMouseEnter={() => setActiva(i)}
                onFocus={() => setActiva(i)}
              >
                <span className="manif__figura" aria-hidden="true" />
                <Imagen archivo={m.imagen} />
                <span className="manif__velo" aria-hidden="true" />
                <span className="esc__num manif__num" aria-hidden="true">{m.num}</span>

                <div className="manif__txt">
                  <h3>{m.titulo}</h3>
                  {m.incluye && <p className="manif__incluye">{m.incluye}</p>}
                  <p className="manif__desc">{m.texto}</p>
                  {m.pdf ? (
                    <BotonPdf archivo={m.pdf} color="amarillo">Ver programación</BotonPdf>
                  ) : (
                    <BotonFucain as={Link} to={m.ruta} color="amarillo">Ver programación</BotonFucain>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
