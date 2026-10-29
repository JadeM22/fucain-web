import { useState } from 'react';
import { ruta } from '../utils/ruta';

// Foto con marco de color y semitono. Si el archivo no existe, muestra un marcador
// de color con el nombre de la foto que falta (public/img/<carpeta>/<archivo>).
export default function Foto({
  archivo,
  carpeta = 'fotos',
  alt = '',
  numero,
  conEtiqueta = true,
  className = '',
  style,
  loading = 'lazy',
  onVacio,
  ...resto
}) {
  const [vacio, setVacio] = useState(false);
  return (
    <figure className={`ph ${className}${vacio ? ' vacio' : ''}`.trim()} style={style} {...resto}>
      {!vacio && (
        <img
          src={ruta(`img/${carpeta}/${archivo}`)}
          alt={alt}
          loading={loading}
          onError={() => {
            setVacio(true);
            if (onVacio) onVacio();
          }}
        />
      )}
      {conEtiqueta && (
        <span className="ph__label">
          <span><b>{numero}</b>Foto {archivo}</span>
        </span>
      )}
    </figure>
  );
}
