import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Rol } from 'src/app/models/enums/rol-enum';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  data: any;
  cant10:number;
  cant50:number;
  cant100:number;
  creditoAcumulado:number;
  mjeError: string = "Exedió el número de veces que puede cargar este crédito";

  constructor(private authService:AuthService,
    private barcodeScanner: BarcodeScanner,
    public toastController: ToastController) {
    this.creditoAcumulado = 0;
    this.cant10 = 0;
    this.cant50 = 0;
    this.cant100 = 0;
  }

  ngOnInit() {

  }

  clickCargar(){
    this.scan();
  }

  clickLogout(){
    this.authService.Desloguearse();
  }

  clickLimpiar(){
    console.log(this.authService.GetCurrentUser().rol, Rol.Admin);


    this.creditoAcumulado = 0;
    this.cant10 = 0;
    this.cant50 = 0;
    this.cant100 = 0;
  }

  private scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {      
      this.calcularCredito(barcodeData.text);
    }).catch(err => {
      this.presentToast("Código incorrecto");
    });
  }

  private calcularCredito(barcodeData:string){
    let val:number = this.getValorDelCodigo(barcodeData);
    this.calcularSegunRol(val, this.authService.GetCurrentUser().rol)
  }

  private calcularSegunRol(val:number, rol:Rol){

    let limite:number;

    if(rol === Rol.Admin){
      limite = 2;
    }else{
      limite = 1;
    }
      

    switch(val){
      case 10:
        if(this.cant10 < limite){
          this.cant10++;
          this.creditoAcumulado += 10;
        }
        else{
          this.presentToast(this.mjeError);
        }
        break;
      case 50:
        if(this.cant50 < limite){
          this.cant50++;
          this.creditoAcumulado += 50;
        }
        else{
          this.presentToast(this.mjeError);
        }
        break;
      case 100:
        if(this.cant100 < limite){
          this.cant100++;
          this.creditoAcumulado += 100;
        }
        else{
          this.presentToast(this.mjeError);
        }
        break;
    }
  }

  private getValorDelCodigo(barcodeData:string):number{
    if(barcodeData == "8c95def646b6127282ed50454b73240300dccabc") 
      return 10;
    
    if(barcodeData == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ")
      return 50;
    
    if(barcodeData == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
      return 100;
    else{
      throw new Error('El Código QR no se encuentra cargado');
    }    
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      color: 'warning',
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
