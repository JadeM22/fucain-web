import { useEffect, useState } from 'react';
import BotonFucain from './BotonFucain';
import { ruta } from '../utils/ruta';

// Botón que abre un PDF de public/docs/programacion/. Si el PDF no existe, dice "Próximamente".
export default function BotonPdf({ archivo, color, inc, children }) {
  const url = ruta(`docs/programacion/${archivo}`);
  const [existe, setExiste] = useState(true);

  useEffect(() => {
    // Con doble clic en un archivo local (file://) el navegador no deja comprobarlo: se deja el enlace.
    if (window.location.protocol === 'file:') return undefined;
    let vivo = true;
    fetch(url, { method: 'HEAD', cache: 'no-store' })
      .then((r) => {
        const tipo = r.headers.get('content-type') || '';
        if (vivo && (!r.ok || (tipo && !tipo.includes('pdf')))) setExiste(false);
      })
      .catch(() => { if (vivo) setExiste(false); });
    return () => { vivo = false; };
  }, [url]);

  if (!existe) {
    return <span className="btn btn--off" aria-disabled="true">Próximamente</span>;
  }
  return (
    <BotonFucain href={url} target="_blank" rel="noopener noreferrer" color={color} inc={inc} icono="i-ext">
      {children}
    </BotonFucain>
  );
}
