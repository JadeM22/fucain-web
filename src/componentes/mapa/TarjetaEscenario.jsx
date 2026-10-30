import { useEffect, useState } from 'react';
import BotonFucain from '../BotonFucain';
import EnlaceSeccion from '../EnlaceSeccion';
import Icono from '../Icono';
import { tiposMapa } from '../../data/contenido';
import { ruta } from '../../utils/ruta';
import { fondoEscenario, formatoCapacidad, urlComoLlegar } from './utilidades';

// Ficha del escenario activo: foto, capacidad, nota, manifestaciones y enlaces.
// Barra de progreso inferior: se llena durante la parada del recorrido automático.
export default function TarjetaEscenario({ escenario, indice, total, visible, barra, pausado, onCerrar, onAmpliar }) {
  const [fotoOk, setFotoOk] = useState(true);
  useEffect(() => { setFotoOk(true); }, [escenario.foto]);
  const fondo = fondoEscenario(escenario);
  const url = ruta(`img/escenarios/${escenario.foto}`);

  return (
    <aside className={`me-tarjeta${visible ? ' visible' : ''}`} aria-live="polite" style={{ '--fondo': fondo }}>
      <div className="me-tarjeta__banda" aria-hidden="true" />

      {fotoOk ? (
        <button type="button" className="me-tarjeta__foto" aria-label={`Ampliar la foto de ${escenario.nombre}`} onClick={onAmpliar}>
          <img src={url} alt={`Foto de ${escenario.nombre}`} onError={() => setFotoOk(false)} />
        </button>
      ) : (
        <div className="me-tarjeta__foto me-tarjeta__foto--vacia">
          <span>Foto del escenario próximamente</span>
        </div>
      )}

      <div className="me-tarjeta__cuerpo">
        <div className="me-tarjeta__cab">
          <p className="me-tarjeta__num">Escenario {String(indice + 1).padStart(2, '0')} / {total}</p>
          <button type="button" className="me-tarjeta__x" aria-label="Cerrar y volver a la vista general" onClick={onCerrar}>
            <Icono id="i-x" />
          </button>
        </div>
        <h2 className="me-tarjeta__nombre">{escenario.corto}</h2>
        <p className="me-tarjeta__completo">{escenario.nombre} · {escenario.edificio}</p>

        <p className="me-tarjeta__cap">
          <b>{formatoCapacidad(escenario.capacidad)}</b>
          <span>personas {escenario.modo}</span>
        </p>
        <p className="me-tarjeta__nota">{escenario.nota}</p>

        <ul className="me-tarjeta__chips">
          {escenario.tipos.map((t) => (
            <li key={t} style={{ '--tinte': tiposMapa[t].tinte, '--texto': tiposMapa[t].texto, '--c': tiposMapa[t].color }}>{tiposMapa[t].nombre}</li>
          ))}
        </ul>

        <div className="me-tarjeta__botones">
          <BotonFucain as={EnlaceSeccion} id="cronograma" className="btn--chico">Ver cronograma</BotonFucain>
          <BotonFucain href={urlComoLlegar(escenario)} target="_blank" rel="noopener noreferrer" color="amarillo" icono="i-ext" className="btn--chico">Cómo llegar</BotonFucain>
        </div>
      </div>

      {barra && (
        <div className="me-tarjeta__barra" aria-hidden="true">
          <span key={barra} style={{ animationPlayState: pausado ? 'paused' : 'running' }} />
        </div>
      )}
    </aside>
  );
}
