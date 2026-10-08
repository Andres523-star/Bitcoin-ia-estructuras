import { Lista } from "../estructuras/Lista";
import { Cola } from "../estructuras/Cola";
import { Pila } from "../estructuras/Pila";
import type { Cripto } from "../modelos/Cripto";
import type { Orden } from "../modelos/Orden";
import type { Analisis } from "../modelos/Analisis";
import type { ParametrosEntrada } from "../modelos/ParametrosEntrada";

export class Analizador {
  // Lista: catálogo de criptomonedas
  private catalogo: Lista<Cripto>;

  // Cola: órdenes de compra pendientes
  private ordenesPendientes: Cola<Orden>;

  // Pila: historial de análisis (el último se ve primero)
  private historialAnalisis: Pila<Analisis>;

  private contadorOrdenes: number = 1;
  private contadorAnalisis: number = 1;

  constructor() {
    this.catalogo = new Lista<Cripto>();
    this.ordenesPendientes = new Cola<Orden>();
    this.historialAnalisis = new Pila<Analisis>();
    this.cargarCatalogoInicial();
  }

  // Carga criptomonedas por defecto
  private cargarCatalogoInicial(): void {
    this.catalogo.agregar({
      simbolo: "BTC",
      nombre: "Bitcoin",
      precioActual: 65000,
      capitalizacion: 1_280_000_000_000,
      volatilidad: 70,
    });
    this.catalogo.agregar({
      simbolo: "ETH",
      nombre: "Ethereum",
      precioActual: 3200,
      capitalizacion: 385_000_000_000,
      volatilidad: 75,
    });
    this.catalogo.agregar({
      simbolo: "SOL",
      nombre: "Solana",
      precioActual: 145,
      capitalizacion: 67_000_000_000,
      volatilidad: 85,
    });
  }

  // === LISTA ===
  obtenerCatalogo(): Cripto[] {
    return this.catalogo.aArray();
  }

  // === COLA ===
  registrarOrden(simbolo: string, monto: number, tiempoMeses: number): Orden {
    const orden: Orden = {
      id: this.contadorOrdenes++,
      simbolo,
      monto,
      tiempoMeses,
      creadaEn: Date.now(),
      estado: "PENDIENTE",
    };
    this.ordenesPendientes.encolar(orden);
    return orden;
  }

  atenderSiguienteOrden(): Orden | null {
    const orden = this.ordenesPendientes.desencolar();
    if (orden) orden.estado = "PROCESANDO";
    return orden;
  }

  verOrdenesPendientes(): Orden[] {
    return this.ordenesPendientes.aArray();
  }

  // === PILA ===
  guardarAnalisis(analisis: Analisis): void {
    this.historialAnalisis.apilar(analisis);
  }

  obtenerHistorial(): Analisis[] {
    return this.historialAnalisis.aArray();
  }

  crearAnalisis(params: ParametrosEntrada, recomendacion: string): Analisis {
    const analisis: Analisis = {
      id: this.contadorAnalisis++,
      monto: params.monto,
      tiempoMeses: params.tiempoMeses,
      crecimientoEsperado: params.crecimientoEsperado,
      durabilidad: params.durabilidad,
      recomendacion,
      fecha: Date.now(),
    };
    this.guardarAnalisis(analisis);
    return analisis;
  }

  // === LÓGICA DE RECOMENDACIÓN (sin IA, por ahora) ===
  recomendarLocalmente(params: ParametrosEntrada): string {
    const { monto, tiempoMeses, crecimientoEsperado, durabilidad } = params;

    // Filtro según durabilidad: si es baja, buscar criptos poco volátiles
    const candidatas = this.catalogo
      .aArray()
      .filter((c) => c.volatilidad <= durabilidad);

    if (candidatas.length === 0) {
      return "No hay criptomonedas que se ajusten a tu tolerancia a la volatilidad. Considera aumentar la durabilidad o invertir en stablecoins (no disponibles en el catálogo).";
    }

    // Puntuar cada cripto
    let mejor = candidatas[0];
    let mejorPuntaje = -Infinity;

    for (const c of candidatas) {
      const puntaje =
        (c.capitalizacion / 1e12) * 30 +        // capitalización pesa 30
        (100 - Math.abs(c.volatilidad - durabilidad)) * 0.5 + // cercanía a durabilidad
        Math.min(crecimientoEsperado, 100) * 0.2; // crecimiento deseado
      if (puntaje > mejorPuntaje) {
        mejorPuntaje = puntaje;
        mejor = c;
      }
    }

    return `Recomendación: ${mejor.nombre} (${mejor.simbolo}). Precio actual: $${mejor.precioActual.toLocaleString()}. Volatilidad: ${mejor.volatilidad}/100 (tu tolerancia: ${durabilidad}). Con $${monto.toLocaleString()} a ${tiempoMeses} meses y ${crecimientoEsperado}% de crecimiento esperado, esta cripto tiene el mejor balance entre estabilidad y potencial.`;
  }
}
