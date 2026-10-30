import BotonFucain from '../BotonFucain';

// Modal de progreso de la descarga en ZIP: título, barra, "x / total fotos · %" y Cancelar
export default function ModalProgreso({ progreso, onCancelar }) {
  if (!progreso) return null;
  const { titulo, hechas, total, porcentaje } = progreso;
  return (
    <div className="gp-modal" role="dialog" aria-modal="true" aria-labelledby="gp-modal-tit">
      <div className="gp-modal__caja">
        <h2 id="gp-modal-tit" className="gp-modal__tit">{titulo}</h2>
        <div className="gp-modal__barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={porcentaje}>
          <span style={{ width: `${porcentaje}%` }} />
        </div>
        <p className="gp-modal__txt" aria-live="polite">{hechas} / {total} fotos · {porcentaje}%</p>
        <BotonFucain as="button" type="button" icono={null} color="rojo" className="btn--chico" autoFocus onClick={onCancelar}>Cancelar</BotonFucain>
      </div>
    </div>
  );
}
