import { useEffect } from 'react';
import { reducirMovimiento } from '../utils/ruta';

// Hace aparecer (clase "in") los elementos con clase "rev" al entrar en pantalla.
export default function useRevelar() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rev'));
    if (!('IntersectionObserver' in window) || reducirMovimiento()) {
      els.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
