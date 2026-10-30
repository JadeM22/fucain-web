import { useEffect, useState } from 'react';
import { URL_MANIFIESTO, normalizarFotos } from '../componentes/galeria/datos';

// Lee public/galeria/fotos.json (se puede editar sin recompilar). Si no existe o está mal, la galería queda vacía.
export default function useFotosGaleria() {
  const [estado, setEstado] = useState({ listo: false, fotos: [] });

  useEffect(() => {
    let vivo = true;
    fetch(URL_MANIFIESTO, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { fotos: [] }))
      .catch(() => ({ fotos: [] }))
      .then((json) => { if (vivo) setEstado({ listo: true, fotos: normalizarFotos(json) }); });
    return () => { vivo = false; };
  }, []);

  return estado;
}
