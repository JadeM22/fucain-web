// ============================================================
//  CONTENIDO EDITABLE DE FUCAIN 2026
//  Cambia aquí los textos, cifras, redes, contacto y universidades.
//  Guarda el archivo y la página se actualiza sola (npm run dev).
// ============================================================

// Fecha y hora de inicio del festival (hora de Honduras, UTC-6).
// Formato: AAAA-MM-DDTHH:MM:SS-06:00
export const fechaInicio = '2026-11-10T00:00:00-06:00';

// ---------- Contacto (datos de EJEMPLO: reemplazar por los oficiales) ----------
export const contacto = {
  correo: 'fucain@unah.edu.hn',
  telefono: '(+504) 2216-0000',
  telefonoLink: '+50422160000', // sin espacios ni guiones, para que el celular pueda llamar
  direccion: 'Ciudad Universitaria, Tegucigalpa',
};

// ---------- Redes sociales (enlaces de EJEMPLO) ----------
// tipo puede ser: 'facebook', 'instagram' o 'youtube'
export const redes = [
  { tipo: 'facebook', nombre: 'Facebook de FUCAIN', url: 'https://www.facebook.com/' },
  { tipo: 'instagram', nombre: 'Instagram de FUCAIN', url: 'https://www.instagram.com/' },
  { tipo: 'youtube', nombre: 'YouTube de FUCAIN', url: 'https://www.youtube.com/' },
];

// ---------- Escenarios (en este orden se muestran) ----------
// num: número que se ve en la estrella · nombre: tal como se escribe en la tarjeta
// texto: descripción corta (BORRADORES: cámbialas por las descripciones oficiales)
// foto: nombre del archivo dentro de public/img/escenarios/ (si no existe, se ve un marcador de color)
export const escenarios = [
  {
    num: '01', nombre: 'Anfiteatro del Edificio CISE',
    foto: '01-cise.jpg',
    texto: 'Gradas y escenario para presentaciones del festival.',
  },
  {
    num: '02', nombre: 'Teatro Padre Trino',
    foto: '02-padre-trino.jpg',
    texto: 'Obras de teatro y puestas en escena universitarias.',
  },
  {
    num: '03', nombre: 'Plaza Cuatro Culturas',
    foto: '03-cuatro-culturas.jpg',
    texto: 'Plaza al aire libre para muestras, danza y ambiente de fiesta.',
  },
  {
    num: '04', nombre: 'Edificio 1847 "Puente Aéreo"',
    foto: '04-edificio-1847.jpg',
    texto: 'Muestras y actividades artísticas del festival.',
  },
  {
    num: '05', nombre: 'Auditorio "José Cecilio del Valle"',
    foto: '05-jose-cecilio.jpg',
    texto: 'Conciertos, recitales y presentaciones con escenario y butacas.',
  },
  {
    num: '06', nombre: 'Auditorio No. 1, Edificio C3',
    foto: '06-auditorio-1-c3.jpg',
    texto: 'Presentaciones, charlas y conferencias del festival.',
  },
  {
    num: '07', nombre: 'Auditorio No. 2, Edificio C3',
    foto: '07-auditorio-2-c3.jpg',
    texto: 'Música, teatro y actividades del componente académico.',
  },
  {
    num: '08', nombre: 'Cinemateca "Enrique Ponce Garay"',
    foto: '08-cinemateca.jpg',
    texto: 'Proyección de cortometrajes y muestras audiovisuales.',
  },
  {
    num: '09', nombre: 'Anfiteatro de Plaza Registro',
    foto: '09-plaza-registro.jpg',
    texto: 'Escenario al aire libre para música y danza.',
  },
  {
    num: '10', nombre: 'Lobby y Mezanine, edificio Alma Máter',
    foto: '10-alma-mater.jpg',
    texto: 'Exposiciones de artes visuales y lecturas literarias.',
  },
];

