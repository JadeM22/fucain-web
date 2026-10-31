import BotonFucain from './BotonFucain';
import EnlaceSeccion from './EnlaceSeccion';
import Guirnalda from './Guirnalda';
import ConfetiFlotante from './ConfetiFlotante';
import { ruta } from '../utils/ruta';

const grafico = (archivo) => ruta(`img/graficos/${archivo}`);

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo">
      {/* Manchas de color muy difuminadas */}
      <div className="hero__fondo" aria-hidden="true">
        <span className="mancha mancha--amarilla" />
        <span className="mancha mancha--lila" />
      </div>

      <Guirnalda />

      {/* Decoración flotante (no recibe clics ni la leen los lectores de pantalla) */}
      <div className="hero__deco" aria-hidden="true">
        <span className="circulo circulo--punteado" />
        <span className="circulo circulo--celeste" />

        {/* Asteriscos PNG: un grupo grande abajo a la izquierda, uno a media altura a la derecha y dos pequeños arriba */}
        <img className="ast ast--grupo-grande" src={grafico('asterisco-grupo.png')} alt="" decoding="async" />
        <img className="ast ast--rojo-medio" src={grafico('asterisco-rojo.png')} alt="" decoding="async" />
        <img className="ast ast--rojo-chico" src={grafico('asterisco-rojo.png')} alt="" decoding="async" />
        <img className="ast ast--grupo-chico" src={grafico('asterisco-grupo.png')} alt="" decoding="async" />

        <ConfetiFlotante />
      </div>

      <div className="hero__in">
        <p className="hero__sub cascada" style={{ '--i': 0 }}>Edición 2026 · Honduras</p>

        {/* El título es la imagen del logotipo oficial (letras dibujadas a mano); el alt hace que se lea "FUCAIN" */}
        <h1 className="hero__h1 cascada" id="hero-titulo" style={{ '--i': 1 }}>
          <img src={ruta('img/logos/fucain-wordmark.png')} alt="FUCAIN" width="813" height="301" />
        </h1>

        <p className="hero__lema cascada" style={{ '--i': 2 }}>
          Festival Universitario de la Cultura y el Arte para la Identidad Nacional
        </p>

        <div className="hero__cta">
          <BotonFucain as={EnlaceSeccion} id="programacion" color="amarillo" inc="-1.6deg" className="cascada" style={{ '--i': 3 }}>
            Ver programación
          </BotonFucain>
          <BotonFucain as={EnlaceSeccion} id="galeria" color="turquesa" inc="1.3deg" className="cascada" style={{ '--i': 4 }}>
            Ver galería
          </BotonFucain>
        </div>
      </div>
    </section>
  );
}
