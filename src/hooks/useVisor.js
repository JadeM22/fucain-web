import { useCallback, useRef, useState } from 'react';

// Estado del visor de fotos ampliadas: cuál foto está abierta (null = cerrado).
// Al cerrar devuelve el foco al elemento que lo abrió (accesibilidad con teclado).
export default function useVisor(total) {
  const [actual, setActual] = useState(null);
  const ultimoFoco = useRef(null);

  const abrir = useCallback((i) => {
    ultimoFoco.current = document.activeElement;
    setActual(i);
  }, []);

  const cerrar = useCallback(() => {
    setActual(null);
    if (ultimoFoco.current) ultimoFoco.current.focus();
  }, []);

  const mover = useCallback((delta) => {
    setActual((i) => (i === null ? i : (i + delta + total) % total));
  }, [total]);

  return { actual, abrir, cerrar, mover };
}