// ---------- Contadores (cifras animadas) ----------
// valor: número final (se muestra con coma de miles, por ejemplo 1,390)
// etiqueta: título en mayúsculas · detalle: línea pequeña debajo · mas: true agrega "+" al final
// icono: i-uni, i-visuales, i-artista, i-escena, i-danza, i-musica, i-teatro, i-literatura, i-cine
export const cifras = [
  { valor: 920, etiqueta: 'Inscritos', detalle: '858 artistas y delegados + 62 autoridades', icono: 'i-artista' },
  { valor: 9, etiqueta: 'Instituciones', detalle: 'UNAH (9 campus) + 8 universidades', icono: 'i-uni' },
  { valor: 330, etiqueta: 'Voluntarios', detalle: '165 matutina + 165 vespertina', icono: 'i-danza' },
  { valor: 1390, etiqueta: 'Personas', detalle: 'población total proyectada', icono: 'i-escena' },
];

// ---------- Galería (9 fotos en public/img/fotos/) ----------
export const galeria = [
  { foto: 'galeria-01.jpg', alt: 'Presentación de danza folclórica en el festival' },
  { foto: 'galeria-02.jpg', alt: 'Banda en concierto' },
  { foto: 'galeria-03.jpg', alt: 'Obra de teatro universitaria' },
  { foto: 'galeria-04.jpg', alt: 'Exposición de artes visuales' },
  { foto: 'galeria-05.jpg', alt: 'Lectura de poesía' },
  { foto: 'galeria-06.jpg', alt: 'Proyección de cortometrajes' },
  { foto: 'galeria-07.jpg', alt: 'Estudiantes bailando en el escenario' },
  { foto: 'galeria-08.jpg', alt: 'Público disfrutando del festival' },
  { foto: 'galeria-09.jpg', alt: 'Músicos tradicionales en vivo' },
];

// ---------- Galería completa (página /galeria) ----------
// Cada bloque es una sección de la página. Las fotos se generan solas con estos nombres,
// dentro de public/img/galeria/:  <prefijo>-01.jpg, <prefijo>-02.jpg …  hasta "cantidad".
// Tip: con 5 o con 9 fotos la cuadrícula queda completa (la primera foto es la grande).
export const galeriaCompleta = [
  { id: 'generales', titulo: 'Generales', eyebrow: 'Lo mejor del festival', prefijo: 'general', cantidad: 5, color: 'var(--amarillo)' },
  { id: 'dia-1', titulo: 'Día 1', fecha: '10 de noviembre', eyebrow: 'Primer día', prefijo: 'dia-1', cantidad: 9, color: 'var(--turquesa)' },
  { id: 'dia-2', titulo: 'Día 2', fecha: '11 de noviembre', eyebrow: 'Segundo día', prefijo: 'dia-2', cantidad: 9, color: 'var(--rojo)' },
  { id: 'dia-3', titulo: 'Día 3', fecha: '12 de noviembre', eyebrow: 'Tercer día', prefijo: 'dia-3', cantidad: 9, color: 'var(--morado)', on: '#fff' },
];

// Descarga de todas las fotos: pon el .zip en public/descargas/ con este nombre.
// Mientras no exista, el botón dice "Próximamente".
export const descargaFotos = { archivo: 'fotos-fucain-2026.zip', texto: 'Descargar todas las fotos' };

// ---------- Universidades del carrusel ----------
// archivo: ruta dentro de public/img/ · alt: nombre de la universidad
export const universidades = [
  { archivo: 'logos/unah.png', alt: 'UNAH' },
  { archivo: 'universidades/umh.png', alt: 'Universidad Metropolitana de Honduras' },
  { archivo: 'universidades/udh.png', alt: 'Universidad de Defensa de Honduras' },
  { archivo: 'universidades/upnfm.png', alt: 'UPNFM' },
  { archivo: 'universidades/uth.png', alt: 'Universidad Tecnológica de Honduras' },
  { archivo: 'universidades/ujcv.png', alt: 'UJCV' },
  { archivo: 'universidades/unicah.png', alt: 'Universidad Católica de Honduras' },
  { archivo: 'universidades/unag.png', alt: 'UNAG' },
  { archivo: 'universidades/ucrish.png', alt: 'UCRISH' },
  { archivo: 'universidades/unph.png', alt: 'UNPH' },
];

