import BotonFucain from '../BotonFucain';

// Barra flotante inferior del modo selección
export default function BarraSeleccion({ cantidad, onElegirVisibles, onDescargar, onSalir }) {
  return (
    <div className="gp-sel" role="region" aria-label="Fotos seleccionadas">
      <p className="gp-sel__n">{cantidad} {cantidad === 1 ? 'seleccionada' : 'seleccionadas'}</p>
      <div className="gp-sel__acc">
        <BotonFucain as="button" type="button" icono={null} className="btn--chico" color="blanco" onClick={onElegirVisibles}>Elegir visibles</BotonFucain>
        <BotonFucain as="button" type="button" icono="i-descargar" className="btn--chico" color="principal" onClick={onDescargar}>Descargar</BotonFucain>
        <button type="button" className="gp-sel__x" aria-label="Salir del modo selección" onClick={onSalir}>✕</button>
      </div>
    </div>
  );
}
