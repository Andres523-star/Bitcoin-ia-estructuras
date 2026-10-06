import { Cola } from "./Cola";

const cola = new Cola<string>();
cola.encolar("Orden 1: Comprar BTC");
cola.encolar("Orden 2: Comprar ETH");
cola.encolar("Orden 3: Comprar SOL");

console.log("Cola:", cola.aArray());
console.log("Frente:", cola.verFrente());
console.log("Final:", cola.verFinal());
console.log("Tamaño:", cola.tamanio);

const atendida = cola.desencolar();
console.log("Atendida:", atendida);
console.log("Cola después:", cola.aArray());
console.log("Nuevo frente:", cola.verFrente());