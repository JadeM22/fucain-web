import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { CENTRO, LIMITES, agregarCapasRuta, estiloMapa } from '../componentes/mapa/estiloMapa';
import { reducirMovimiento } from '../utils/ruta';

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
const esMovil = () => window.matchMedia('(max-width: 999px)').matches;

// Crea el mapa plano (2D) de MapLibre y expone una API imperativa por ref:
//   actualizar({ activo, incluidos }) · volarA(i) · general() · animarRecorrido(desde, hasta, ms) · limpiarRecorrido()
// datos: escenariosMapa · elementos: un <div> por escenario (su contenido lo dibuja React con portales)
export default function useMapaEscenarios({ contenedor, elementos, datos, colores, onElegir }) {
  const api = useRef(null);

  useEffect(() => {
    const mapa = new maplibregl.Map({
      container: contenedor.current,
      style: estiloMapa,
      center: CENTRO,
      zoom: 16,
      minZoom: 14.5,
      maxZoom: 19.5,
      maxBounds: LIMITES,
      pitch: 0,
      bearing: 0,
      maxPitch: 0,
      dragRotate: false,
      attributionControl: false,
    });
    mapa.touchZoomRotate.disableRotation();
    mapa.keyboard.disable();              // las flechas ← → cambian de escenario, no mueven el mapa
    mapa.scrollZoom.disable();            // la rueda hace zoom sólo después del primer clic en el mapa
    mapa.on('click', () => mapa.scrollZoom.enable());
    mapa.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), 'top-right');
    mapa.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '© OpenStreetMap · OpenFreeMap' }), 'bottom-right');

    const estado = { activo: null, incluidos: new Set(datos.map((_, i) => i)) };
    let cargado = false;
    let rafColocar = 0;
    let rafRecorrido = 0;
    let ficha = null;
    const timers = [];

    // ---------- Marcadores ----------
    const marcadores = datos.map((d, i) => {
      const el = elementos[i];
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `Escenario ${i + 1}: ${d.nombre}`);
      el.setAttribute('aria-pressed', 'false');
      const alPulsar = () => onElegir(i);
      const alTeclear = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alPulsar(); } };
      el.addEventListener('click', alPulsar);
      el.addEventListener('keydown', alTeclear);
      el.__quitar = () => { el.removeEventListener('click', alPulsar); el.removeEventListener('keydown', alTeclear); };
      return new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat([d.lon, d.lat]).addTo(mapa);
    });

    // ---------- Etiquetas sin encimarse ----------
    // Prioridad: escenario activo, luego los incluidos en el filtro y al final el resto.
    // Si una etiqueta choca con otra ya colocada se oculta y queda sólo el punto (aparece al pasar el cursor).
    const colocar = () => {
      rafColocar = 0;
      const peso = (i) => (i === estado.activo ? 0 : estado.incluidos.has(i) ? 1 : 2) * 100 + i;
      const orden = datos.map((_, i) => i).sort((a, b) => peso(a) - peso(b));
      const puestos = [];
      orden.forEach((i) => {
        const el = elementos[i];
        const eti = el.querySelector('.mk__eti');
        if (!eti) return;
        const r = eti.getBoundingClientRect();
        const choca = puestos.some((q) => !(r.right + 4 < q.left || r.left - 4 > q.right || r.bottom + 3 < q.top || r.top - 3 > q.bottom));
        el.classList.toggle('mk--oculta', choca);
        if (!choca) puestos.push(r);
      });
    };
    const pedirColocar = () => { if (!rafColocar) rafColocar = requestAnimationFrame(colocar); };
    mapa.on('move', pedirColocar);
    mapa.on('resize', pedirColocar);
    timers.push(setTimeout(pedirColocar, datos.length * 110 + 900));   // cuando termina la caída de los marcadores
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(pedirColocar);

    // ---------- Ruta y camino recorrido ----------
    const coords = datos.map((d) => [d.lon, d.lat]);
    mapa.on('load', () => {
      agregarCapasRuta(mapa, coords);
      cargado = true;
      pedirColocar();
    });

    const punto = (t) => {
      const k = Math.min(Math.floor(t), datos.length - 2);
      const f = Math.min(t - k, 1);
      const [x0, y0] = coords[k];
      const [x1, y1] = coords[k + 1];
      return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f];
    };
    // t = posición fraccionaria a lo largo de la ruta (0 = escenario 1, 9 = escenario 10)
    const dibujar = (t) => {
      if (!cargado) return;
      const tope = datos.length - 1;
      const tt = Math.max(0, Math.min(t, tope));
      const piezas = [];
      for (let k = 0; k < Math.floor(tt) && k < tope; k += 1) {
        piezas.push({ type: 'Feature', properties: { color: colores[k + 1] }, geometry: { type: 'LineString', coordinates: [coords[k], coords[k + 1]] } });
      }
      const k = Math.floor(tt);
      if (k < tope && tt - k > 0) {
        piezas.push({ type: 'Feature', properties: { color: colores[k + 1] }, geometry: { type: 'LineString', coordinates: [coords[k], punto(tt)] } });
      }
      mapa.getSource('recorrido').setData({ type: 'FeatureCollection', features: piezas });
      if (!ficha) {
        const el = document.createElement('div');
        el.className = 'ficha';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML = '<span class="ficha__aro"></span><span class="ficha__pt"></span>';
        ficha = new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(punto(tt)).addTo(mapa);
      }
      ficha.setLngLat(punto(tt));
    };

    api.current = {
      actualizar({ activo, incluidos }) {
        estado.activo = activo;
        estado.incluidos = incluidos;
        elementos.forEach((el, i) => {
          el.classList.toggle('mk--activo', i === activo);
          el.classList.toggle('mk--fuera', !incluidos.has(i));
          el.setAttribute('aria-pressed', String(i === activo));
        });
        pedirColocar();
      },
      volarA(i) {
        const d = datos[i];
        const movil = esMovil();
        const destino = { center: [d.lon, d.lat], zoom: movil ? 17.8 : 18.2, offset: movil ? [0, 0] : [170, -40] };
        if (reducirMovimiento()) mapa.easeTo({ ...destino, duration: 0 });
        else mapa.flyTo({ ...destino, duration: 2200, curve: 1.3, essential: true });
      },
      general(instantaneo) {
        const b = new maplibregl.LngLatBounds();
        coords.forEach((c) => b.extend(c));
        mapa.fitBounds(b, { padding: esMovil() ? { top: 50, bottom: 60, left: 40, right: 40 } : { top: 60, bottom: 120, left: 80, right: 80 }, maxZoom: 17, duration: instantaneo || reducirMovimiento() ? 0 : 1600 });
      },
      animarRecorrido(desde, hasta, ms) {
        cancelAnimationFrame(rafRecorrido);
        if (!ms || reducirMovimiento()) { dibujar(hasta); return; }
        const t0 = performance.now();
        const paso = (ahora) => {
          const p = Math.min((ahora - t0) / ms, 1);
          dibujar(desde + (hasta - desde) * easeInOutCubic(p));
          if (p < 1) rafRecorrido = requestAnimationFrame(paso);
        };
        rafRecorrido = requestAnimationFrame(paso);
      },
      limpiarRecorrido() {
        cancelAnimationFrame(rafRecorrido);
        if (ficha) { ficha.remove(); ficha = null; }
        if (cargado) mapa.getSource('recorrido').setData({ type: 'FeatureCollection', features: [] });
      },
    };

    api.current.general(true);   // vista general al abrir la página

    return () => {
      cancelAnimationFrame(rafColocar);
      cancelAnimationFrame(rafRecorrido);
      timers.forEach(clearTimeout);
      if (ficha) ficha.remove();
      marcadores.forEach((m, i) => { elementos[i].__quitar(); m.remove(); });
      api.current = null;
      mapa.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return api;
}
