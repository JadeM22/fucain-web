import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import BotonFucain from '../BotonFucain';
import Icono from '../Icono';
import Marcador from './Marcador';
import TarjetaEscenario from './TarjetaEscenario';
import VisorEscenario from './VisorEscenario';
import { fondoEscenario, formatoCapacidad, primerColor } from './utilidades';
import { escenariosMapa as datos, tiposMapa } from '../../data/contenido';
import useMapaEscenarios from '../../hooks/useMapaEscenarios';
import { reducirMovimiento } from '../../utils/ruta';

const PARADA = 5200;   // ms que dura cada parada del recorrido
const VUELO = 2200;    // ms del vuelo entre escenarios

const FILTROS = [
  { id: 'todos', texto: 'Todos', color: undefined },
  { id: 'musica', texto: 'Música', color: 'rojo' },
  { id: 'escenicas', texto: 'Escénicas', color: 'morado' },
  { id: 'visuales', texto: 'Visuales', color: 'turquesa' },
];

// Mapa vectorial 2D de Ciudad Universitaria con los 10 escenarios y un recorrido automático (sección #ubicacion de la portada)
export default function MapaEscenarios() {
  const raiz = useRef(null);
  const dentro = useRef(false);   // el teclado sólo actúa si el cursor o el foco están en el mapa
  const contenedor = useRef(null);
  const colores = useMemo(() => datos.map(primerColor), []);
  const elementos = useMemo(() => datos.map((d) => {
    const el = document.createElement('div');
    el.className = `mk mk--${d.pos}`;
    return el;
  }), []);

  const [filtro, setFiltro] = useState('todos');
  const [activo, setActivo] = useState(null);
  const [hover, setHover] = useState(null);
  const [tarjeta, setTarjeta] = useState(false);
  const [tour, setTour] = useState('off');      // off | play | pause
  const [barra, setBarra] = useState(0);        // clave de la barra de progreso (0 = oculta)
  const [visor, setVisor] = useState(null); // null = cerrado, número = índice de la foto ampliada

  // Motor del recorrido (refs: lo usan los temporizadores)
  const M = useRef({ tour: 'off', actual: null, t: 0, tv: null, tt: null, td: null, restante: PARADA, inicio: 0, dwell: false, fn: {} }).current;

  const api = useMapaEscenarios({ contenedor, elementos, datos, colores, onElegir: (i) => M.fn.ir(i) });

  const incluidos = useMemo(
    () => new Set(datos.map((d, i) => i).filter((i) => filtro === 'todos' || datos[i].tipos.includes(filtro))),
    [filtro],
  );
  const cuenta = (id) => (id === 'todos' ? datos.length : datos.filter((d) => d.tipos.includes(id)).length);

  // Sincroniza el mapa con el estado (activo y filtro)
  useEffect(() => { if (api.current) api.current.actualizar({ activo, incluidos }); });

  // ---------- Recorrido ----------
  M.fn.ir = (i) => {
    clearTimeout(M.tv); clearTimeout(M.tt); clearTimeout(M.td);
    M.dwell = false;
    setBarra(0);
    M.actual = i;
    setActivo(i);
    setTarjeta(false);
    const rm = reducirMovimiento();
    M.tt = setTimeout(() => setTarjeta(true), rm ? 0 : 650);     // la tarjeta aparece 650 ms después de iniciar el vuelo
    if (api.current) api.current.volarA(i);
    if (M.tour !== 'off') {
      if (api.current) api.current.animarRecorrido(M.t, i, rm ? 0 : VUELO);
      M.t = i;
      M.tv = setTimeout(M.fn.empezarParada, rm ? 0 : VUELO);
    }
  };
  M.fn.empezarParada = () => {
    M.dwell = true;
    M.restante = PARADA;
    setBarra(Date.now());
    if (M.tour === 'play') { M.inicio = performance.now(); M.td = setTimeout(M.fn.avanzar, M.restante); }
  };
  M.fn.avanzar = () => {
    M.dwell = false;
    if (M.actual < datos.length - 1) M.fn.ir(M.actual + 1);
    else M.fn.terminar();
  };
  // Vuelve a la vista general y borra el camino recorrido y la ficha
  M.fn.terminar = () => {
    clearTimeout(M.tv); clearTimeout(M.tt); clearTimeout(M.td);
    M.dwell = false; M.tour = 'off'; M.actual = null; M.t = 0;
    setBarra(0); setTour('off'); setActivo(null); setTarjeta(false);
    if (api.current) { api.current.limpiarRecorrido(); api.current.general(); }
  };
  M.fn.iniciar = () => {
    if (api.current) api.current.limpiarRecorrido();
    M.tour = 'play'; M.t = 0; M.actual = null;
    setTour('play');
    M.fn.ir(0);
  };
  M.fn.pausa = () => {
    if (M.tour === 'off') { M.fn.iniciar(); return; }
    if (M.tour === 'play') {
      M.tour = 'pause'; setTour('pause');
      if (M.dwell) { M.restante -= performance.now() - M.inicio; clearTimeout(M.td); }
    } else {
      M.tour = 'play'; setTour('play');
      if (M.dwell) { M.inicio = performance.now(); M.td = setTimeout(M.fn.avanzar, Math.max(0, M.restante)); }
    }
  };
  M.fn.paso = (d) => {
    const n = datos.length;
    const base = M.actual === null ? (d > 0 ? -1 : 0) : M.actual;
    M.fn.ir((base + d + n) % n);
  };

  // Teclado: ← y → cambian de escenario, Esc vuelve a la vista general
  useEffect(() => {
    const tecla = (e) => {
      if (visor !== null || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      const enFoco = raiz.current && raiz.current.contains(document.activeElement);
      if (!dentro.current && !enFoco) return;   // en el resto de la portada las flechas y Esc no hacen nada
      if (e.key === 'ArrowRight') { e.preventDefault(); M.fn.paso(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); M.fn.paso(-1); }
      else if (e.key === 'Escape' && (M.actual !== null || M.tour !== 'off')) M.fn.terminar();
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [visor]); // eslint-disable-line react-hooks/exhaustive-deps

  // Al salir de la página se limpian los temporizadores
  useEffect(() => () => { clearTimeout(M.tv); clearTimeout(M.tt); clearTimeout(M.td); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const escenario = activo === null ? null : datos[activo];

  return (
    <div className="me" id="ubicacion" role="region" aria-labelledby="t-me" ref={raiz} onMouseEnter={() => { dentro.current = true; }} onMouseLeave={() => { dentro.current = false; }}>
      <div className="me__grid">
        <header className="me__intro">
          <p className="gp-etiqueta">Escenarios · Ciudad Universitaria</p>
          <h2 className="me__titulo" id="t-me">Diez escenarios, <span className="me__marca">un solo campus</span></h2>
          <p className="me__parrafo">
            Recorre Ciudad Universitaria de la UNAH y descubre dónde suceden la música, las artes escénicas, las artes visuales, la literatura y el cine de FUCAIN 2026.
          </p>
          <BotonFucain as="button" type="button" color="amarillo" inc="-1.4deg" icono="i-play" onClick={M.fn.iniciar}>
            Recorrer escenarios
          </BotonFucain>
        </header>

        <section className="me__mapa" aria-label="Mapa de los escenarios">
          <div className="me-marco">
            <div className="me-marco__in">
              <div className="me-mapa" ref={contenedor} />
            </div>
          </div>

          {escenario && (
            <TarjetaEscenario
              escenario={escenario}
              indice={activo}
              total={datos.length}
              visible={tarjeta}
              barra={tour !== 'off' && barra ? barra : 0}
              pausado={tour === 'pause'}
              onCerrar={M.fn.terminar}
              onAmpliar={(i) => setVisor(i)}
            />
          )}

          <div className="me-ctl" role="group" aria-label="Controles del recorrido">
            <button type="button" aria-label="Escenario anterior" onClick={() => M.fn.paso(-1)}><Icono id="i-izq" /></button>
            <button type="button" className="me-ctl__play" aria-label={tour === 'play' ? 'Pausar el recorrido' : 'Iniciar el recorrido'} aria-pressed={tour === 'play'} onClick={M.fn.pausa}>
              <Icono id={tour === 'play' ? 'i-pausa' : 'i-play'} />
            </button>
            <button type="button" aria-label="Escenario siguiente" onClick={() => M.fn.paso(1)}><Icono id="i-der" /></button>
            <button type="button" className="me-ctl__general" onClick={M.fn.terminar}>Vista general</button>
          </div>
        </section>

        <div className="me__lista">
          <div className="me-chips" role="group" aria-label="Filtrar por manifestación">
            {FILTROS.map((f) => (
              <BotonFucain
                as="button" type="button" key={f.id} icono={null} className="btn--chico"
                color={filtro === f.id ? f.color : 'blanco'}
                aria-pressed={filtro === f.id}
                onClick={() => setFiltro(f.id)}
              >
                {f.texto} · {cuenta(f.id)}
              </BotonFucain>
            ))}
          </div>

          <ol className="me-lista">
            {datos.map((d, i) => (
              <li key={d.nombre}>
                <button
                  type="button"
                  className={`me-item${activo === i ? ' activa' : ''}${incluidos.has(i) ? '' : ' fuera'}`}
                  aria-pressed={activo === i}
                  onClick={() => M.fn.ir(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                >
                  <span className="me-item__ins" style={{ '--fondo': fondoEscenario(d) }}><b>{String(i + 1).padStart(2, '0')}</b></span>
                  <span className="me-item__txt">
                    <strong>{d.nombre}</strong>
                    <small>{d.edificio} · {formatoCapacidad(d.capacidad)} {d.modo}</small>
                  </span>
                  <span className="me-item__pts" aria-hidden="true">
                    {d.tipos.map((t) => <i key={t} style={{ background: tiposMapa[t].color }} />)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {elementos.map((el, i) => createPortal(<Marcador escenario={datos[i]} indice={i} hover={hover === i} />, el, `mk-${i}`))}
      {visor !== null && escenario && <VisorEscenario escenario={escenario} indice={visor} onCerrar={() => setVisor(null)} />}
    </div>
  );
}
