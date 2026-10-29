import { useEffect, useMemo, useRef, useState } from 'react';
import { crearAzar } from '../utils/azar';

// Los 7 colores de la paleta, en ciclo
const COLORES = ['var(--amarillo)', 'var(--turquesa)', 'var(--rojo)', 'var(--morado)', 'var(--verde)', 'var(--celeste)', 'var(--naranja)'];

// Recortes irregulares y asimétricos (trapecios, triángulos y cortes en punta),
// con el mismo aire de las piezas del logo FUCAIN
const FORMAS = [
  'polygon(8% 0, 100% 0, 88% 100%, 0 84%)',
  'polygon(0 0, 100% 10%, 72% 100%, 12% 90%)',
  'polygon(0 0, 100% 0, 36% 100%)',
  'polygon(14% 0, 92% 0, 100% 72%, 48% 100%, 0 66%)',
  'polygon(0 0, 86% 0, 100% 100%, 20% 80%)',
  'polygon(10% 0, 100% 6%, 80% 100%, 0 100%)',
  'polygon(0 6%, 100% 0, 64% 100%)',
  'polygon(6% 0, 100% 0, 94% 60%, 30% 100%, 0 40%)',
];

function crearTiras(cantidad) {
  const azar = crearAzar(2026);
  return Array.from({ length: cantidad }, (_, i) => {
    const paso = 100 / cantidad;
    return {
      x: (i + 0.5) * paso + azar.entre(-0.35, 0.35) * paso, // % del ancho
      w: Math.round(azar.entre(16, 38)),
      h: Math.round(azar.entre(34, 112)),
      inc: azar.entre(-9, 9).toFixed(1),            // inclinación base (grados)
      color: COLORES[i % COLORES.length],
      forma: FORMAS[Math.floor(azar.entre(0, FORMAS.length))],
      balanceo: azar.entre(3, 5.6).toFixed(2),      // segundos del péndulo
    };
  });
}

// Guirnalda de papel picado bajo el encabezado: cae al cargar, se balancea y se desvanece al hacer scroll
export default function Guirnalda() {
  const contenedor = useRef(null);
  const [movil, setMovil] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 759px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 759px)');
    const cambio = (e) => setMovil(e.matches);
    mq.addEventListener('change', cambio);
    return () => mq.removeEventListener('change', cambio);
  }, []);

  useEffect(() => {
    const el = contenedor.current;
    const alScroll = () => {
      const o = Math.max(0, 1 - window.scrollY / 260);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o === 0 ? 'hidden' : 'visible';
    };
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  const tiras = useMemo(() => crearTiras(movil ? 16 : 30), [movil]);

  return (
    <div className="guirnalda" aria-hidden="true" ref={contenedor}>
      {tiras.map((t, i) => (
        <span
          className="tira"
          key={`${movil}-${i}`}
          style={{
            left: `${t.x}%`,
            width: t.w,
            height: t.h,
            background: t.color,
            clipPath: t.forma,
            '--inc': `${t.inc}deg`,
            '--d': `${(i * 0.05).toFixed(2)}s`,
            '--s': `${t.balanceo}s`,
          }}
        />
      ))}
    </div>
  );
}
