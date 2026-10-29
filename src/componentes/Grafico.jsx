import { ruta } from '../utils/ruta';

// Gráfico decorativo de public/img/graficos/ (asteriscos-1, asteriscos-2, asteriscos-3).
// Es sólo decoración: no lleva texto alternativo y lectores de pantalla lo ignoran.
export default function Grafico({ nombre, className = '', estilo, velocidad }) {
  return (
    <img
      className={`grafico ${className}`.trim()}
      src={ruta(`img/graficos/${nombre}.png`)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={estilo}
      data-speed={velocidad}
    />
  );
}
