import { Gasto } from "./gasto";

export class RegistroMensual{
    anio:number;
    mes:number;
    fechaCompleta:any;
    ingreso:number;
    umbral:number;
    uid:string;
    docId:string;
    gastos:Gasto[];

    constructor(){
        this.gastos = [];
        this.umbral = 50;
    }
}