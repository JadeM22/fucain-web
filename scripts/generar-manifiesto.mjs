// Genera public/galeria/fotos.json leyendo las fotos que hay en public/galeria/dia-1, dia-2 y dia-3.
// Uso:  npm run fotos
//
// Estructura esperada (todo dentro de public/galeria/):
//   dia-1/0001.jpg, dia-1/0002.jpg …        ← fotos originales (resolución completa)
//   dia-1/miniaturas/0001.jpg …             ← (opcional) versiones pequeñas para el álbum y el muro
// Las fotos de cada día se ordenan por nombre. Tipos aceptados: .jpg .jpeg .png .webp
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'galeria');
const EXT = /\.(jpe?g|png|webp)$/i;

// Lee ancho y alto del encabezado del archivo (sin librerías)
function medir(ruta) {
  const b = readFileSync(ruta);
  if (b[0] === 0xff && b[1] === 0xd8) { // JPEG: buscar el marcador SOF
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i += 1; continue; }
      const m = b[i + 1];
      const largo = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { ancho: b.readUInt16BE(i + 7), alto: b.readUInt16BE(i + 5) };
      i += 2 + largo;
    }
  } else if (b.toString('ascii', 1, 4) === 'PNG') { // PNG: bloque IHDR
    return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) };
  } else if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') { // WebP
    const tipo = b.toString('ascii', 12, 16);
    if (tipo === 'VP8X') return { ancho: 1 + b.readUIntLE(24, 3), alto: 1 + b.readUIntLE(27, 3) };
    if (tipo === 'VP8 ') return { ancho: b.readUInt16LE(26) & 0x3fff, alto: b.readUInt16LE(28) & 0x3fff };
    if (tipo === 'VP8L') { const v = b.readUInt32LE(21); return { ancho: (v & 0x3fff) + 1, alto: ((v >> 14) & 0x3fff) + 1 }; }
  }
  return null;
}

const fotos = [];
for (const dia of [1, 2, 3]) {
  const carpeta = join(raiz, `dia-${dia}`);
  if (!existsSync(carpeta)) continue;
  const archivos = readdirSync(carpeta).filter((f) => EXT.test(f) && statSync(join(carpeta, f)).isFile()).sort();
  for (const f of archivos) {
    const tam = medir(join(carpeta, f));
    if (!tam) { console.warn(`  ⚠ No pude leer las medidas de dia-${dia}/${f}; se usará 3:2.`); }
    const foto = { dia, archivo: `dia-${dia}/${f}` };
    if (existsSync(join(carpeta, 'miniaturas', f))) foto.miniatura = `dia-${dia}/miniaturas/${f}`;
    if (tam) { foto.ancho = tam.ancho; foto.alto = tam.alto; }
    fotos.push(foto);
  }
  console.log(`Día ${dia}: ${archivos.length} fotos`);
}

writeFileSync(join(raiz, 'fotos.json'), `${JSON.stringify({ fotos }, null, 2)}\n`);
console.log(`\nListo: public/galeria/fotos.json con ${fotos.length} fotos.`);
