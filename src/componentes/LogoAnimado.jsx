import { useEffect, useRef, useState } from 'react';
import { COLORES, reducirMovimiento, ruta } from '../utils/ruta';

// El mismo logo cortado en 12 piezas: al juntarse forman el logo completo.
// dx/dy/r = desde dónde y con qué giro llega cada pieza · corte = recorte (inset) de la pieza.
const PIEZAS = [
  { dx: -220, dy: -160, r: -50, corte: '0 51% 73% 0' },
  { dx: 220, dy: -200, r: 60, corte: '0 0 73% 49%' },
  { dx: -260, dy: 60, r: 40, corte: '27% 51% 57% 0' },
  { dx: 260, dy: 40, r: -70, corte: '27% 0 57% 49%' },
  { dx: -300, dy: 240, r: -90, corte: '43% 80% 20% 0' },
  { dx: -120, dy: 300, r: 60, corte: '43% 72% 20% 20%' },
  { dx: 80, dy: 320, r: -40, corte: '43% 62% 20% 28%' },
  { dx: -60, dy: -300, r: 80, corte: '43% 49% 20% 38%' },
  { dx: 140, dy: -260, r: -60, corte: '43% 35% 20% 51%' },
  { dx: 300, dy: 200, r: 70, corte: '43% 27% 20% 65%' },
  { dx: 320, dy: -60, r: -80, corte: '43% 0 20% 73%' },
  { dx: 0, dy: 340, r: 0, corte: '80% 0 0 0' },
];

export default function LogoAnimado() {
  const logo = useRef(null);
  const confeti = useRef(null);
  const [lista, setLista] = useState(false);

  const lanzarConfeti = () => {
    const cont = confeti.current;
    if (reducirMovimiento() || !cont || !cont.animate) return;
    const r = logo.current.getBoundingClientRect();
    const s = cont.getBoundingClientRect();
    const cx = r.left - s.left + r.width / 2;
    const cy = r.top - s.top + r.height / 2;
    for (let i = 0; i < 34; i++) {
      const p = document.createElement('span');
      const tam = 10 + Math.random() * 18;
      p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${tam}px;height:${i % 3 ? tam : tam * 0.35}px;background:${COLORES[i % COLORES.length]};clip-path:polygon(${Math.random() * 30}% 0,100% ${Math.random() * 30}%,${70 + Math.random() * 30}% 100%,0 ${70 + Math.random() * 30}%)`;
      cont.appendChild(p);
      const ang = Math.random() * Math.PI * 2;
      const dist = 160 + Math.random() * 260;
      const a = p.animate([
        { transform: 'translate(-50%,-50%) scale(0) rotate(0)', opacity: 1 },
        { transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist - 40}px) scale(1) rotate(${Math.random() * 540 - 270}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${Math.cos(ang) * dist * 1.1}px,${Math.sin(ang) * dist + 160}px) scale(.8) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 },
      ], { duration: 1800 + Math.random() * 900, delay: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'both' });
      a.onfinish = () => p.remove();
    }
  };

  const armar = () => {
    setLista(false);
    // doble frame para reiniciar la animación CSS
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setLista(true);
      lanzarConfeti();
    }));
  };

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setLista(true); return undefined; }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        setLista(true);
        lanzarConfeti();
        io.disconnect();
      }
    }, { threshold: 0.45 });
    io.observe(logo.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="logo-sec" id="logo" aria-labelledby="t-logo">
      <div className="logo-sec__bloques" aria-hidden="true">
        <span className="lb1" /><span className="lb2" /><span className="lb3" /><span className="lb4" />
      </div>
      <div className="confeti" aria-hidden="true" ref={confeti} />
      <div className="contenedor">
        <p className="eyebrow">Esta es nuestra marca</p>
        <h2 className="titulo" id="t-logo">
          Somos <span className="c1">F</span><span className="c2">U</span><span className="c3">C</span><span className="c4" style={{ color: 'var(--naranja)' }}>A</span><span className="c1">I</span><span className="c2">N</span>
        </h2>
        <div
          className={`logo-armado${lista ? ' lista' : ''}`}
          id="logo-armado"
          role="img"
          aria-label="Logo de FUCAIN UNAH"
          title="Haz clic para verlo armarse otra vez"
          ref={logo}
          onClick={armar}
        >
          {PIEZAS.map((p, i) => (
            <div
              className="pz"
              key={i}
              style={{ '--i': i, '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--r': `${p.r}deg`, clipPath: `inset(${p.corte})` }}
            >
              <img src={ruta('img/logos/fucain-color.png')} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="lead lema" style={{ marginInline: 'auto' }}>
          <strong>Festival Universitario de la Cultura y el Arte para la Identidad Nacional</strong>
        </p>
      </div>
    </section>
  );
}
