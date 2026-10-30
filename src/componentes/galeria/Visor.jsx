import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import BotonFucain from '../BotonFucain';
import Icono from '../Icono';
import { DIAS } from './datos';
import { reducirMovimiento } from '../../utils/ruta';

// Visor de pantalla completa: apertura desde la miniatura (FLIP), miniaturas abajo, flechas, teclado y deslizar.
//   fotos: lista que se recorre · inicio: foto abierta · origen: rectángulo de la miniatura clicada
export default function Visor({ fotos, inicio, origen, onCerrar, onDescargar }) {
  const [i, setI] = useState(inicio);
  const [cargada, setCargada] = useState(false);
  const [falla, setFalla] = useState(false);
  const marco = useRef(null);
  const cerrar = useRef(null);
  const raiz = useRef(null);
  const tira = useRef(null);
  const x0 = useRef(null);

  const total = fotos.length;
  const foto = fotos[i];
  const dia = DIAS[foto.dia - 1];
  const ir = useCallback((d) => setI((v) => (v + d + total) % total), [total]);

  useEffect(() => { setCargada(false); setFalla(false); }, [i]);

  // Bloquear el scroll de la página; foco al botón cerrar y devolverlo al cerrar
  useEffect(() => {
    const previo = document.activeElement;
    document.body.style.overflow = 'hidden';
    cerrar.current.focus();
    return () => {
      document.body.style.overflow = '';
      if (previo && previo.focus) previo.focus();
    };
  }, []);

  // Teclado: Esc cierra, flechas navegan (en bucle), Tab se queda dentro del visor
  useEffect(() => {
    const tecla = (e) => {
      if (e.key === 'Escape') onCerrar();
      else if (e.key === 'ArrowLeft') ir(-1);
      else if (e.key === 'ArrowRight') ir(1);
      else if (e.key === 'Tab') {
        const f = raiz.current.querySelectorAll('button, a[href]');
        const primero = f[0];
        const ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [ir, onCerrar]);

  // Apertura FLIP: la foto crece desde la posición de la miniatura en 560 ms
  useLayoutEffect(() => {
    if (!origen || reducirMovimiento() || !marco.current || !marco.current.animate) return;
    const t = marco.current.getBoundingClientRect();
    const dx = origen.left + origen.width / 2 - (t.left + t.width / 2);
    const dy = origen.top + origen.height / 2 - (t.top + t.height / 2);
    const sx = origen.width / t.width;
    const sy = origen.height / t.height;
    marco.current.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.6 }, { transform: 'none', opacity: 1 }],
      { duration: 560, easing: 'cubic-bezier(.23, 1, .32, 1)' },
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // La miniatura activa se centra en la tira
  useEffect(() => {
    const el = tira.current && tira.current.children[i];
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reducirMovimiento() ? 'auto' : 'smooth' });
  }, [i]);

  return (
    <div
      className="gp-visor"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      ref={raiz}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (x0.current === null) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
        x0.current = null;
      }}
    >
      <div className="gp-visor__top">
        <p className="gp-visor__cont" aria-live="polite">{i + 1} / {total}</p>
        <span className="gp-visor__dia" style={{ '--c': dia.color, '--on': dia.on }}>{dia.nombre}</span>
        <span className="gp-visor__fecha">{dia.larga}</span>
        <div className="gp-visor__acc">
          <BotonFucain as="button" type="button" icono="i-descargar" className="btn--chico" color="principal" onClick={() => onDescargar(foto)}>Descargar</BotonFucain>
          <button type="button" className="gp-visor__cerrar" aria-label="Cerrar visor" ref={cerrar} onClick={onCerrar}><Icono id="i-x" /></button>
        </div>
      </div>

      {/* Fondo y centro: al hacer clic fuera de la foto se cierra */}
      <div className="gp-visor__escena" onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}>
        <button type="button" className="gp-visor__flecha gp-visor__flecha--izq" aria-label="Foto anterior" onClick={() => ir(-1)}><Icono id="i-izq" /></button>

        <div className="gp-visor__marco" ref={marco} style={{ '--ratio': foto.ratio }}>
          <div className="gp-visor__img">
            <img className="gp-visor__borrosa" src={foto.miniatura} alt="" aria-hidden="true" />
            <img
              key={foto.id}
              className={`gp-visor__orig${cargada ? ' lista' : ''}`}
              src={foto.url}
              alt={`Foto ${foto.numeroDia} del ${dia.nombre} del festival`}
              onLoad={() => setCargada(true)}
              onError={() => setFalla(true)}
            />
            {falla && <p className="gp-visor__falla">No se pudo cargar la foto original.</p>}
          </div>
        </div>

        <button type="button" className="gp-visor__flecha gp-visor__flecha--der" aria-label="Foto siguiente" onClick={() => ir(1)}><Icono id="i-der" /></button>
      </div>

      <div className="gp-visor__tira" ref={tira} aria-label="Miniaturas">
        {fotos.map((f, k) => (
          <button
            type="button"
            key={f.id}
            className={`gp-visor__mini${k === i ? ' activa' : ''}`}
            aria-label={`Ir a la foto ${k + 1}`}
            aria-current={k === i ? 'true' : undefined}
            onClick={() => setI(k)}
          >
            <img src={f.miniatura} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  );
}
