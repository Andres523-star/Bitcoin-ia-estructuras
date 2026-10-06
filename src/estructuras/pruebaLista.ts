import { Lista } from "./Lista";

const lista = new Lista<string>();
lista.agregar("Bitcoin");
lista.agregar("Ethereum");
lista.agregar("Solana");
lista.agregarInicio("USDT");

console.log("Lista:", lista.aArray());
console.log("Tamaño:", lista.tamanio);
console.log("Posición de Ethereum:", lista.buscar((c) => c === "Ethereum"));
lista.eliminar(0);
console.log("Después de eliminar 0:", lista.aArray());
