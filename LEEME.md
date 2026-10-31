# FUCAIN 2026 – versión React (guía para principiantes)

## 1. Cómo verlo en tu computadora
1. Instala **Node.js** (versión LTS) desde https://nodejs.org si no lo tienes.
2. Abre una terminal **dentro de esta carpeta del proyecto** (la que tiene `package.json`).
3. La primera vez escribe: `npm install` (descarga lo necesario; ya está hecho en esta carpeta).
4. Cada vez que quieras verlo: `npm run dev`
5. Abre en el navegador la dirección que aparece (normalmente http://localhost:5173).
   Mientras `npm run dev` esté corriendo, **cada cambio que guardes se ve al instante**.
6. Para apagarlo: en la terminal presiona `Ctrl + C`.

## 2. Dónde poner los PDF y las fotos
Todo está dentro de la carpeta `public/`. **No hay que tocar código**: solo copia el archivo con el nombre exacto.

**PDF** → `public/docs/programacion/`
`programacion-general.pdf`, `componente-academico.pdf`, `musica.pdf`, `teatro.pdf`, `danza.pdf`,
`artes-visuales.pdf`, `literatura.pdf`, `cinematografia.pdf`
(Mientras un PDF no exista, su botón dice "Próximamente".)

**Fotos** → `public/img/fotos/` (JPG, ideal 1800×1200 px y menos de 400 KB)
`galeria-01.jpg` … `galeria-09.jpg` (proporción 3:2)
`talento.jpg` (vertical, foto del banner decorativo)
Opcionales (fondo de la página de disciplinas): `disciplina-musica.jpg`, `disciplina-teatro.jpg`,
`disciplina-danza.jpg`, `disciplina-artes-visuales.jpg`, `disciplina-literatura.jpg`, `disciplina-cinematografia.jpg`

**Galería completa** (página `/galeria`) → `public/galeria/dia-1/`, `dia-2/` y `dia-3/`: fotos originales `0001.jpg`, `0002.jpg`… (miniaturas opcionales en `dia-N/miniaturas/`). Después ejecuta `npm run fotos` y `npm run build`. Instrucciones en el `LEEME.txt` de esa carpeta.

**Fotos de escenarios** → `public/img/escenarios/` (`01-cise.jpg` … `09-plaza-registro.jpg`, más `10-alma-mater-lobby.jpg` y `10-alma-mater-mezanine.jpg` para el escenario 10, que tiene dos áreas; la lista exacta está en el `LEEME.txt` de esa carpeta)

**Logos** → `public/img/logos/` (el footer usa `voae-blanco.png` y `unah-blanco.png`; si faltan, muestra las versiones a color) · **Logos de participantes (UNITEC: agrega `unitec.png` en `public/img/universidades/`)** → `public/img/universidades/`
**Gráficos decorativos** (asteriscos y confeti) → `public/img/graficos/` (`asteriscos-1/2/3.png` se usan entre secciones y en el banner decorativo; `asterisco-rojo.png` y `asterisco-grupo.png` son los asteriscos que giran en la portada)

## 3. Dónde cambiar los textos
Abre **`src/data/contenido.js`**. Ahí están, con comentarios en español:
- fecha de inicio de la cuenta regresiva
- el pie de página (footer, `pie`): solo los 3 logos
- los 10 escenarios (número, nombre, descripción corta y archivo de foto)
- el mapa interactivo de la portada, en la sección de disciplinas (`escenariosMapa`: coordenadas, capacidad, manifestaciones y lado de la etiqueta; las fotos son las mismas de `public/img/escenarios/`)
- los 4 contadores (número, etiqueta y detalle)
- las fotos de la galería y sus textos alternativos
- los participantes (nombre, sigla y logo) y los textos de la sección Participantes
- las 3 tarjetas de programación y las 6 disciplinas
- la dirección y el mapa

Los textos largos de la portada (título, "Entrada libre y gratuita", etc.) están dentro de
`src/componentes/` (un archivo por sección: `Hero.jsx`, `Footer.jsx`…). Se editan igual: busca el texto y cámbialo.

## 4. Qué carpeta entregar a la universidad
1. En la terminal, dentro de la carpeta del proyecto, escribe: `npm run build`
2. Se crea (o se actualiza) la carpeta **`dist/`**.
3. **Entrega solo el contenido de `dist/`** (index.html, assets, img, docs). Se sube a cualquier carpeta del servidor,
   y se abre en `.../esa-carpeta/index.html`. Funciona sin configuración especial (usa HashRouter y rutas relativas).
4. Cada vez que cambies algo (textos, fotos o PDF) vuelve a ejecutar `npm run build` y entrega `dist/` otra vez.
   Para solo cambiar un PDF o una foto ya publicada, basta con reemplazar ese archivo en el servidor
   (dentro de `docs/programacion/` o `img/fotos/`).

## Mapa del proyecto
```
(carpeta del proyecto)/
├─ referencias/       ← afiches de inspiración (NO se publica)
├─ public/            ← PDF, fotos y logos (se copian tal cual)
├─ src/
│  ├─ data/contenido.js   ← textos editables
│  ├─ componentes/        ← una pieza por sección (Header, Hero, Escenarios, Programacion, Contadores,
│  │                        Galeria, LogoAnimado, Participantes, BannerDecorativo, Disciplinas, Footer)
│  │                        + Grafico y SeparadorConfeti (decoración)
│  ├─ paginas/            ← Inicio (portada) y PaginaDisciplinas (/disciplinas)
│  ├─ estilos/            ← un archivo CSS por componente
│  ├─ hooks/              ← efectos reutilizables (aparecer al hacer scroll, parallax)
│  └─ App.jsx             ← rutas (HashRouter)
├─ vite.config.js     ← base './' (funciona en cualquier carpeta)
└─ dist/              ← lo que se entrega (se genera con npm run build)
```
