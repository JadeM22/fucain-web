import { useEffect, useMemo, useRef, useState } from 'react';
import { DIAS } from './datos';
import { reducirMovimiento } from '../../utils/ruta';

const MAX_FOTOS = 48;

function useColumnasMuro() {
  const calcular = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) return 6;
    if (window.matchMedia('(min-width: 600px)').matches) return 4;
    return 3;
  };
  const [n, setN] = useState(calcular);
  useEffect(() => {
    const alCambiar = () => setN(calcular());
    window.addEventListener('resize', alCambiar);
    return () => window.removeEventListener('resize', alCambiar);
  }, []);
  return n;
}

function Polaroid({ foto, onAbrir, oculta }) {
  if (!foto.url) {
    // Marcador cuando todavía no hay fotos: colores FUCAIN
    return (
      <div className="gp-pola gp-pola--vacia" style={{ '--c': foto.color, aspectRatio: foto.ratio }} aria-hidden="true">
        <span className="gp-pola__estrella" />
      </div>
    );
  }
  const dia = DIAS[foto.dia - 1];
  return (
    <button
      type="button"
      className="gp-pola"
      style={{ '--c': dia.color }}
      tabIndex={oculta ? -1 : 0}
      aria-hidden={oculta || undefined}
      aria-label={oculta ? undefined : `Abrir foto ${foto.numeroDia} del ${dia.nombre}`}
      onClick={(e) => onAbrir(foto, e.currentTarget.querySelector('img').getBoundingClientRect())}
    >
      <img src={foto.miniatura} alt="" loading="lazy" decoding="async" style={{ aspectRatio: foto.ratio }} />
    </button>
  );
}

// Muro 3D: columnas en perspectiva que suben y bajan; se inclina hacia el cursor con física de resorte.
export default function Muro({ fotos, onAbrir }) {
  const nCols = useColumnasMuro();
  const escena = useRef(null);
  const plano = useRef(null);

  // Si aún no hay fotos, se muestran marcadores de color
  const base = useMemo(() => {
    if (fotos.length) return fotos.slice(0, MAX_FOTOS);
    const ratios = [1.5, 0.8, 1.2, 0.75, 1.5, 1];
    return Array.from({ length: 18 }, (_, i) => ({ id: `v${i}`, color: DIAS[i % 3].color, ratio: ratios[i % ratios.length] }));
  }, [fotos]);

  const columnas = useMemo(() => {
    const cols = Array.from({ length: nCols }, () => []);
    base.forEach((f, i) => cols[i % nCols].push(f));
    return cols.map((c) => {
      if (!c.length) return c;
      let lista = c;
      while (lista.length < 6) lista = lista.concat(c); // se repiten para llenar la columna
      return lista;
    });
  }, [base, nCols]);

  // Inclinación hacia el cursor con resorte (requestAnimationFrame). Vuelve a 0 al salir.
  useEffect(() => {
    if (reducirMovimiento()) return undefined;
    const e = escena.current;
    const p = plano.current;
    const est = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    let raf = 0;
    const paso = () => {
      est.vx = (est.vx + (est.tx - est.x) * 0.09) * 0.8;
      est.vy = (est.vy + (est.ty - est.y) * 0.09) * 0.8;
      est.x += est.vx;
      est.y += est.vy;
      p.style.setProperty('--tilt-x', `${est.x.toFixed(3)}deg`);
      p.style.setProperty('--tilt-y', `${est.y.toFixed(3)}deg`);
      const quieto = Math.abs(est.vx) < 0.002 && Math.abs(est.vy) < 0.002
        && Math.abs(est.x - est.tx) < 0.01 && Math.abs(est.y - est.ty) < 0.01;
      raf = quieto ? 0 : requestAnimationFrame(paso);
    };
    const arrancar = () => { if (!raf) raf = requestAnimationFrame(paso); };
    const mover = (ev) => {
      const r = e.getBoundingClientRect();
      est.ty = ((ev.clientX - r.left) / r.width - 0.5) * 18;
      est.tx = -((ev.clientY - r.top) / r.height - 0.5) * 10;
      arrancar();
    };
    const salir = () => { est.tx = 0; est.ty = 0; arrancar(); };
    e.addEventListener('pointermove', mover);
    e.addEventListener('pointerleave', salir);
    return () => {
      e.removeEventListener('pointermove', mover);
      e.removeEventListener('pointerleave', salir);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="gp-muro corte-izq" aria-labelledby="gp-muro-tit">
      <div className="contenedor">
        <div className="gp-muro__cab">
          <h2 className="titulo" id="gp-muro-tit">Todo el festival en <span className="c4">movimiento</span></h2>
        </div>
      </div>

      <div className="gp-muro__escena" ref={escena}>
        <div className="gp-muro__plano" ref={plano}>
          {columnas.map((col, i) => {
            const centro = i - (nCols - 1) / 2;
            return (
              <div
                className="gp-muro__col"
                key={i}
                style={{
                  '--ry': `${(-centro * 7).toFixed(1)}deg`,
                  '--z': `${(-Math.abs(centro) * 34).toFixed(0)}px`,
                  '--dur': `${34 + ((i * 7) % 5) * 6}s`,
                  '--sentido': i % 2 === 0 ? 'normal' : 'reverse',
                }}
              >
                <div className="gp-muro__pista">
                  {[0, 1].map((copia) => (
                    <div className="gp-muro__grupo" key={copia}>
                      {col.map((f, k) => (
                        <Polaroid foto={f} key={`${f.id}-${k}`} onAbrir={onAbrir} oculta={copia === 1} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
