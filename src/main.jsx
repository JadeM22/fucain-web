import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Estilos: primero la base y al final "movimiento reducido" (debe ganar a los demás)
import './estilos/base.css';
import './estilos/header.css';
import './estilos/hero.css';
import './estilos/guirnalda.css';
import './estilos/escenarios.css';
import './estilos/programacion.css';
import './estilos/contadores.css';
import './estilos/galeria.css';
import './estilos/logo-animado.css';
import './estilos/participantes.css';
import './estilos/banner-decorativo.css';
import './estilos/disciplinas.css';
import './estilos/footer.css';
import './estilos/pagina-disciplinas.css';
import './estilos/gp-pagina.css';
import './estilos/gp-visor.css';
import './estilos/gp-ui.css';
import './estilos/escenarios-mapa.css';
import './estilos/graficos.css';
import './estilos/revelado.css';
import './estilos/movimiento-reducido.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
