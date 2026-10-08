import { useState } from "react";
import type { Orden } from "../modelos/Orden";

interface Props {
  ordenes: Orden[];
  onRegistrar: (simbolo: string, monto: number, tiempoMeses: number) => void;
  onAtender: () => void;
}

export default function PantallaOrdenes({ ordenes, onRegistrar, onAtender }: Props) {
  const [simbolo, setSimbolo] = useState("BTC");
  const [monto, setMonto] = useState(500);
  const [tiempoMeses, setTiempoMeses] = useState(3);

  const handleRegistrar = () => {
    onRegistrar(simbolo, monto, tiempoMeses);
  };

  return (
    <div className="pantalla">
      <h2>Órdenes pendientes (Cola FIFO)</h2>
      <p className="subtitulo">
        Total: {ordenes.length} | FRENTE → FINAL
      </p>

      <div className="formulario-inline">
        <select value={simbolo} onChange={(e) => setSimbolo(e.target.value)}>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
        </select>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(Number(e.target.value))}
          placeholder="Monto"
        />
        <input
          type="number"
          value={tiempoMeses}
          onChange={(e) => setTiempoMeses(Number(e.target.value))}
          placeholder="Meses"
        />
        <button onClick={handleRegistrar} className="boton-primario">
          Registrar orden
        </button>
        <button onClick={onAtender} className="boton-secundario">
          Atender siguiente
        </button>
      </div>

      {ordenes.length === 0 ? (
        <p>No hay órdenes pendientes.</p>
      ) : (
        <div className="cola">
          {ordenes.map((o, i) => (
            <div
              key={o.id}
              className={`nodo-cola ${i === 0 ? "nodo-frente" : ""} ${
                i === ordenes.length - 1 ? "nodo-final" : ""
              }`}
            >
              <div className="nodo-header">
                <span className="nodo-id">#{o.id}</span>
                {i === 0 && <span className="badge-frente">FRENTE</span>}
                {i === ordenes.length - 1 && ordenes.length > 1 && (
                  <span className="badge-final">FINAL</span>
                )}
              </div>
              <p><strong>{o.simbolo}</strong> — ${o.monto.toLocaleString()}</p>
              <p>{o.tiempoMeses} meses</p>
              <span className="estado">{o.estado}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}