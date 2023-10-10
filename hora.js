"use strict";
class hora {
    constructor(hora, minuto, segundos) {
        this._hora = hora;
        this._minuto = minuto;
        this._segundos = segundos;
    }
    get hora() {
        return this._hora;
    }
    get minuto() {
        return this._minuto;
    }
    get segundo() {
        return this._segundos;
    }
    horaFormatada() {
        let hora_string = (this._hora + "").padStart(2, "0");
        let minuto_string = (this._minuto + "").padStart(2, "0");
        let segundo_string = (this._segundos + "").padStart(2, "0");
        return `${hora_string}:${minuto_string}:${segundo_string}`;
    }
}
let hora1 = new hora(0, 0, 0);
console.log(hora1.horaFormatada());
let hora2 = new hora(7, 30, 8);
console.log(hora2.horaFormatada());