// ---------- Las 3 tarjetas de cronograma ----------
// pdf: nombre del archivo en public/docs/cronogramas/ · ruta: página interna (sin PDF)
// color: color del botón (amarillo, blanco, rojo, morado, turquesa)
export const cronogramas = [
  {
    etiqueta: 'Programación',
    titulo: 'Cronograma General',
    texto: 'Consulta, día por día, todas las presentaciones, horarios y escenarios del festival.',
    pdf: 'cronograma-general.pdf',
    color: 'blanco',
  },
  {
    etiqueta: 'Filtra por',
    titulo: 'Cronograma por Disciplina',
    texto: 'Música, teatro, danza, artes visuales, literatura y cinematografía. Encuentra lo tuyo.',
    ruta: '/disciplinas',
    color: 'amarillo',
  },
  {
    etiqueta: 'Charlas y conferencias',
    titulo: 'Componente Académico',
    texto: 'Charlas y conferencias a cargo de especialistas sobre arte, cultura e identidad nacional.',
    pdf: 'componente-academico.pdf',
    color: 'blanco',
  },
];

// ---------- Las 6 disciplinas ----------
// slug = nombre del PDF (public/docs/cronogramas/<slug>.pdf) y de la foto opcional
// disciplina-<slug>.jpg. "texto" se ve en la portada; "textoPagina" en /disciplinas.
export const disciplinas = [
  {
    slug: 'musica', nombre: 'Música', clase: 'd-musica', icono: 'i-musica',
    texto: 'Conciertos, coros y ensambles con instrumentos tradicionales y contemporáneos.',
  },
  {
    slug: 'teatro', nombre: 'Teatro', clase: 'd-teatro', icono: 'i-teatro',
    texto: 'Puestas en escena universitarias que exploran identidad, comedia y drama.',
  },
  {
    slug: 'danza', nombre: 'Danza', clase: 'd-danza', icono: 'i-danza',
    texto: 'Trajes típicos, coreografías folclóricas y ritmos que narran la historia de cada pueblo.',
  },
  {
    slug: 'artes-visuales', nombre: 'Artes visuales', clase: 'd-visuales', icono: 'i-visuales',
    texto: 'Pintura, escultura, fotografía y mucho color expuestos por artistas universitarios.',
    textoPagina: 'Pintura, escultura y fotografía expuestas por artistas universitarios.',
  },
  {
    slug: 'literatura', nombre: 'Literatura', clase: 'd-literatura', icono: 'i-literatura',
    texto: 'Lecturas, recitales de poesía y presentaciones de obras literarias.',
  },
  {
    slug: 'cinematografia', nombre: 'Cinematografía', clase: 'd-cine', icono: 'i-cine',
    texto: 'Cortometrajes y muestras audiovisuales hechos por estudiantes.',
  },
];

// ---------- Ubicación ----------
export const ubicacion = {
  titulo: 'Ciudad Universitaria, UNAH',
  texto: 'Tegucigalpa, M.D.C., Honduras. Del 10 al 12 de noviembre de 2026. ¡Te esperamos con entrada libre y gratuita!',
  mapa: 'https://maps.google.com/maps?q=Ciudad%20Universitaria%20UNAH%20Tegucigalpa&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

// ---------- Textos de la portada ----------
export const talento = {
  eyebrow: 'Eres parte',
  linea1: 'Tu talento es identidad',
  linea2: 'Tu arte también es Honduras',
  texto: 'Música, teatro, danza, artes visuales, literatura o cine: el escenario es tuyo. Súmate a FUCAIN y muestra lo que sabes hacer.',
  boton: 'Quiero participar',
};
