export class NodoPila<T> {
  public valor: T;
  public siguiente: NodoPila<T> | null;

  constructor(valor: T) {
    this.valor = valor;
    this.siguiente = null;
  }
}
