import { tiposMapa } from '../../data/contenido';
import { fondoEscenario } from './utilidades';

// Contenido de un marcador del mapa: punto de color + etiqueta con el nombre (sin números).
// Se dibuja con un portal dentro del elemento que MapLibre ancla en la coordenada exacta.
export default function Marcador({ escenario, indice, hover }) {
  const fondo = fondoEscenario(escenario);
  const [c1, c2] = escenario.tipos.map((t) => tiposMapa[t].color);
  return (
    <span className={`mk__caida${hover ? ' mk__caida--hover' : ''}`} style={{ '--i': indice, '--fondo': fondo, '--aro1': c1, '--aro2': c2 || c1 }}>
      <span className="mk__aro mk__aro--1" aria-hidden="true" />
      <span className="mk__aro mk__aro--2" aria-hidden="true" />
      <span className="mk__pt" aria-hidden="true"><i /></span>
      <span className="mk__eti">
        <i className="mk__ed" aria-hidden="true" />
        {escenario.corto}
      </span>
    </span>
  );
}
