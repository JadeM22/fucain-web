import { tiposMapa } from '../../data/contenido';

// Color de un escenario: uno solo, o un degradado de 135° partido 50/50 si tiene dos manifestaciones
export function fondoEscenario(e) {
  const c = e.tipos.map((t) => tiposMapa[t].color);
  return c.length === 1 ? c[0] : `linear-gradient(135deg, ${c[0]} 50%, ${c[1]} 50%)`;
}

export const primerColor = (e) => tiposMapa[e.tipos[0]].color;

export const formatoCapacidad = (n) => n.toLocaleString('en-US');
