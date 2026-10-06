export interface Analisis {
  id: number;
  monto: number;
  tiempoMeses: number;
  crecimientoEsperado: number; // %
  durabilidad: number;         // 0-100 (tolerancia a volatilidad)
  recomendacion: string;       // texto generado por la IA
  fecha: number;               // timestamp
}