import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gasto } from '../models/gasto';
import { RegistroMensual } from '../models/resgistro-mensual';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MensualService extends BaseService<RegistroMensual> {
  
  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollectionOrderBy2("mensual", "anio", "mes");
  }  

  getRegistrosByUser(uid:string){
    return super.getItemByFilter("uid", uid);
  }

  getObservableByUser(uid:string){
    return super.getObservableItemByFilter("mensual", "uid", uid);
  }

  setMes(){
    let mes: RegistroMensual = new RegistroMensual();
    mes.anio = 2020;
    mes.mes = 1;
    
    let gasto:Gasto = new Gasto();
    gasto.gasto = 22;
    gasto.categoria = 3;

    mes.gastos.push(Object.assign({}, gasto));
    mes.gastos.push(Object.assign({}, gasto));

    this.addItem(mes);
  }
}
