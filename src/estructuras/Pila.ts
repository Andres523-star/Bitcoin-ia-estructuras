import { NodoPila } from "./NodoPila";

export class Pila<T> {
  private tope: NodoPila<T> | null;
  private longitud: number;

  constructor() {
    this.tope = null;
    this.longitud = 0;
  }

  // Push: apila arriba
  apilar(valor: T): void {
    const nuevo = new NodoPila(valor);
    nuevo.siguiente = this.tope;
    this.tope = nuevo;
    this.longitud++;
  }

  // Pop: saca el de arriba (O(1))
  desapilar(): T | null {
    if (this.tope === null) return null;
    const valor = this.tope.valor;
    this.tope = this.tope.siguiente;
    this.longitud--;
    return valor;
  }

  // Ver el tope sin sacarlo
  verTope(): T | null {
    return this.tope ? this.tope.valor : null;
  }

  // Para mostrar en UI (del tope hacia abajo)
  aArray(): T[] {
    const resultado: T[] = [];
    let actual = this.tope;
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