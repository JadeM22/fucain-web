import { useCallback, useRef, useState } from 'react';
import { useToasts } from '../componentes/galeria/Toasts';
import { crearZip, guardarBlob, traerBlob } from '../utils/descargas';

// Descarga de fotos sueltas o en ZIP, con modal de progreso, cancelación y avisos.
export default function useDescargas() {
  const { avisar } = useToasts();
  const [progreso, setProgreso] = useState(null); // { titulo, hechas, total, porcentaje }
  const control = useRef(null);

  const una = useCallback(async (foto) => {
    try {
      guardarBlob(await traerBlob(foto.url), foto.nombre);
      avisar('ok', `Descargando ${foto.nombre}`);
    } catch {
      avisar('error', 'No se pudo descargar la foto. Inténtalo de nuevo.');
    }
  }, [avisar]);

  // fotos: lista a descargar · nombreZip: p. ej. fucain-2026_dia-1.zip · titulo: texto del modal
  const varias = useCallback(async (fotos, nombreZip, titulo) => {
    if (!fotos.length) { avisar('info', 'Todavía no hay fotos para descargar.'); return; }
    if (fotos.length === 1) { await una(fotos[0]); return; } // con 1 foto no hace falta ZIP
    const c = new AbortController();
    control.current = c;
    setProgreso({ titulo, hechas: 0, total: fotos.length, porcentaje: 0 });
    try {
      const { blob, fallidas } = await crearZip(fotos, {
        signal: c.signal,
        onProgreso: (hechas, total, porcentaje) => setProgreso({ titulo, hechas, total, porcentaje }),
      });
      guardarBlob(blob, nombreZip);
      avisar('ok', `Listo: ${nombreZip}`);
      if (fallidas) avisar('info', `${fallidas} ${fallidas === 1 ? 'foto no estaba disponible' : 'fotos no estaban disponibles'} y no se incluyeron.`);
    } catch (e) {
      if (e.name === 'AbortError') avisar('info', 'Descarga cancelada.');
      else avisar('error', 'No se pudo crear el ZIP. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      control.current = null;
      setProgreso(null);
    }
  }, [avisar, una]);

  const cancelar = useCallback(() => { if (control.current) control.current.abort(); }, []);

  return { progreso, una, varias, cancelar };
}
