// Generador de números "al azar" repetible (siempre da lo mismo con la misma semilla),
// para que la decoración se vea igual en cada visita y no cambie al recargar.
export function crearAzar(semilla) {
  let a = semilla >>> 0;
  const siguiente = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const entre = (min, max) => min + siguiente() * (max - min);
  return { siguiente, entre };
}
