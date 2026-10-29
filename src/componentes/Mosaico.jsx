import Foto from './Foto';

// Cuadrícula de fotos 3:2 (la primera grande). Al tocar una foto se llama a onAbrir(índice).
//   fotos: [{ carpeta, archivo, alt }]
export default function Mosaico({ fotos, onAbrir, id }) {
  return (
    <div className="mosaico" id={id}>
      {fotos.map((f, i) => (
        <button
          className="tile rev"
          type="button"
          aria-label={`Ampliar foto ${i + 1}`}
          onClick={() => onAbrir(i)}
          key={f.archivo}
        >
          <Foto carpeta={f.carpeta} archivo={f.archivo} alt={f.alt} numero={i + 1} />
        </button>
      ))}
    </div>
  );
}
