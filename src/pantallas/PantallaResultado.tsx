import type { Analisis } from "../modelos/Analisis";

interface Props {
  analisis: Analisis | null;
  cargando: boolean;
}

export default function PantallaResultado({ analisis, cargando }: Props) {
  if (cargando) {
    return (
      <div className="pantalla">
        <h2>Analizando...</h2>
        <p>La IA está procesando tu solicitud.</p>
      </div>
    );
  }

  if (!analisis) {
    return (
      <div className="pantalla">
        <h2>Sin resultados aún</h2>
        <p className="subtitulo">Ve a la pestaña "Formulario" y genera un análisis.</p>
      </div>
    );
  }

  return (
    <div className="pantalla">
      <h2>Resultado del análisis</h2>

      <div className="tarjeta">
        <h3>Parámetros ingresados</h3>
        <ul className="lista-datos">
          <li>Monto: <strong>${analisis.monto.toLocaleString()}</strong></li>
          <li>Tiempo: <strong>{analisis.tiempoMeses} meses</strong></li>
          <li>Crecimiento esperado: <strong>{analisis.crecimientoEsperado}%</strong></li>
          <li>Durabilidad: <strong>{analisis.durabilidad}/100</strong></li>
        </ul>
      </div>

      <div className="tarjeta tarjeta-destacada">
        <h3>Recomendación</h3>
        <p>{analisis.recomendacion}</p>
      </div>
    </div>
  );
}