// Dibuja un ícono del sprite (ver Iconos.jsx). Acepta viewBox, style, className, etc.
export default function Icono({ id, ...props }) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`#${id}`} />
    </svg>
  );
}
