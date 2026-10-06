import { Pila } from "./Pila";

const pila = new Pila<string>();
pila.apilar("Análisis 1: BTC sube");
pila.apilar("Análisis 2: BTC baja");
pila.apilar("Análisis 3: BTC se mantiene");

console.log("Pila (tope arriba):", pila.aArray());
console.log("Tope:", pila.verTope());
console.log("Tamaño:", pila.tamanio);

const ultimo = pila.desapilar();
console.log("Desapilado:", ultimo);
console.log("Pila después:", pila.aArray());
console.log("Nuevo tope:", pila.verTope());