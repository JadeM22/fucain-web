import { useState } from 'react';
import Icono from '../Icono';
import { DIAS } from './datos';

// Rotación leve y repetible (sin azar): depende de la posición de la foto en la lista
const girar = (i) => ((((i * 97) % 61) / 61) * 3.2 - 1.6).toFixed(2);

// Foto del álbum: marco blanco con rotación leve, pie con el día y botón de descarga.
export default function TarjetaFoto({ foto, indice, modoSel, seleccionada, onAbrir, onToggle, onDescargar }) {
  const [rota, setRota] = useState(false);
  const dia = DIAS[foto.dia - 1];

  return (
    <div className="gp-card" style={{ '--rot': `${girar(indice)}deg`, '--c': dia.color, '--i': Math.min(indice, 24) }}>
      <div className={`gp-card__marco${seleccionada ? ' sel' : ''}`}>
        <button
          type="button"
          className="gp-card__foto"
          style={{ aspectRatio: foto.ratio }}
          aria-pressed={modoSel ? seleccionada : undefined}
          aria-label={modoSel
            ? `${seleccionada ? 'Quitar de' : 'Agregar a'} la selección: foto ${foto.numeroDia} del ${dia.nombre}`
            : `Ampliar foto ${foto.numeroDia} del ${dia.nombre}`}
          onClick={(e) => (modoSel ? onToggle(foto) : onAbrir(foto, e.currentTarget.getBoundingClientRect()))}
        >
          {!rota && (
            <img
              src={foto.miniatura}
              alt={`Foto ${foto.numeroDia} del ${dia.nombre} del festival`}
              loading="lazy"
              decoding="async"
              width={foto.ancho}
              height={foto.alto}
              onError={() => setRota(true)}
            />
          )}
          {modoSel && <span className={`gp-check${seleccionada ? ' on' : ''}`} aria-hidden="true">{seleccionada ? '✓' : ''}</span>}
        </button>

        <div className="gp-card__pie">
          <span className="gp-punto" aria-hidden="true" />
          <span className="gp-card__dia">Día {foto.dia} · {dia.corta}</span>
          <button type="button" className="gp-card__dl" aria-label={`Descargar foto ${foto.numeroDia} del ${dia.nombre}`} onClick={() => onDescargar(foto)}>
            <Icono id="i-descargar" />
          </button>
        </div>
      </div>
    </div>
  );
}
