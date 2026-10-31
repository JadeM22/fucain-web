import { useEffect, useRef } from 'react';
import Icono from '../Icono';
import { ruta } from '../../utils/ruta';

// Foto del escenario a pantalla completa (fondo tinta al 94%). Esc o clic fuera para cerrar.
// indice elige cuál mostrar cuando el escenario tiene varias fotos (escenario.fotos).
export default function VisorEscenario({ escenario, indice = 0, onCerrar }) {
  const cerrar = useRef(null);
  const fotos = escenario.fotos || [escenario.foto];
  const archivo = fotos[indice] ?? fotos[0];

  useEffect(() => {
    const previo = document.activeElement;
    document.body.style.overflow = 'hidden';
    cerrar.current.focus();
    const tecla = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onCerrar(); }
      else if (e.key === 'Tab') { e.preventDefault(); cerrar.current.focus(); } // el único control es "cerrar"
    };
    document.addEventListener('keydown', tecla, true);
    return () => {
      document.removeEventListener('keydown', tecla, true);
      document.body.style.overflow = '';
      if (previo && previo.focus) previo.focus();
    };
  }, [onCerrar]);

  return (
    <div className="me-visor" role="dialog" aria-modal="true" aria-label={`Foto de ${escenario.nombre}`} onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}>
      <button type="button" className="me-visor__x" aria-label="Cerrar foto" ref={cerrar} onClick={onCerrar}><Icono id="i-x" /></button>
      <img src={ruta(`img/escenarios/${archivo}`)} alt={`Foto de ${escenario.nombre}`} />
      <p className="me-visor__pie">{escenario.nombre}</p>
    </div>
  );
}
