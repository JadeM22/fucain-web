import { Link } from 'react-router-dom';
import EnlaceSeccion from './EnlaceSeccion';
import Estrella from './Estrella';
import { contacto, redes } from '../data/contenido';
import { ruta } from '../utils/ruta';

const ICONOS_REDES = {
  facebook: 'M14 8V6.500c0-.8.200-1.200 1.300-1.200H17V2.200C16.700 2.100 15.700 2 14.600 2 12.100 2 10.500 3.500 10.500 6.200V8H8v3.500h2.500V22H14V11.500h2.800L17.300 8z',
  instagram: 'M7.500 2h9A5.500 5.500 0 0 1 22 7.500v9a5.500 5.500 0 0 1-5.500 5.500h-9A5.500 5.500 0 0 1 2 16.500v-9A5.500 5.500 0 0 1 7.500 2zm0 2A3.500 3.500 0 0 0 4 7.500v9A3.500 3.500 0 0 0 7.500 20h9a3.500 3.500 0 0 0 3.500-3.500v-9A3.500 3.500 0 0 0 16.500 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.500-3.500a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400z',
  youtube: 'M21.600 7.200a2.500 2.500 0 0 0-1.700-1.800C18.400 5 12 5 12 5s-6.400 0-7.900.4A2.500 2.500 0 0 0 2.400 7.200C2 8.700 2 12 2 12s0 3.300.4 4.800a2.500 2.500 0 0 0 1.700 1.800C5.600 19 12 19 12 19s6.400 0 7.900-.4a2.500 2.500 0 0 0 1.700-1.800C22 15.300 22 12 22 12s0-3.300-.4-4.800zM10 15V9l5.200 3z',
};

export default function Footer() {
  return (
    <footer className="pie" id="contacto">
      <Estrella estilo={{ '--s': '140px', '--c': 'var(--turquesa)', right: '-30px', top: '30px', '--t': '30s' }} />
      <div className="contenedor">
        <div className="pie__grid">
          <div>
            <div className="pie__logos">
              <img className="l-f" src={ruta('img/logos/fucain-azul.png')} alt="FUCAIN UNAH" width="500" height="499" />
              <span className="chip"><img src={ruta('img/logos/unah.png')} alt="UNAH" width="618" height="404" /></span>
              <span className="chip"><img src={ruta('img/logos/voae.png')} alt="VOAE" width="1735" height="815" /></span>
            </div>
            <p style={{ marginTop: '1rem', maxWidth: '34ch' }}>
              Festival Universitario de la Cultura y el Arte para la Identidad Nacional.
            </p>
          </div>
          <div>
            <h4>Enlaces rápidos</h4>
            <ul>
              <li><EnlaceSeccion id="escenarios">Escenarios</EnlaceSeccion></li>
              <li><EnlaceSeccion id="cronograma">Cronograma</EnlaceSeccion></li>
              <li><Link to="/disciplinas">Cronograma por disciplina</Link></li>
              <li><EnlaceSeccion id="galeria">Galería</EnlaceSeccion></li>
              <li><Link to="/galeria">Galería completa</Link></li>
              <li><EnlaceSeccion id="universidades">Universidades</EnlaceSeccion></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href={`mailto:${contacto.correo}`}>{contacto.correo}</a></li>
              <li><a href={`tel:${contacto.telefonoLink}`}>{contacto.telefono}</a></li>
              <li>{contacto.direccion}</li>
            </ul>
            <div className="redes">
              {redes.map((r) => (
                <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.nombre} key={r.tipo}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONOS_REDES[r.tipo]} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="pie__copy">© 2026 UNAH – VOAE · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
