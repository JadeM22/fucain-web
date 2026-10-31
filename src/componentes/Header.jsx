import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EnlaceSeccion from './EnlaceSeccion';
import Estrella from './Estrella';
import { ruta } from '../utils/ruta';

const MENU = [
  ['inicio', 'Inicio'],
  ['escenarios', 'Escenarios'],
  ['galeria', 'Galería'],
  ['universidades', 'Participantes'],
];

export default function Header() {
  const { pathname } = useLocation();
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState('');

  // Sombra suave al hacer scroll
  useEffect(() => {
    const alScroll = () => setSolido(window.scrollY > 40);
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  // Menú móvil: clase en <body> (la usa el CSS), bloqueo de scroll, Escape y cambio de tamaño
  useEffect(() => {
    document.body.classList.toggle('nav-abierto', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => {
      document.body.classList.remove('nav-abierto');
      document.body.style.overflow = '';
    };
  }, [abierto]);

  useEffect(() => {
    const tecla = (e) => { if (e.key === 'Escape') setAbierto(false); };
    const mq = window.matchMedia('(min-width: 1120px)');
    const ancho = (e) => { if (e.matches) setAbierto(false); };
    document.addEventListener('keydown', tecla);
    mq.addEventListener('change', ancho);
    return () => {
      document.removeEventListener('keydown', tecla);
      mq.removeEventListener('change', ancho);
    };
  }, []);

  useEffect(() => { setAbierto(false); }, [pathname]);

  // Resalta el enlace de la sección que se está viendo (sólo en la portada)
  useEffect(() => {
    setActivo('');
    if (pathname !== '/' || !('IntersectionObserver' in window)) return undefined;
    const secciones = Array.from(document.querySelectorAll('section[id], footer[id]'));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActivo(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secciones.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`hdr${solido ? ' solido' : ''}`} id="inicio-hdr">
      <div className="hdr__in">
        <div className="hdr__marcas">
          <img src={ruta('img/logos/unah.png')} alt="UNAH – Universidad Nacional Autónoma de Honduras" width="618" height="404" />
          <span className="hdr__sep" aria-hidden="true" />
          <img src={ruta('img/logos/voae.png')} alt="VOAE – Vicerrectoría de Orientación y Asuntos Estudiantiles" width="1735" height="815" />
          <span className="hdr__sep" aria-hidden="true" />
          <EnlaceSeccion id="inicio" className="hdr__fucain" aria-label="FUCAIN UNAH – ir al inicio">
            <img src={ruta('img/logos/fucain-color.png')} alt="FUCAIN UNAH" width="500" height="500" />
          </EnlaceSeccion>
        </div>
        <nav aria-label="Principal">
          <ul className="menu">
            {MENU.map(([id, texto]) => (
              <li key={id}>
                <EnlaceSeccion id={id} className={activo === id ? 'activo' : undefined}>{texto}</EnlaceSeccion>
              </li>
            ))}
          </ul>
        </nav>
        <EnlaceSeccion id="programacion" className="hdr__cta">Ver programación</EnlaceSeccion>
        <button
          className="burger"
          type="button"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          aria-controls="panel-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className="panel-movil" id="panel-movil">
        <Estrella estilo={{ '--s': '180px', '--c': 'var(--rojo)', right: '-40px', bottom: '6%', opacity: 0.9 }} />
        <Estrella estilo={{ '--s': '90px', '--c': 'var(--turquesa)', left: '8%', top: '14%', '--t': '12s' }} />
        <ul>
          {MENU.map(([id, texto], i) => (
            <li key={id}>
              <EnlaceSeccion id={id} onNavegar={cerrar} style={{ '--i': i }}>{texto}</EnlaceSeccion>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
