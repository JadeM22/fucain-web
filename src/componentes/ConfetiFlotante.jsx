import { useMemo } from 'react';
import { crearAzar } from '../utils/azar';

const COLORES = ['var(--amarillo)', 'var(--turquesa)', 'var(--rojo)', 'var(--morado)', 'var(--verde)', 'var(--celeste)', 'var(--naranja)'];
const FORMAS = ['rect', 'rombo', 'arco'];

// Confeti: rectángulos, rombos y arcos en los 7 colores, repartidos de forma irregular
// y fuera de la zona central, para que no tape el texto.
export default function ConfetiFlotante({ cantidad = 24 }) {
  const piezas = useMemo(() => {
    const azar = crearAzar(77);
    const lista = [];
    let intentos = 0;
    while (lista.length < cantidad && intentos < 500) {
      intentos += 1;
      const x = azar.entre(1, 97);
      const y = azar.entre(14, 96);
      const enZonaDeTexto = x > 20 && x < 80 && y > 20 && y < 86;
      if (enZonaDeTexto) continue;
      const i = lista.length;
      lista.push({
        x, y,
        forma: FORMAS[i % FORMAS.length],
        color: COLORES[Math.floor(azar.entre(0, COLORES.length))],
        w: Math.round(azar.entre(12, 30)),
        giro: Math.round(azar.entre(-70, 70)),
        t: azar.entre(4.5, 8.5).toFixed(1),
        retraso: azar.entre(-6, 0).toFixed(1),
      });
    }
    return lista;
  }, [cantidad]);

  return piezas.map((p, i) => (
    <span
      className={`conf conf--${p.forma}`}
      key={i}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        '--c': p.color,
        '--w': `${p.w}px`,
        '--r': `${p.giro}deg`,
        '--t': `${p.t}s`,
        '--d': `${p.retraso}s`,
      }}
    />
  ));
}
