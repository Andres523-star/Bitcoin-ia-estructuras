import { NodoCola } from "./NodoCola";

export class Cola<T> {
  private frente: NodoCola<T> | null;
  private final: NodoCola<T> | null;
  private longitud: number;

  constructor() {
    this.frente = null;
    this.final = null;
    this.longitud = 0;
  }

  // Enqueue: agrega al final
  encolar(valor: T): void {
    const nuevo = new NodoCola(valor);
    if (this.final === null) {
      this.frente = nuevo;
      this.final = nuevo;
    } else {
      this.final.siguiente = nuevo;
      this.final = nuevo;
    }
    this.longitud++;
  }

  // Dequeue: saca del frente (O(1), no recorre nada)
  desencolar(): T | null {
    if (this.frente === null) return null;
    const valor = this.frente.valor;
    this.frente = this.frente.siguiente;
    if (this.frente === null) this.final = null;
    this.longitud--;
    return valor;
  }

  // Ver el frente sin sacarlo
  verFrente(): T | null {
    return this.frente ? this.frente.valor : null;
  }

  // Ver el final sin sacarlo
  verFinal(): T | null {
    return this.final ? this.final.valor : null;
  }

  // Para mostrar en UI
  aArray(): T[] {
    const resultado: T[] = [];
    let actual = this.frente;
    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }

  get tamanio(): number {
    return this.longitud;
  }

  estaVacia(): boolean {
    return this.longitud === 0;
  }
}