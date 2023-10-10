class Calculadora{
    constructor (private operador1: number, private operador2: number){
        
    }

    //metodos
    adicionar(): number{
        return this.operador1 + this.operador2;
    }

    subtrair(): number{
        return this.operador1 - this.operador2;
    }
}

let calculadora: Calculadora = new Calculadora(2,3);
console.log(calculadora.adicionar());
console.log(calculadora.subtrair());
