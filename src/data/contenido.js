// ============================================================
//  CONTENIDO EDITABLE DE FUCAIN 2026
//  Cambia aquí los textos, cifras, universidades y el pie de página (contacto y redes incluidos).
//  Guarda el archivo y la página se actualiza sola (npm run dev).
// ============================================================

// Fecha y hora de inicio del festival (hora de Honduras, UTC-6).
// Formato: AAAA-MM-DDTHH:MM:SS-06:00
export const fechaInicio = '2026-11-10T00:00:00-06:00';

// ---------- Pie de página (footer) ----------
// Los 3 logos (en este orden de izquierda a derecha), descripción, enlaces rápidos, contacto, redes y derechos.
// archivo: dentro de public/img/logos/ · respaldo: versión a color que se muestra si el archivo no existe
// clase: tamaño de cada logo (se ajusta en src/estilos/footer.css para que se vean parejos)
export const pie = {
  logos: [
    { archivo: 'fucain-azul.png', alt: 'FUCAIN', clase: 'pie__logo--fucain', ancho: 500, alto: 499 },
    { archivo: 'voae-blanco.png', respaldo: 'voae.png', alt: 'VOAE', clase: 'pie__logo--voae', ancho: 689, alto: 362 },
    { archivo: 'unah-blanco.png', respaldo: 'unah.png', alt: 'UNAH', clase: 'pie__logo--unah', ancho: 657, alto: 380 },
  ],
  descripcion: 'Festival Universitario de la Cultura y el Arte para la Identidad Nacional.',
  // seccion: id de una sección de la portada · ruta: otra página del sitio
  enlaces: [
    { texto: 'Escenarios', seccion: 'escenarios' },
    { texto: 'Cronograma', seccion: 'cronograma' },
    { texto: 'Cronograma por disciplina', ruta: '/disciplinas' },
    { texto: 'Galería', seccion: 'galeria' },
    { texto: 'Galería completa', ruta: '/galeria' },
    { texto: 'Universidades', seccion: 'universidades' },
  ],
  // Contacto (datos de EJEMPLO: reemplazar por los oficiales)
  contacto: {
    correo: 'fucain@unah.edu.hn',
    telefono: '(+504) 2216-0000',
    telefonoLink: '+50422160000', // sin espacios ni guiones, para que el celular pueda llamar
    direccion: 'Ciudad Universitaria, Tegucigalpa',
  },
  // Redes sociales (enlaces de EJEMPLO) · tipo puede ser: 'facebook', 'instagram' o 'youtube'
  redes: [
    { tipo: 'facebook', nombre: 'Facebook de FUCAIN', url: 'https://www.facebook.com/' },
    { tipo: 'instagram', nombre: 'Instagram de FUCAIN', url: 'https://www.instagram.com/' },
    { tipo: 'youtube', nombre: 'YouTube de FUCAIN', url: 'https://www.youtube.com/' },
  ],
  derechos: '© 2026 UNAH – VOAE',
};

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

// ---------- Mapa de escenarios (sección #ubicacion de la portada) ----------
// Manifestaciones: color del mapa, tinte de fondo y color de texto (contraste 4.5:1 sobre el tinte)
export const tiposMapa = {
  musica: { nombre: 'Música', color: '#E84E2B', tinte: '#FCE3DC', texto: '#B5361A' },
  escenicas: { nombre: 'Artes escénicas', color: '#85328A', tinte: '#F1E2F2', texto: '#6B2370' },
  visuales: { nombre: 'Visuales, literatura y cine', color: '#12AC9C', tinte: '#DDF4F1', texto: '#0B6F64' },
};

