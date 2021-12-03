import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastType } from '../models/enums/toastType-enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  public async present(message:string, type:ToastType){
    const toast = await this.toastController.create({
      color: type,
      message: message,
      duration: 2500
    });
    toast.present();
  }

  public async Error(){
    const toast = await this.toastController.create({
      color: ToastType.Danger,
      message: "Ocurrió un error inesperado",
      duration: 2500
    });
    toast.present();
  }
}
