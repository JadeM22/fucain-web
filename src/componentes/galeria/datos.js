// Datos fijos de la galería: los 3 días del festival y la lectura del manifiesto de fotos.
import { ruta } from '../../utils/ruta';

// color/on: color del día y color del texto sobre él (variables de la paleta)
export const DIAS = [
  { n: 1, nombre: 'Día 1', fecha: 'Martes 10 de noviembre', corta: '10 nov', larga: 'Martes 10 de noviembre de 2026', color: 'var(--amarillo)', on: 'var(--tinta)', boton: 'amarillo' },
  { n: 2, nombre: 'Día 2', fecha: 'Miércoles 11 de noviembre', corta: '11 nov', larga: 'Miércoles 11 de noviembre de 2026', color: 'var(--turquesa)', on: 'var(--tinta)', boton: 'turquesa' },
  { n: 3, nombre: 'Día 3', fecha: 'Jueves 12 de noviembre', corta: '12 nov', larga: 'Jueves 12 de noviembre de 2026', color: 'var(--rojo)', on: 'var(--tinta)', boton: 'rojo' },
];

export const URL_MANIFIESTO = ruta('galeria/fotos.json');

const pad4 = (n) => String(n).padStart(4, '0');

// Convierte el contenido de public/galeria/fotos.json en la lista de fotos que usa la página.
// Cada foto: { id, dia, numeroDia, url, miniatura, ancho, alto, ratio, nombre }
export function normalizarFotos(json) {
  const lista = Array.isArray(json) ? json : (json && json.fotos) || [];
  const contador = { 1: 0, 2: 0, 3: 0 };
  const fotos = [];
  lista.forEach((f) => {
    const dia = Number(f.dia);
    if (![1, 2, 3].includes(dia) || !f.archivo) return;
    contador[dia] += 1;
    const ext = (f.archivo.split('.').pop() || 'jpg').toLowerCase();
    const ancho = Number(f.ancho) > 0 ? Number(f.ancho) : 3;
    const alto = Number(f.alto) > 0 ? Number(f.alto) : 2;
    fotos.push({
      id: `${dia}-${contador[dia]}`,
      dia,
      numeroDia: contador[dia],
      url: ruta(`galeria/${f.archivo}`),
      miniatura: ruta(`galeria/${f.miniatura || f.archivo}`),
      ancho,
      alto,
      ratio: ancho / alto,
      // fucain-2026_dia-1_0001.jpg  (la numeración es por día)
      nombre: `fucain-2026_dia-${dia}_${pad4(contador[dia])}.${ext}`,
    });
  });
  return fotos;
}