// En este orden se numeran y se une la ruta del recorrido.
// corto: nombre de la etiqueta del mapa · pos: arriba | abajo | izquierda | derecha (lado de la etiqueta)
// tipos: manifestaciones (si son dos, el color se parte 50/50) · modo: sentadas | de pie
// foto: archivo en public/img/escenarios/ (si no existe, se avisa que llegará pronto)
export const escenariosMapa = [
  { corto: 'Anfiteatro CISE', nombre: 'Anfiteatro del Edificio CISE', edificio: 'Edificio CISE', capacidad: 2000, modo: 'sentadas', tipos: ['musica', 'escenicas'], lat: 14.08446, lon: -87.16538, pos: 'abajo', foto: '01-cise.jpg', nota: 'Gradas y escenario para presentaciones del festival.' },
  { corto: 'Auditorio 1 · C3', nombre: 'Auditorio No. 1, Edificio C3', edificio: 'Edificio C3', capacidad: 110, modo: 'sentadas', tipos: ['musica'], lat: 14.08655, lon: -87.16530, pos: 'arriba', foto: '06-auditorio-1-c3.jpg', nota: 'Presentaciones, charlas y conferencias del festival.' },
  { corto: 'Auditorio 2 · C3', nombre: 'Auditorio No. 2, Edificio C3', edificio: 'Edificio C3', capacidad: 110, modo: 'sentadas', tipos: ['musica', 'escenicas'], lat: 14.08640, lon: -87.16508, pos: 'derecha', foto: '07-auditorio-2-c3.jpg', nota: 'Música, teatro y actividades del componente académico.' },
  { corto: 'Puente Aéreo', nombre: 'Edificio 1847 "Puente Aéreo"', edificio: 'Edificio 1847', capacidad: 500, modo: 'de pie', tipos: ['escenicas'], lat: 14.08571, lon: -87.16501, pos: 'izquierda', foto: '04-edificio-1847.jpg', nota: 'Muestras y actividades artísticas del festival.' },
  { corto: 'Plaza Cuatro Culturas', nombre: 'Plaza Cuatro Culturas', edificio: 'Plaza abierta', capacidad: 500, modo: 'de pie', tipos: ['escenicas'], lat: 14.08522, lon: -87.16412, pos: 'abajo', foto: '03-cuatro-culturas.jpg', nota: 'Plaza al aire libre para muestras, danza y ambiente de fiesta.' },
  { corto: 'Teatro Padre Trino', nombre: 'Teatro Padre Trino', edificio: 'Edificio D1', capacidad: 100, modo: 'sentadas', tipos: ['escenicas'], lat: 14.08556, lon: -87.16430, pos: 'abajo', foto: '02-padre-trino.jpg', nota: 'Obras de teatro y puestas en escena universitarias.' },
  { corto: 'Aud. José C. del Valle', nombre: 'Auditorio "José Cecilio del Valle"', edificio: 'Edificio C1', capacidad: 200, modo: 'sentadas', tipos: ['visuales'], lat: 14.08678, lon: -87.16331, pos: 'arriba', foto: '05-jose-cecilio.jpg', nota: 'Conciertos, recitales y presentaciones con escenario y butacas.' },
  { corto: 'Cinemateca', nombre: 'Cinemateca "Enrique Ponce Garay"', edificio: 'Cinemateca', capacidad: 143, modo: 'sentadas', tipos: ['visuales'], lat: 14.08540, lon: -87.16285, pos: 'arriba', foto: '08-cinemateca.jpg', nota: 'Proyección de cortometrajes y muestras audiovisuales.' },
  { corto: 'Plaza Registro', nombre: 'Anfiteatro de Plaza Registro', edificio: 'Plaza Registro', capacidad: 500, modo: 'de pie', tipos: ['musica', 'escenicas'], lat: 14.08363, lon: -87.16310, pos: 'abajo', foto: '09-plaza-registro.jpg', nota: 'Escenario al aire libre para música y danza.' },
  { corto: 'Alma Máter', nombre: 'Lobby y Mezanine, edificio Alma Máter', edificio: 'Edificio Alma Máter', capacidad: 100, modo: 'de pie', tipos: ['visuales'], lat: 14.08436, lon: -87.16151, pos: 'abajo', foto: '10-alma-mater.jpg', nota: 'Exposiciones de artes visuales y lecturas literarias.' },
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

// ---------- Participantes (sección #universidades) ----------
// En este orden se muestran. sigla: se ve si no hay logo · logo: archivo dentro de public/img/
// (si el archivo no existe todavía, por ejemplo unitec.png, se muestra la sigla sola; al agregarlo aparece el logo)
export const participantes = [
  { sigla: 'UNAH', nombre: 'Universidad Nacional Autónoma de Honduras', logo: 'logos/unah.png' },
  { sigla: 'UNPH', nombre: 'Universidad Nacional de la Policía de Honduras', logo: 'universidades/unph.png' },
  { sigla: 'UPNFM', nombre: 'Universidad Pedagógica Nacional Francisco Morazán', logo: 'universidades/upnfm.png' },
  { sigla: 'UNICAH', nombre: 'Universidad Católica de Honduras', logo: 'universidades/unicah.png' },
  { sigla: 'UJCV', nombre: 'Universidad José Cecilio del Valle', logo: 'universidades/ujcv.png' },
  { sigla: 'UDH', nombre: 'Universidad de Defensa de Honduras', logo: 'universidades/udh.png' },
  { sigla: 'UTH', nombre: 'Universidad Tecnológica de Honduras', logo: 'universidades/uth.png' },
  { sigla: 'UCRISH', nombre: 'Universidad Cristiana de Honduras', logo: 'universidades/ucrish.png' },
  { sigla: 'UNITEC', nombre: 'Universidad Tecnológica Centroamericana', logo: 'universidades/unitec.png' },
];

// Textos de la sección Participantes
export const textoParticipantes = {
  etiqueta: 'Participantes',
  titulo: 'Nueve instituciones, ',
  resaltado: 'una sola fiesta',
  parrafo: 'La UNAH, con delegaciones de sus nueve campus, y ocho universidades del país forman el Sistema de Educación Superior presente en FUCAIN 2026.',
};

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


// ---------- Textos de la portada ----------
export const bannerDecorativo = {
  eyebrow: 'Eres parte',
  linea1: 'Tu talento es identidad',
  linea2: 'Tu arte también es Honduras',
  texto: 'Música, teatro, danza, artes visuales, literatura o cine: el escenario es tuyo. Súmate a FUCAIN y muestra lo que sabes hacer.',
  boton: 'Ver cronogramas', // lleva a la sección del cronograma de la portada
};
