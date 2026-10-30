// Estilo vectorial propio (sin estilo predefinido) sobre datos de OpenStreetMap servidos por OpenFreeMap.
// Los tonos están tomados de la paleta del sitio: crema de fondo, verde, celeste, amarillo y lila suaves.

export const LIMITES = [[-87.185, 14.072], [-87.142, 14.100]];
export const CENTRO = [-87.1637, 14.0855];

const TINTA = '#0B1631';

// El grosor crece de forma exponencial con el zoom
const ancho = (z14, z20, base = 1.55) => ['interpolate', ['exponential', base], ['zoom'], 14, z14, 20, z20];

const NO_VIAS = ['rail', 'transit', 'aerialway', 'ferry', 'ski', 'busway', 'bus_guideway'];
const esVia = ['!', ['in', ['get', 'class'], ['literal', NO_VIAS]]];
const esSendero = ['in', ['get', 'class'], ['literal', ['path', 'track']]];
const esPrincipal = ['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary']]];

export const estiloMapa = {
  version: 8,
  sources: { ofm: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' } },
  layers: [
    { id: 'fondo', type: 'background', paint: { 'background-color': '#FFF9EA' } },
    {
      id: 'terreno-universitario', type: 'fill', source: 'ofm', 'source-layer': 'landuse',
      filter: ['in', ['get', 'class'], ['literal', ['university', 'school', 'college']]],
      paint: { 'fill-color': '#FFFFFF' },
    },
    {
      id: 'verde-landcover', type: 'fill', source: 'ofm', 'source-layer': 'landcover',
      filter: ['in', ['get', 'class'], ['literal', ['grass', 'wood']]],
      paint: { 'fill-color': '#DDEFC9' },
    },
    { id: 'verde-parques', type: 'fill', source: 'ofm', 'source-layer': 'park', paint: { 'fill-color': '#DDEFC9' } },
    { id: 'agua', type: 'fill', source: 'ofm', 'source-layer': 'water', paint: { 'fill-color': '#BFE6F2' } },
    {
      id: 'rios', type: 'line', source: 'ofm', 'source-layer': 'waterway',
      paint: { 'line-color': '#8FD0E6', 'line-width': ancho(1, 5) },
    },
    {
      id: 'senderos', type: 'line', source: 'ofm', 'source-layer': 'transportation',
      filter: ['all', ['==', ['geometry-type'], 'LineString'], esSendero],
      layout: { 'line-cap': 'butt', 'line-join': 'round' },
      paint: { 'line-color': '#D8CBB0', 'line-width': ancho(0.8, 3), 'line-dasharray': [2, 2] },
    },
    {
      id: 'calles-borde', type: 'line', source: 'ofm', 'source-layer': 'transportation',
      filter: ['all', ['==', ['geometry-type'], 'LineString'], esVia, ['!', esSendero]],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#E6D9BC', 'line-width': ancho(2.4, 26) },
    },
    {
      id: 'calles-relleno', type: 'line', source: 'ofm', 'source-layer': 'transportation',
      filter: ['all', ['==', ['geometry-type'], 'LineString'], esVia, ['!', esSendero], ['!', esPrincipal]],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#FFFFFF', 'line-width': ancho(1.4, 22) },
    },
    {
      id: 'calles-principales', type: 'line', source: 'ofm', 'source-layer': 'transportation',
      filter: ['all', ['==', ['geometry-type'], 'LineString'], esVia, esPrincipal],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#FDE08A', 'line-width': ancho(1.8, 24) },
    },
    {
      id: 'edificios', type: 'fill', source: 'ofm', 'source-layer': 'building', minzoom: 14,
      paint: { 'fill-color': '#E3DDEB', 'fill-outline-color': '#CFC6DB' },
    },
    {
      id: 'edificios-contorno', type: 'line', source: 'ofm', 'source-layer': 'building', minzoom: 15.5,
      paint: { 'line-color': '#CFC6DB', 'line-width': 0.8 },
    },
  ],
};

// Capas que se agregan después de que el estilo carga: la ruta tenue y el camino recorrido
export function agregarCapasRuta(mapa, coordenadas) {
  mapa.addSource('ruta', {
    type: 'geojson',
    data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coordenadas }, properties: {} },
  });
  mapa.addLayer({
    id: 'ruta', type: 'line', source: 'ruta',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': TINTA, 'line-opacity': 0.35, 'line-width': 2.2, 'line-dasharray': [1.5, 2] },
  });
  mapa.addSource('recorrido', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  mapa.addLayer({
    id: 'recorrido', type: 'line', source: 'recorrido',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': ['get', 'color'], 'line-width': 5 },
  });
}
