import Grafico from './Grafico';

// Decoración que "cae" justo en el borde entre dos secciones.
// ancho: tamaño del gráfico · k: proporción alto/ancho del PNG (para centrarlo sobre el borde)
// lado: 'izq' o 'der' · x: distancia al borde de la pantalla
export default function SeparadorConfeti({ nombre, ancho, k, lado = 'izq', x = '4%', tiempo = '9s' }) {
  return (
    <div className="separador" aria-hidden="true">
      <Grafico
        nombre={nombre}
        estilo={{ '--w': ancho, '--k': k, '--t': tiempo, [lado === 'izq' ? 'left' : 'right']: x }}
      />
    </div>
  );
}
