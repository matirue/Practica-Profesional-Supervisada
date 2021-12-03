import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinner: any;

  constructor(private loadingController: LoadingController) { 
  }
  
  private async presentLoading() {
    this.spinner = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Cargando...'
    });
  }

  public async show(){
    await this.presentLoading();
    this.spinner.present();
  }
  
  public hide(){
    this.spinner.dismiss();
  }
}
