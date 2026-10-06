export interface Orden {
  id: number;
  simbolo: string;      // "BTC"
  monto: number;        // cuánto quiere invertir
  tiempoMeses: number;  // cuánto tiempo mantener
  creadaEn: number;     // timestamp
  estado: "PENDIENTE" | "PROCESANDO" | "COMPLETADA" | "CANCELADA";
}