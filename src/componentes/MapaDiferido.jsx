import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// MapLibre pesa unos 800 KB: el mapa sólo se descarga cuando la sección está por aparecer en pantalla
const MapaEscenarios = lazy(() => import('./mapa/MapaEscenarios'));

export default function MapaDiferido() {
  const ref = useRef(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setListo(true); return undefined; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setListo(true); io.disconnect(); } }, { rootMargin: '600px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mapa-diferido" id={listo ? undefined : 'ubicacion'}>
      {listo && <Suspense fallback={<div className="mapa-diferido__espera" aria-hidden="true" />}><MapaEscenarios /></Suspense>}
    </div>
  );
}
