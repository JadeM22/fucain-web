import { pie } from '../data/contenido';
import { ruta } from '../utils/ruta';

const grafico = (archivo) => ruta(`img/graficos/${archivo}`);

// Si el logo blanco todavía no existe, se cambia una sola vez por su versión a color
const usarRespaldo = (respaldo) => (e) => {
  const img = e.currentTarget;
  if (respaldo && !img.dataset.respaldo) {
    img.dataset.respaldo = '1';
    img.src = ruta(`img/logos/${respaldo}`);
  }
};

export default function Footer() {
  return (
    <footer className="pie corte-der">
      {/* Asteriscos que giran (misma animación "girar" que los de la portada) */}
      <img className="ast pie__ast--grande" src={grafico('asterisco-grupo.png')} alt="" aria-hidden="true" decoding="async" loading="lazy" />
      <img className="ast pie__ast--chico" src={grafico('asterisco-rojo.png')} alt="" aria-hidden="true" decoding="async" loading="lazy" />
      <div className="contenedor">
        <div className="pie__logos">
          {pie.logos.map((l, i) => (
            <span className="pie__item" key={l.archivo}>
              {i > 0 && <span className="pie__sep" aria-hidden="true" />}
              <img
                className={`pie__logo ${l.clase}`}
                src={ruta(`img/logos/${l.archivo}`)}
                alt={l.alt}
                width={l.ancho}
                height={l.alto}
                onError={usarRespaldo(l.respaldo)}
              />
            </span>
          ))}
        </div>
        <p className="pie__copy">{pie.derechos}</p>
      </div>
    </footer>
  );
}
