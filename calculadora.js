"use strict";
class Calculadora {
    constructor(operador1, operador2) {
        this.operador1 = operador1;
        this.operador2 = operador2;
    }
    //metodos
    adicionar() {
        return this.operador1 + this.operador2;
    }
    subtrair() {
        return this.operador1 - this.operador2;
    }
}
let calculadora = new Calculadora(2, 3);
console.log(calculadora.adicionar());
console.log(calculadora.subtrair());
