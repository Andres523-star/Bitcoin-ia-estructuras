export class NodoLista<T> {
  public valor: T;
  public siguiente: NodoLista<T> | null;

  constructor(valor: T) {
    this.valor = valor;
    this.siguiente = null;
  }
}