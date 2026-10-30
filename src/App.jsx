import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Iconos from './componentes/Iconos';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import PaginaDisciplinas from './paginas/PaginaDisciplinas';
import PaginaGaleria from './paginas/PaginaGaleria';


const TITULOS = {
  '/disciplinas': 'Cronograma por disciplina · FUCAIN 2026',
  '/galeria': 'Galería completa · FUCAIN 2026',
};
const TITULO_INICIO = 'FUCAIN 2026 · Festival Universitario de la Cultura y el Arte para la Identidad Nacional';

// Al cambiar de página: sube al inicio y pone el título correcto
function CambioDePagina() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITULOS[pathname] || TITULO_INICIO;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    // HashRouter: las rutas van después de "#" (ej. index.html#/disciplinas) y no necesitan configuración del servidor
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CambioDePagina />
      <a className="saltar" href="#contenido" onClick={(e) => { e.preventDefault(); document.getElementById('contenido')?.scrollIntoView(); }}>
        Saltar al contenido
      </a>
      <Iconos />
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/disciplinas" element={<PaginaDisciplinas />} />
        <Route path="/galeria" element={<PaginaGaleria />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
