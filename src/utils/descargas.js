// Descargas de la galería: una foto suelta (blob + <a download>) o varias en un ZIP (JSZip, sin comprimir).

export class DescargaCancelada extends Error {
  constructor() { super('Descarga cancelada'); this.name = 'AbortError'; }
}

// Trae el archivo como blob. Si el servidor responde con la página (archivo inexistente) lo trata como error.
export async function traerBlob(url, signal) {
  const r = await fetch(url, { signal, cache: 'no-store' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const tipo = r.headers.get('content-type') || '';
  if (tipo.includes('text/html')) throw new Error('El archivo no existe');
  return r.blob();
}

export function guardarBlob(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// Arma el ZIP con las fotos que sí se pueden descargar. onProgreso(hechas, total, porcentaje)
export async function crearZip(fotos, { signal, onProgreso }) {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  let hechas = 0;
  let fallidas = 0;
  for (const f of fotos) {
    if (signal.aborted) throw new DescargaCancelada();
    try {
      zip.file(f.nombre, await traerBlob(f.url, signal), { binary: true });
    } catch (e) {
      if (e.name === 'AbortError') throw new DescargaCancelada();
      fallidas += 1;
    }
    hechas += 1;
    onProgreso(hechas, fotos.length, Math.round((hechas / fotos.length) * 95));
  }
  if (fallidas === fotos.length) throw new Error('Ninguna foto disponible');
  const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE' });
  if (signal.aborted) throw new DescargaCancelada();
  onProgreso(fotos.length, fotos.length, 100);
  return { blob, fallidas };
}
