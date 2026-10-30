import Icono from '../Icono';

const FRASES = ['Revive', 'Descarga', 'Comparte', 'Día 1', 'Día 2', 'Día 3'];

// Una pista de texto con estrellas entre palabras. Se repite dos veces para que el movimiento sea infinito.
function Pista() {
  return [0, 1].map((copia) => (
    <span className="gp-cinta__grupo" key={copia}>
      {FRASES.map((f) => (
        <span className="gp-cinta__item" key={f}>
          {f}
          <Icono id="estrella" className="gp-cinta__est" />
        </span>
      ))}
    </span>
  ));
}

// Dos cintas cruzadas con marquee infinito (sólo decoración)
export default function Cintas() {
  return (
    <div className="gp-cintas" aria-hidden="true">
      <div className="gp-cinta gp-cinta--a"><div className="gp-cinta__pista"><Pista /></div></div>
      <div className="gp-cinta gp-cinta--b"><div className="gp-cinta__pista"><Pista /></div></div>
    </div>
  );
}
