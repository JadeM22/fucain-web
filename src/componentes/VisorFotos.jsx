import { useEffect, useRef, useState } from 'react';
import Foto from './Foto';
import Icono from './Icono';
import { ruta } from '../utils/ruta';

// Visor de fotos ampliadas (lightbox) con flechas, teclado, gesto de deslizar
// y botón "Descargar" siempre visible (se desactiva si la foto aún no existe).
//   fotos: [{ carpeta, archivo, alt, pie? }] · actual: índice abierto o null · onCerrar / onMover(delta)
export default function VisorFotos({ fotos, actual, onCerrar, onMover }) {
  const abierto = actual !== null;
  const visor = useRef(null);
  const x0 = useRef(null);
  const [sinFoto, setSinFoto] = useState(false);

  useEffect(() => { setSinFoto(false); }, [actual]);

  // Al abrir: bloquear scroll, enfocar "cerrar" y activar teclado (Esc, flechas, Tab)
  useEffect(() => {
    if (!abierto) return undefined;
    document.body.style.overflow = 'hidden';
    visor.current.querySelector('.lb-cerrar').focus();
    const tecla = (e) => {
      if (e.key === 'Escape') onCerrar();
      else if (e.key === 'ArrowLeft') onMover(-1);
      else if (e.key === 'ArrowRight') onMover(1);
      else if (e.key === 'Tab') {
        const f = visor.current.querySelectorAll('button, a[href]');
        const primero = f[0];
        const ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    };
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('keydown', tecla);
      document.body.style.overflow = '';
    };
  }, [abierto, onCerrar, onMover]);

  const foto = abierto ? fotos[actual] : null;
  const url = foto ? ruta(`img/${foto.carpeta}/${foto.archivo}`) : undefined;

  return (
    <div
      className={`lightbox${abierto ? ' abierto' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      hidden={!abierto}
      ref={visor}
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (x0.current === null) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > 50) onMover(dx < 0 ? 1 : -1);
        x0.current = null;
      }}
    >
      <button className="lb-btn lb-cerrar" type="button" aria-label="Cerrar" onClick={onCerrar}><Icono id="i-x" /></button>
      <button className="lb-btn lb-prev" type="button" aria-label="Foto anterior" onClick={() => onMover(-1)}><Icono id="i-izq" /></button>
      <div className="lightbox__marco">
        {foto && (
          <Foto
            key={actual}
            carpeta={foto.carpeta}
            archivo={foto.archivo}
            alt={foto.alt}
            numero={actual + 1}
            loading="eager"
            onVacio={() => setSinFoto(true)}
          />
        )}
      </div>
      <button className="lb-btn lb-next" type="button" aria-label="Foto siguiente" onClick={() => onMover(1)}><Icono id="i-der" /></button>

      {/* Descargar: siempre visible; si la foto aún no existe queda desactivado */}
      {foto && (sinFoto ? (
        <span className="lb-btn lb-descargar lb-descargar--off" aria-disabled="true">
          <Icono id="i-descargar" /> Foto próximamente
        </span>
      ) : (
        <a className="lb-btn lb-descargar" href={url} download={foto.archivo}>
          <Icono id="i-descargar" /> Descargar
        </a>
      ))}

      <p className="lightbox__pie" aria-live="polite">
        {abierto ? `${actual + 1} / ${fotos.length}${foto.pie ? ` · ${foto.pie}` : ''}` : ''}
      </p>
    </div>
  );
}
