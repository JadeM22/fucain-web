import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Album from '../componentes/galeria/Album';
import BarraSeleccion from '../componentes/galeria/BarraSeleccion';
import Cierre from '../componentes/galeria/Cierre';
import Cintas from '../componentes/galeria/Cintas';
import ModalProgreso from '../componentes/galeria/ModalProgreso';
import Muro from '../componentes/galeria/Muro';
import Portada from '../componentes/galeria/Portada';
import Visor from '../componentes/galeria/Visor';
import { ToastsProvider, useToasts } from '../componentes/galeria/Toasts';
import { DIAS } from '../componentes/galeria/datos';
import useDescargas from '../hooks/useDescargas';
import useFotosGaleria from '../hooks/useFotosGaleria';
import { reducirMovimiento } from '../utils/ruta';

// Línea arcoíris de 3px bajo el header: 7 franjas iguales con la paleta
const ARCOIRIS = ['rojo', 'naranja', 'amarillo', 'verde', 'turquesa', 'celeste', 'morado'];

function Galeria() {
  const { listo, fotos } = useFotosGaleria();
  const { avisar } = useToasts();
  const { progreso, una, varias, cancelar } = useDescargas();
  const [params, setParams] = useSearchParams();

  // Filtro: 0 = todas, 1..3 = día. Se lee de ?dia=N
  const [dia, setDia] = useState(() => Math.min(3, Math.max(0, Number(params.get('dia')) || 0)));
  const [saliendo, setSaliendo] = useState(false);
  const [modoSel, setModoSel] = useState(false);
  const [seleccion, setSeleccion] = useState(() => new Set());
  const [visor, setVisor] = useState(null); // { lista, inicio, origen }

  const conteos = useMemo(() => {
    const c = { 1: 0, 2: 0, 3: 0 };
    fotos.forEach((f) => { c[f.dia] += 1; });
    return c;
  }, [fotos]);

  const visibles = useMemo(() => (dia ? fotos.filter((f) => f.dia === dia) : fotos), [fotos, dia]);

  // Cambio de filtro: las tarjetas salen (fade + translate), se actualiza ?dia=N con replaceState y entran en cascada
  const cambiarDia = useCallback((n, { irAlAlbum = false } = {}) => {
    if (irAlAlbum) {
      const album = document.getElementById('album');
      if (album) album.scrollIntoView({ behavior: reducirMovimiento() ? 'auto' : 'smooth', block: 'start' });
    }
    if (n === dia) return;
    const aplicar = () => {
      setDia(n);
      setParams(n ? { dia: String(n) } : {}, { replace: true });
      setSaliendo(false);
    };
    if (reducirMovimiento()) { aplicar(); return; }
    setSaliendo(true);
    setTimeout(aplicar, 260);
  }, [dia, setParams]);

  const nombreZip = dia ? `fucain-2026_dia-${dia}.zip` : 'fucain-2026_todo.zip';
  const tituloZip = dia ? `Descargando ${DIAS[dia - 1].nombre}` : 'Descargando todas las fotos';
  const descargarVisibles = () => varias(visibles, nombreZip, tituloZip);

  const alternarSeleccion = (foto) => setSeleccion((s) => {
    const nueva = new Set(s);
    if (nueva.has(foto.id)) nueva.delete(foto.id); else nueva.add(foto.id);
    return nueva;
  });
  const salirSeleccion = () => { setModoSel(false); setSeleccion(new Set()); };
  const descargarSeleccion = () => {
    const elegidas = fotos.filter((f) => seleccion.has(f.id));
    if (!elegidas.length) { avisar('info', 'Primero elige algunas fotos.'); return; }
    varias(elegidas, 'fucain-2026_seleccion.zip', 'Descargando tu selección');
  };

  const abrirDesdeAlbum = (foto, rect) => setVisor({ lista: visibles, inicio: visibles.indexOf(foto), origen: rect });
  const abrirDesdeMuro = (foto, rect) => setVisor({ lista: fotos, inicio: fotos.indexOf(foto), origen: rect });

  return (
    <>
      <main id="contenido" className="gp">
        <div className="gp-arcoiris" aria-hidden="true">
          {ARCOIRIS.map((c) => <span key={c} style={{ background: `var(--${c})` }} />)}
        </div>

        <Portada
          dia={dia}
          conteos={conteos}
          total={fotos.length}
          onElegir={(n) => cambiarDia(n, { irAlAlbum: true })}
          onDescargar={descargarVisibles}
        />
        <Cintas />
        <Muro fotos={fotos} onAbrir={abrirDesdeMuro} />
        <Album
          fotos={visibles}
          dia={dia}
          conteos={conteos}
          total={fotos.length}
          listo={listo}
          saliendo={saliendo}
          onDia={cambiarDia}
          modoSel={modoSel}
          onModoSel={() => (modoSel ? salirSeleccion() : setModoSel(true))}
          seleccion={seleccion}
          onToggle={alternarSeleccion}
          onAbrir={abrirDesdeAlbum}
          onDescargarFoto={una}
          onDescargarVisibles={descargarVisibles}
        />
        <Cierre />
      </main>

      {modoSel && (
        <BarraSeleccion
          cantidad={seleccion.size}
          onElegirVisibles={() => setSeleccion(new Set(visibles.map((f) => f.id)))}
          onDescargar={descargarSeleccion}
          onSalir={salirSeleccion}
        />
      )}
      {visor && (
        <Visor
          fotos={visor.lista}
          inicio={Math.max(0, visor.inicio)}
          origen={visor.origen}
          onCerrar={() => setVisor(null)}
          onDescargar={una}
        />
      )}
      <ModalProgreso progreso={progreso} onCancelar={cancelar} />
    </>
  );
}

// Página /galeria: portada con filtros, cintas, muro 3D, álbum con descargas y cierre
export default function PaginaGaleria() {
  return (
    <ToastsProvider>
      <Galeria />
    </ToastsProvider>
  );
}
