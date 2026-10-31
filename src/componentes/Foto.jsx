import { useState } from 'react';
import { ruta } from '../utils/ruta';

// Foto con marco de color y semitono. Si el archivo no existe, muestra un marcador
// de color con el nombre de la foto que falta (public/img/<carpeta>/<archivo>).
// archivo puede ser un solo nombre o un arreglo (p. ej. un escenario con dos áreas):
// con un arreglo se ven lado a lado dentro del mismo recorte.
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
  const archivos = Array.isArray(archivo) ? archivo : [archivo];
  const [vacios, setVacios] = useState(() => archivos.map(() => false));
  const todoVacio = vacios.every(Boolean);
  const clases = ['ph', archivos.length > 1 && 'ph--doble', className, todoVacio && 'vacio'].filter(Boolean).join(' ');

  return (
    <figure className={clases} style={style} {...resto}>
      {archivos.map((a, i) => !vacios[i] && (
        <img
          key={a}
          src={ruta(`img/${carpeta}/${a}`)}
          alt={alt}
          loading={loading}
          onError={() => {
            setVacios((v) => v.map((x, j) => (j === i ? true : x)));
            if (onVacio) onVacio();
          }}
        />
      ))}
      {conEtiqueta && (
        <span className="ph__label">
          <span><b>{numero}</b>Foto {archivos.join(' / ')}</span>
        </span>
      )}
    </figure>
  );
}
