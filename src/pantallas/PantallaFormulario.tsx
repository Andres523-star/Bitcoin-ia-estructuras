import { useState } from "react";
import type { ParametrosEntrada } from "../modelos/ParametrosEntrada";

interface Props {
  onAnalizar: (params: ParametrosEntrada) => void;
}

export default function PantallaFormulario({ onAnalizar }: Props) {
  const [monto, setMonto] = useState<string>("1000");
  const [tiempoMeses, setTiempoMeses] = useState<string>("6");
  const [crecimientoEsperado, setCrecimientoEsperado] = useState<string>("20");
  const [durabilidad, setDurabilidad] = useState<number>(70);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const montoNum = parseFloat(monto);
    const tiempoNum = parseInt(tiempoMeses);
    const crecNum = parseFloat(crecimientoEsperado);

    if (isNaN(montoNum) || isNaN(tiempoNum) || isNaN(crecNum)) {
      alert("Por favor completa todos los campos con números válidos");
      return;
    }

    onAnalizar({
      monto: montoNum,
      tiempoMeses: tiempoNum,
      crecimientoEsperado: crecNum,
      durabilidad,
    });
  };

  return (
    <div className="pantalla">
      <h2>Nuevo análisis de inversión</h2>
      <p className="subtitulo">
        Ingresa tus parámetros para recibir una recomendación
      </p>

      <form onSubmit={handleSubmit} className="formulario">
        <label>
          Monto a invertir (USD)
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ej: 1000"
            min={1}
            step="0.01"
          />
        </label>

        <label>
          Tiempo de inversión (meses)
          <input
            type="number"
            value={tiempoMeses}
            onChange={(e) => setTiempoMeses(e.target.value)}
            placeholder="Ej: 6"
            min={1}
          />
        </label>

        <label>
          Crecimiento esperado (%)
          <input
            type="number"
            value={crecimientoEsperado}
            onChange={(e) => setCrecimientoEsperado(e.target.value)}
            placeholder="Ej: 20"
            min={0}
            step="0.1"
          />
        </label>

        <label>
          Tolerancia a volatilidad (0 = bajo, 100 = alto)
          <input
            type="range"
            value={durabilidad}
            onChange={(e) => setDurabilidad(Number(e.target.value))}
            min={0}
            max={100}
          />
          <span className="valor-slider">{durabilidad}/100</span>
        </label>

        <button type="submit" className="boton-primario">
          Analizar con IA
        </button>
      </form>
    </div>
  );
}