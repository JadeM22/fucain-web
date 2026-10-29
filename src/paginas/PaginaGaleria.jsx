import { useMemo } from 'react';
import BotonDescarga from '../componentes/BotonDescarga';
import EnlaceSeccion from '../componentes/EnlaceSeccion';
import Estrella from '../componentes/Estrella';
import Icono from '../componentes/Icono';
import Mosaico from '../componentes/Mosaico';
import VisorFotos from '../componentes/VisorFotos';
import { descargaFotos } from '../data/contenido';
import useRevelar from '../hooks/useRevelar';
import useVisor from '../hooks/useVisor';
import { armarGaleriaCompleta } from '../utils/galeria';

// Página /galeria: fotos generales y luego por día. Un solo visor recorre todas las fotos en orden.
export default function PaginaGaleria() {
  useRevelar();
  const bloques = useMemo(() => armarGaleriaCompleta(), []);
  const todas = useMemo(() => bloques.flatMap((b) => b.fotos), [bloques]);
  const { actual, abrir, cerrar, mover } = useVisor(todas.length);

  const irA = (id) => document.getElementById(id)?.scrollIntoView({ block: 'start' });

  return (
    <main id="contenido">
      <section className="pag-cabecera" aria-labelledby="t-gal-pag">
        <Estrella estilo={{ '--s': '120px', '--c': 'var(--turquesa)', left: '-30px', top: '30%', '--t': '26s' }} />
        <Estrella estilo={{ '--s': '70px', '--c': 'var(--rojo)', right: '8%', top: '22%', '--t': '16s' }} />
        <Estrella estilo={{ '--s': '100px', '--c': 'var(--amarillo)', right: '-24px', bottom: '10%', '--t': '22s' }} />
        <div className="contenedor">
          <div className="volver-wrap">
            <EnlaceSeccion id="galeria" className="volver">
              <Icono id="i-flecha" style={{ transform: 'scaleX(-1)' }} /> Volver al inicio
            </EnlaceSeccion>
          </div>
          <p className="eyebrow">Momentos</p>
          <h1 className="titulo" id="t-gal-pag">Galería <span className="c3">completa</span></h1>
          <p className="lead">Primero lo mejor del festival y después las fotos de cada día. Toca una foto para verla en grande y descargarla.</p>

          <div className="gal-acciones">
            <BotonDescarga archivo={descargaFotos.archivo} color="amarillo" inc="-1.4deg">{descargaFotos.texto}</BotonDescarga>
          </div>

          <nav className="gal-nav" aria-label="Secciones de la galería">
            {bloques.map((b) => (
              <button type="button" className="gal-chip" style={{ '--c': b.color, '--on': b.on }} onClick={() => irA(b.id)} key={b.id}>
                {b.fecha ? `${b.titulo} · ${b.fecha}` : b.titulo}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div className="gal-pag corte-izq">
        {bloques.map((b) => (
          <section className="gal-bloque" id={b.id} aria-labelledby={`t-${b.id}`} key={b.id}>
            <div className="contenedor">
              <div className="gal-bloque__cab rev">
                <span className="gal-bloque__marca" style={{ '--c': b.color }} aria-hidden="true" />
                <div>
                  <p className="eyebrow">{b.eyebrow}</p>
                  <h2 className="titulo" id={`t-${b.id}`}>
                    {b.titulo}{b.fecha && <span className="gal-bloque__fecha"> · {b.fecha}</span>}
                  </h2>
                </div>
              </div>
              <Mosaico fotos={b.fotos} onAbrir={(i) => abrir(b.inicio + i)} />
            </div>
          </section>
        ))}
      </div>

      <VisorFotos fotos={todas} actual={actual} onCerrar={cerrar} onMover={mover} />
    </main>
  );
}
