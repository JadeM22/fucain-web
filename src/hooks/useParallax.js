import { useEffect } from 'react';
import { reducirMovimiento } from '../utils/ruta';

// Parallax suave: mueve los elementos con data-speed al hacer scroll y al mover el mouse sobre el hero.
export default function useParallax() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('[data-speed]'));
    if (!items.length || reducirMovimiento()) return undefined;

    let ticking = false;
    let mx = 0;
    let my = 0;
    const pintar = () => {
      const y = window.scrollY;
      items.forEach((el) => {
        const v = parseFloat(el.dataset.speed);
        el.style.translate = `${(mx * v * 120).toFixed(1)}px ${(-y * v + my * v * 120).toFixed(1)}px`;
      });
      ticking = false;
    };
    const pedir = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(pintar);
      }
    };
    const hero = document.querySelector('.hero');
    const mover = (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      pedir();
    };
    window.addEventListener('scroll', pedir, { passive: true });
    if (hero) hero.addEventListener('pointermove', mover);
    pintar();
    return () => {
      window.removeEventListener('scroll', pedir);
      if (hero) hero.removeEventListener('pointermove', mover);
      items.forEach((el) => { el.style.translate = ''; });
    };
  }, []);
}
