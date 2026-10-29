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

**PDF** → `public/docs/cronogramas/`
`cronograma-general.pdf`, `componente-academico.pdf`, `musica.pdf`, `teatro.pdf`, `danza.pdf`,
`artes-visuales.pdf`, `literatura.pdf`, `cinematografia.pdf`
(Mientras un PDF no exista, su botón dice "Próximamente".)

**Fotos** → `public/img/fotos/` (JPG, ideal 1800×1200 px y menos de 400 KB)
`galeria-01.jpg` … `galeria-09.jpg` (proporción 3:2)
`talento.jpg` (vertical)
Opcionales (fondo de la página de disciplinas): `disciplina-musica.jpg`, `disciplina-teatro.jpg`,
`disciplina-danza.jpg`, `disciplina-artes-visuales.jpg`, `disciplina-literatura.jpg`, `disciplina-cinematografia.jpg`

**Galería completa** (página `/galeria`) → `public/img/galeria/`: `general-01.jpg` … `general-05.jpg`, `dia-1-01.jpg` … `dia-1-09.jpg`, y lo mismo para `dia-2-` y `dia-3-` (lista en el `LEEME.txt` de esa carpeta; cuántas fotos hay por bloque se cambia en `src/data/contenido.js`, `galeriaCompleta`)

**Descargar todas las fotos** → pon un `.zip` en `public/descargas/fotos-fucain-2026.zip`. Cada foto también tiene su botón "Descargar" en el visor. Mientras no existan, los botones avisan "próximamente".

**Fotos de escenarios** → `public/img/escenarios/` (`01-cise.jpg` … `10-alma-mater.jpg`; la lista exacta está en el `LEEME.txt` de esa carpeta)

**Logos** → `public/img/logos/` · **Logos de universidades** → `public/img/universidades/`
**Gráficos decorativos** (asteriscos y confeti) → `public/img/graficos/` (`asteriscos-1/2/3.png` se usan entre secciones y en el banner de talento; `asterisco-rojo.png` y `asterisco-grupo.png` son los asteriscos que giran en la portada)

## 3. Dónde cambiar los textos
Abre **`src/data/contenido.js`**. Ahí están, con comentarios en español:
- fecha de inicio de la cuenta regresiva
- contacto (correo, teléfono, dirección) y redes sociales
- los 10 escenarios (número, nombre, descripción corta y archivo de foto)
- los 4 contadores (número, etiqueta y detalle)
- las fotos de la galería y sus textos alternativos
- la lista de universidades del carrusel
- las 3 tarjetas de cronograma y las 6 disciplinas
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
   (dentro de `docs/cronogramas/` o `img/fotos/`).

## Mapa del proyecto
```
(carpeta del proyecto)/
├─ referencias/       ← afiches de inspiración (NO se publica)
├─ public/            ← PDF, fotos y logos (se copian tal cual)
├─ src/
│  ├─ data/contenido.js   ← textos editables
│  ├─ componentes/        ← una pieza por sección (Header, Hero, Escenarios, Cronograma, Contadores,
│  │                        Galeria, LogoAnimado, CarruselUniversidades, BannerTalento, Disciplinas, Footer)
│  │                        + Grafico y SeparadorConfeti (decoración)
│  ├─ paginas/            ← Inicio (portada) y PaginaDisciplinas (/disciplinas)
│  ├─ estilos/            ← un archivo CSS por componente
│  ├─ hooks/              ← efectos reutilizables (aparecer al hacer scroll, parallax)
│  └─ App.jsx             ← rutas (HashRouter)
├─ vite.config.js     ← base './' (funciona en cualquier carpeta)
└─ dist/              ← lo que se entrega (se genera con npm run build)
```
