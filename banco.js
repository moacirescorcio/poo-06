"use strict";
class Conta {
    constructor(numero, _saldo) {
        this._numero = numero;
        this._saldo = _saldo;
    }
    sacar(valor) {
        this._saldo = this._saldo - valor;
    }
    depositar(valor) {
        this._saldo = this._saldo + valor;
    }
    consultar_Saldo() {
        return this._saldo;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    get numero() {
        return this._numero;
    }
    get saldo() {
        return this._saldo;
    }
}
class Banco {
    constructor() {
        this.contas = [];
    }
    inserir(c) {
        let indice = this.consultarIndice(c.numero);
        if (indice == -1) {
            this.contas.push(c);
        }
        else {
            console.log('Conta já existente!');
        }
    }
    consultar(numero) {
        //a exclamção diz para o typescript que a variável não vai ser nula
        let contaProcurada;
        for (let c of this.contas) {
            if (c.numero == numero) {
                contaProcurada = c;
                break;
            }
        }
        return contaProcurada;
    }
    consultarIndice(numero) {
        let indice = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
        }
        return indice;
    }
    alterar(c) {
        let indice = this.consultarIndice(c.numero);
        if (indice != -1) {
            this.contas[indice] = c;
        }
    }
    excluir(numero) {
        let indice = this.consultarIndice(numero);
        if (indice != -1) {
            for (let i = indice; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    depositar(numero, valor) {
        let conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }
    }
    sacar(numero, valor) {
        let indice = this.consultarIndice(numero);
        if (indice != -1) {
            this.contas[indice].sacar(valor);
        }
    }
    transferir(numeroCredito, numeroDebito, valor) {
        let indice1 = this.consultarIndice(numeroCredito);
        let indice2 = this.consultarIndice(numeroDebito);
        if (indice1 != -1 && indice2 != -1) {
            this.contas[indice1].transferir(this.contas[indice2], valor);
        }
    }
    quantidadeDeContas() {
        return this.contas.length;
    }
    //com reduce
    //this.contas.reduce(let totalDepositador: number, conta.obter_Saldo())=> {
    //}
    /*this.contas.forEach(conta => totalDepositado += conta._saldo) */
    totalDeDinheiro() {
        let somatorio = 0;
        for (let i = 0; i < this.contas.length; i++) {
            somatorio += this.contas[i].saldo;
        }
        return somatorio;
    }
    mediaDeDinheiro() {
        let numeroDeContas = this.quantidadeDeContas();
        let totalDeDinheiro = this.totalDeDinheiro();
        let media = totalDeDinheiro / numeroDeContas;
        return media;
    }
}
let b = new Banco();
b.inserir(new Conta("111-2", 100));
console.log(b.consultar("111-2"));
console.log(b.consultar("22222-2"));
//repetindo o mesmo numero de conta
b.inserir(new Conta("111-2", 100));
//operacao de sacar
b.sacar("111-2", 50);
console.log(b.consultar('111-2'));
//operacao de transferir
b.inserir(new Conta("222", 100));
b.transferir("111-1", "222", 50);
console.log(b.consultar("111-2"));
console.log(b.consultar("222"));
//quantidade contas
console.log(b.quantidadeDeContas());
//somatorio contas
console.log(b.totalDeDinheiro());
//media
console.log(b.mediaDeDinheiro());
