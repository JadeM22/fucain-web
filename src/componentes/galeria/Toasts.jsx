import { createContext, useCallback, useContext, useRef, useState } from 'react';

// Avisos arriba a la derecha: máximo 4, duran 4.2 s. tipo: 'ok' (verde), 'error' (rojo) o 'info' (celeste).
const ContextoToasts = createContext({ avisar: () => {} });
export const useToasts = () => useContext(ContextoToasts);

const DURACION = 4200;

export function ToastsProvider({ children }) {
  const [lista, setLista] = useState([]);
  const siguiente = useRef(1);

  const quitar = useCallback((id) => setLista((l) => l.filter((t) => t.id !== id)), []);

  const avisar = useCallback((tipo, texto) => {
    const id = siguiente.current++;
    setLista((l) => [...l, { id, tipo, texto }].slice(-4));
    setTimeout(() => quitar(id), DURACION);
  }, [quitar]);

  return (
    <ContextoToasts.Provider value={{ avisar }}>
      {children}
      <div className="gp-toasts" role="status" aria-live="polite">
        {lista.map((t) => (
          <div className={`gp-toast gp-toast--${t.tipo}`} key={t.id}>
            <span className="gp-toast__txt">{t.texto}</span>
            <button type="button" className="gp-toast__x" aria-label="Cerrar aviso" onClick={() => quitar(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ContextoToasts.Provider>
  );
}
