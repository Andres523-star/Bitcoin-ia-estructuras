export class NodoCola<T> {
  public valor: T;
  public siguiente: NodoCola<T> | null;

  constructor(valor: T) {
    this.valor = valor;
    this.siguiente = null;
  }
}
