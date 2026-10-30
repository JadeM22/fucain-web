import { tiposMapa } from '../../data/contenido';

// Color de un escenario: uno solo, o un degradado de 135° partido 50/50 si tiene dos manifestaciones
export function fondoEscenario(e) {
  const c = e.tipos.map((t) => tiposMapa[t].color);
  return c.length === 1 ? c[0] : `linear-gradient(135deg, ${c[0]} 50%, ${c[1]} 50%)`;
}

export const primerColor = (e) => tiposMapa[e.tipos[0]].color;

export const formatoCapacidad = (n) => n.toLocaleString('en-US');

// Enlace a las rutas de OpenStreetMap (a pie) hacia el escenario
export const urlComoLlegar = (e) => `https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=%3B${e.lat}%2C${e.lon}`;
