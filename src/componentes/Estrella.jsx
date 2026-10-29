// Asterisco decorativo flotante. Tamaño (--s), color (--c) y duración (--t) se pasan en "estilo".
export default function Estrella({ estilo, velocidad, className = '' }) {
  return (
    <svg
      className={`estrella ${className}`.trim()}
      aria-hidden="true"
      style={estilo}
      data-speed={velocidad}
    >
      <use href="#estrella" />
    </svg>
  );
}
