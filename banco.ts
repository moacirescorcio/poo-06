class Conta {
    private _numero: String;
    private _saldo: number;
    constructor(numero: String, _saldo:number) {
        this._numero = numero;
        this._saldo = _saldo;
    }
    sacar(valor: number): void {
        this._saldo = this._saldo - valor;
    }
    depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }
    consultar_Saldo(): number {
        return this._saldo;
    }
    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    get numero(): String{
        return this._numero;
    }

    get saldo(): number{
        return this._saldo
    }
}

class Banco{
    private contas: Conta[] = [];
    public inserir(c: Conta): void{
        let indice = this.consultarIndice(c.numero);
        if(indice == -1){
            this.contas.push(c);
        }else{
            console.log('Conta já existente!');
            
        }
    }

    public consultar(numero: String): Conta{
        //a exclamção diz para o typescript que a variável não vai ser nula
        let contaProcurada!: Conta;
        for(let c of this.contas){
            if(c.numero == numero){
                contaProcurada = c;
                break
            }
        }
        return contaProcurada;
    }

    private consultarIndice(numero: String): number{
        let indice: number = -1;
        for(let i: number = 0; i<this.contas.length; i++){
            if(this.contas[i].numero == numero){
                indice = i;
                break;
            }
        }
        return indice;
    }

    public alterar(c: Conta): void{
        let indice = this.consultarIndice(c.numero);
        if(indice != -1){
            this.contas[indice] = c;
        }
    }

    public excluir(numero: String): void{
        let indice: number = this.consultarIndice(numero);
        if(indice != -1){
            for(let i: number = indice; i<this.contas.length; i++){
                this.contas[i] = this.contas[i+1]
            }
            this.contas.pop();
        }
    }

    public depositar(numero: String, valor: number){
        let conta: Conta = this.consultar(numero);

        if(conta != null){
            conta.depositar(valor);
        }
    }

    public sacar(numero: String, valor: number){
        let indice: number = this.consultarIndice(numero);
        if(indice != -1){
            this.contas[indice].sacar(valor);
        }

    }

    public transferir(numeroCredito: String, numeroDebito: string, valor: number){
        let indice1: number = this.consultarIndice(numeroCredito);
        let indice2: number = this.consultarIndice(numeroDebito);
        if(indice1 != -1 && indice2 != -1){
            this.contas[indice1].transferir(this.contas[indice2], valor);
        }
    }

    public quantidadeDeContas(): number{
        return this.contas.length;
    }

    
    //com reduce
    //this.contas.reduce(let totalDepositador: number, conta.obter_Saldo())=> {
    //}
    /*this.contas.forEach(conta => totalDepositado += conta._saldo) */
    public totalDeDinheiro(): number{
        let somatorio: number = 0
        for(let i = 0; i < this.contas.length; i++){
            somatorio += this.contas[i].saldo;
        }

        return somatorio;
    }

    public mediaDeDinheiro(): number{
        let numeroDeContas: number = this.quantidadeDeContas();
        let totalDeDinheiro: number = this.totalDeDinheiro();
        let media = totalDeDinheiro / numeroDeContas;
        return media;
    }
}

let b: Banco = new Banco();
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