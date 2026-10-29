import { useEffect, useState } from 'react';
import BotonFucain from './BotonFucain';
import Icono from './Icono';
import { ruta } from '../utils/ruta';

// Botón para descargar un archivo de public/descargas/ (por ejemplo el .zip con todas las fotos).
// Si el archivo todavía no existe, el botón se queda visible pero desactivado y avisa "próximamente"
// (igual que los PDF del cronograma), así siempre se sabe que habrá descarga.
export default function BotonDescarga({ archivo, color, inc, children }) {
  const url = ruta(`descargas/${archivo}`);
  const [existe, setExiste] = useState(true);

  useEffect(() => {
    // Con doble clic en un archivo local (file://) el navegador no deja comprobarlo: se deja el enlace.
    if (window.location.protocol === 'file:') return undefined;
    let vivo = true;
    fetch(url, { method: 'HEAD', cache: 'no-store' })
      .then((r) => {
        const tipo = r.headers.get('content-type') || '';
        // Un servidor que devuelve la página (text/html) cuando falta el archivo cuenta como "no existe"
        if (vivo && (!r.ok || tipo.includes('text/html'))) setExiste(false);
      })
      .catch(() => { if (vivo) setExiste(false); });
    return () => { vivo = false; };
  }, [url]);

  if (!existe) {
    return (
      <span className="btn btn--off" aria-disabled="true">
        <Icono id="i-descargar" />
        {children} · próximamente
      </span>
    );
  }
  return (
    <BotonFucain href={url} download={archivo} color={color} inc={inc} icono="i-descargar">
      {children}
    </BotonFucain>
  );
}
