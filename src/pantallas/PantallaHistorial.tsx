import type { Analisis } from "../modelos/Analisis";

interface Props {
  historial: Analisis[];
}

export default function PantallaHistorial({ historial }: Props) {
  return (
    <div className="pantalla">
      <h2>Historial de análisis (Pila LIFO)</h2>
      <p className="subtitulo">
        El último análisis aparece arriba. Total: {historial.length}
      </p>

      {historial.length === 0 ? (
        <p>Sin análisis todavía.</p>
      ) : (
        <div className="pila">
          {historial.map((a, i) => (
            <div key={a.id} className={`nodo-pila ${i === 0 ? "nodo-tope" : ""}`}>
              <div className="nodo-header">
                <span className="nodo-id">#{a.id}</span>
                {i === 0 && <span className="badge-tope">TOPE</span>}
              </div>
              <p><strong>Monto:</strong> ${a.monto.toLocaleString()}</p>
              <p><strong>Tiempo:</strong> {a.tiempoMeses} meses</p>
              <p><strong>Crecimiento:</strong> {a.crecimientoEsperado}%</p>
              <p><strong>Durabilidad:</strong> {a.durabilidad}/100</p>
              <p className="razon">{a.recomendacion.slice(0, 120)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}