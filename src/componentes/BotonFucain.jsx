import Icono from './Icono';

// Botón oficial de FUCAIN: forma de recorte de papel, mayúsculas y flecha.
// Todos los botones de la página usan este componente para verse iguales.
//   as      → elemento o componente que dibuja el botón ('a', Link, EnlaceSeccion…)
//   color   → 'amarillo' | 'turquesa' | 'rojo' | 'morado' | 'blanco' (sin color = azul marino)
//   inc     → inclinación suave propia, por ejemplo '-1.6deg' (mantiene lo asimétrico)
//   icono   → 'i-flecha' (por defecto), 'i-ext' para enlaces externos, o null para ninguno
export default function BotonFucain({
  as: Etiqueta = 'a',
  color,
  inc,
  icono = 'i-flecha',
  className = '',
  style,
  children,
  ...resto
}) {
  const clases = ['btn', color && `btn--${color}`, className].filter(Boolean).join(' ');
  const estilo = inc ? { '--inc': inc, ...style } : style;
  return (
    <Etiqueta className={clases} style={estilo} {...resto}>
      {children}
      {icono && <Icono id={icono} />}
    </Etiqueta>
  );
}
