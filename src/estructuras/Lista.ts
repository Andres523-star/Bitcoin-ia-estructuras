import { NodoLista } from "./NodoLista";

export class Lista<T> {
  private cabeza: NodoLista<T> | null;
  private longitud: number;

  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }

  // Agrega al final (append)
  agregar(valor: T): void {
    const nuevo = new NodoLista(valor);
    if (this.cabeza === null) {
      this.cabeza = nuevo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente !== null) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevo;
    }
    this.longitud++;
  }

  // Agrega al inicio (prepend)
  agregarInicio(valor: T): void {
    const nuevo = new NodoLista(valor);
    nuevo.siguiente = this.cabeza;
    this.cabeza = nuevo;
    this.longitud++;
  }

  // Obtiene el valor en una posición
  obtener(indice: number): T | null {
    if (indice < 0 || indice >= this.longitud) return null;
    let actual = this.cabeza;
    let i = 0;
    while (actual !== null && i < indice) {
      actual = actual.siguiente;
      i++;
    }
    return actual ? actual.valor : null;
  }

  // Elimina en una posición
  eliminar(indice: number): T | null {
    if (indice < 0 || indice >= this.longitud) return null;

    if (indice === 0 && this.cabeza) {
      const valor = this.cabeza.valor;
      this.cabeza = this.cabeza.siguiente;
      this.longitud--;
      return valor;
    }

    let anterior = this.cabeza;
    let i = 0;
    while (anterior !== null && i < indice - 1) {
      anterior = anterior.siguiente;
      i++;
    }

    if (anterior === null || anterior.siguiente === null) return null;

    const valor = anterior.siguiente.valor;
    anterior.siguiente = anterior.siguiente.siguiente;
    this.longitud--;
    return valor;
  }

  // Busca un elemento y devuelve el índice (-1 si no existe)
  buscar(predicado: (valor: T) => boolean): number {
    let actual = this.cabeza;
    let i = 0;
    while (actual !== null) {
      if (predicado(actual.valor)) return i;
      actual = actual.siguiente;
      i++;
    }
    return -1;
  }

  // Recorre la lista y devuelve un array (para mostrarla en UI)
  aArray(): T[] {
    const resultado: T[] = [];
    let actual = this.cabeza;
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