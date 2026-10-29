import { galeriaCompleta } from '../data/contenido';

// Convierte cada bloque de galeriaCompleta (prefijo + cantidad) en su lista de fotos:
// general-01.jpg, general-02.jpg… dentro de public/img/galeria/
export function fotosDelBloque(bloque) {
  return Array.from({ length: bloque.cantidad }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      carpeta: 'galeria',
      archivo: `${bloque.prefijo}-${n}.jpg`,
      alt: `${bloque.titulo}${bloque.fecha ? ` (${bloque.fecha})` : ''}: foto ${i + 1}`,
      pie: bloque.fecha ? `${bloque.titulo} · ${bloque.fecha}` : bloque.titulo,
    };
  });
}

// Todos los bloques con sus fotos y la posición donde empiezan dentro de la lista completa
export function armarGaleriaCompleta() {
  let inicio = 0;
  return galeriaCompleta.map((b) => {
    const fotos = fotosDelBloque(b);
    const bloque = { ...b, fotos, inicio };
    inicio += fotos.length;
    return bloque;
  });
}
