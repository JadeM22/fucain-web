// Devuelve la ruta de un archivo de la carpeta public/ (funciona en cualquier carpeta del servidor)
export const ruta = (p) => `${import.meta.env.BASE_URL}${p}`;

// ¿El usuario pidió menos movimiento?
export const reducirMovimiento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const COLORES = ['#FBC200', '#12AC9C', '#E84E2B', '#853287', '#66B32F', '#7DC8E0', '#F5A12F'];
