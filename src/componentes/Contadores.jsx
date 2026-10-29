import { useEffect, useRef, useState } from 'react';
import Estrella from './Estrella';
import Icono from './Icono';
import { cifras, fechaInicio } from '../data/contenido';
import { reducirMovimiento } from '../utils/ruta';

const dos = (n) => String(n).padStart(2, '0');
const objetivo = new Date(fechaInicio).getTime();

// Número con coma de miles (1390 → "1,390"), también mientras cuenta
const conComa = (n) => n.toLocaleString('en-US');

// Cifra que cuenta de 0 al valor final cuando entra en pantalla
function Cifra({ valor, mas }) {
  const ref = useRef(null);
  const [texto, setTexto] = useState('0');

  useEffect(() => {
    const sufijo = mas ? '+' : '';
    if (reducirMovimiento() || !('IntersectionObserver' in window)) {
      setTexto(conComa(valor) + sufijo);
      return undefined;
    }
    let raf;
    const contar = () => {
      const ini = performance.now();
      const dur = 1800;
      const paso = (ahora) => {
        const p = Math.min((ahora - ini) / dur, 1);
        const e = 1 - (1 - p) ** 4;
        setTexto(conComa(Math.round(valor * e)) + (p === 1 ? sufijo : ''));
        if (p < 1) raf = requestAnimationFrame(paso);
      };
      raf = requestAnimationFrame(paso);
    };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { contar(); io.disconnect(); } }),
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [valor, mas]);

  return <b ref={ref}>{texto}</b>;
}

function calcular() {
  const d = objetivo - Date.now();
  if (d <= 0) return null;
  return {
    dias: Math.floor(d / 864e5),
    h: Math.floor(d / 36e5) % 24,
    m: Math.floor(d / 6e4) % 60,
    s: Math.floor(d / 1e3) % 60,
  };
}

export default function Contadores() {
  const [t, setT] = useState(calcular);

  useEffect(() => {
    const id = setInterval(() => {
      const nuevo = calcular();
      setT(nuevo);
      if (!nuevo) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const empezo = t === null;

  return (
    <section className="seccion fondo-marino contadores corte-izq" id="contadores" aria-labelledby="t-cont">
      <Estrella estilo={{ '--s': '110px', '--c': 'var(--turquesa)', right: '3%', top: '16%', '--t': '24s', opacity: 0.9 }} />
      <Estrella estilo={{ '--s': '60px', '--c': 'var(--amarillo)', left: '4%', bottom: '6%', '--t': '14s' }} />
      <div className="contenedor" style={{ position: 'relative', zIndex: 1 }}>
        <div className="faltan-wrap">
          <div className="faltan rev" role="timer" aria-label="Cuenta regresiva para el inicio de FUCAIN" aria-live="off">
            <span className="faltan__tag">{empezo ? '¡Ya' : 'Faltan'}</span>
            <span className="faltan__n">{empezo ? '🎉' : dos(t.dias)}</span>
            <span className="faltan__tag">{empezo ? 'es FUCAIN!' : t.dias === 1 ? 'Día' : 'Días'}</span>
          </div>
          <div className="faltan__info rev" style={{ '--d': 1 }}>
            <p className="eyebrow">Cuenta regresiva</p>
            <h2 className="titulo" id="t-cont" style={{ color: '#fff' }}>Todo empieza el <span className="c4">10 de noviembre</span></h2>
            <p>
              {empezo
                ? 'El festival ya comenzó: ven a vivir el arte y la cultura. Entrada libre y gratuita.'
                : 'Prepara tu agenda: tres días de arte, cultura e identidad. Entrada libre y gratuita.'}
            </p>
            <div className="hms">
              <div><b>{empezo ? '00' : dos(t.h)}</b><span>Horas</span></div>
              <div><b>{empezo ? '00' : dos(t.m)}</b><span>Minutos</span></div>
              <div><b>{empezo ? '00' : dos(t.s)}</b><span>Segundos</span></div>
            </div>
          </div>
        </div>
        <div className="stats">
          {cifras.map((c, i) => (
            <div className="stat rev" style={{ '--d': i }} key={c.etiqueta}>
              <Icono id={c.icono} />
              <Cifra valor={c.valor} mas={c.mas} />
              <span>{c.etiqueta}</span>
              {c.detalle && <small>{c.detalle}</small>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
