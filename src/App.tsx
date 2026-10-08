import { useEffect, useState } from "react";
import "./App.css";
import { Analizador } from "./logica/Analizador";
import type { ParametrosEntrada } from "./modelos/ParametrosEntrada";
import type { Analisis } from "./modelos/Analisis";
import type { Orden } from "./modelos/Orden";
import PantallaFormulario from "./pantallas/PantallaFormulario";
import PantallaResultado from "./pantallas/PantallaResultado";
import PantallaHistorial from "./pantallas/PantallaHistorial";
import PantallaOrdenes from "./pantallas/PantallaOrdenes";
import {
  cargarAnalisis,
  guardarAnalisis,
  cargarOrdenes,
  guardarOrden,
  marcarOrdenCompletada,
} from "./logica/bd";

type Pestania = "formulario" | "resultado" | "historial" | "ordenes";

function App() {
  const [analizador] = useState(() => new Analizador());
  const [pestania, setPestania] = useState<Pestania>("formulario");
  const [analisisActual, setAnalisisActual] = useState<Analisis | null>(null);
  const [historial, setHistorial] = useState<Analisis[]>([]);
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar datos de la BD al iniciar
  useEffect(() => {
    (async () => {
      const analisisBD = await cargarAnalisis();
      setHistorial(analisisBD);
      const ordenesBD = await cargarOrdenes();
      setOrdenes(ordenesBD);
    })();
  }, []);

  const handleAnalizar = async (params: ParametrosEntrada) => {
    setCargando(true);
    setPestania("resultado");
    setMensaje("");

    const recomendacion = analizador.recomendarLocalmente(params);
    const nuevoAnalisis = {
      monto: params.monto,
      tiempoMeses: params.tiempoMeses,
      crecimientoEsperado: params.crecimientoEsperado,
      durabilidad: params.durabilidad,
      recomendacion,
      fecha: Date.now(),
    };

    // Guardar en la BD
    const guardado = await guardarAnalisis(nuevoAnalisis);

    if (guardado) {
      setAnalisisActual(guardado);
      setHistorial([guardado, ...historial]);
      setMensaje("✅ Análisis guardado en la base de datos");
    } else {
      setAnalisisActual({ id: 0, ...nuevoAnalisis });
      setMensaje("⚠️ No se pudo guardar en la BD, solo en memoria");
    }

    setCargando(false);
  };

  const handleRegistrarOrden = async (
    simbolo: string,
    monto: number,
    tiempoMeses: number
  ) => {
    const nuevaOrden = {
      simbolo,
      monto,
      tiempoMeses,
      estado: "PENDIENTE" as const,
      creadaEn: Date.now(),
    };

    const guardada = await guardarOrden(nuevaOrden);
    if (guardada) {
      setOrdenes([...ordenes, guardada]);
    }
  };

  const handleAtenderOrden = async () => {
    if (ordenes.length === 0) return;
    const primera = ordenes[0];
    const ok = await marcarOrdenCompletada(primera.id);
    if (ok) {
      setOrdenes(ordenes.slice(1));
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin IA</h1>
        <p className="subtitulo-header">
          Estructuras: Lista · Cola · Pila | BD: Supabase
        </p>
      </header>

      {mensaje && <div className="mensaje-bd">{mensaje}</div>}

      <nav className="tabs">
        <button
          className={pestania === "formulario" ? "tab activa" : "tab"}
          onClick={() => setPestania("formulario")}
        >
          Formulario
        </button>
        <button
          className={pestania === "resultado" ? "tab activa" : "tab"}
          onClick={() => setPestania("resultado")}
        >
          Resultado
        </button>
        <button
          className={pestania === "historial" ? "tab activa" : "tab"}
          onClick={() => setPestania("historial")}
        >
          Historial (Pila) · {historial.length}
        </button>
        <button
          className={pestania === "ordenes" ? "tab activa" : "tab"}
          onClick={() => setPestania("ordenes")}
        >
          Órdenes (Cola) · {ordenes.length}
        </button>
      </nav>

      <main className="contenido">
        {pestania === "formulario" && (
          <PantallaFormulario onAnalizar={handleAnalizar} />
        )}
        {pestania === "resultado" && (
          <PantallaResultado analisis={analisisActual} cargando={cargando} />
        )}
        {pestania === "historial" && <PantallaHistorial historial={historial} />}
        {pestania === "ordenes" && (
          <PantallaOrdenes
            ordenes={ordenes}
            onRegistrar={handleRegistrarOrden}
            onAtender={handleAtenderOrden}
          />
        )}
      </main>
    </div>
  );
}

export default App;