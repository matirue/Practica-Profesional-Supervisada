import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../models/enums/categorias';
import { ToastType } from '../models/enums/toastType-enum';
import { Gasto } from '../models/gasto';
import { RegistroMensual } from '../models/resgistro-mensual';
import { AuthService } from '../services/auth.service';
import { GastoService } from '../services/gasto.service';
import { MensualService } from '../services/mensual.service';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  meses:string[];
  customPickerOptions: any;
  uid:string;  
  registroMes:RegistroMensual;
  resto:number;
  Form:FormGroup;  
  gasto:Gasto;
  chipsDisabled:boolean[];
  selectedChip:number;
  showMeses:boolean;
  registroMeses:RegistroMensual[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private mensualService:MensualService,
    private toast:ToastService,
    private spinner:SpinnerService,
    private gastoService:GastoService
  ) {    
    this.gasto = new Gasto();
    this.registroMes = new RegistroMensual();
    this.initChip();
    this.showMeses = true;
    this.setMeses();
    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (value) => {
          console.log(value);
          let registroAux = this.registroMeses.find((i)=>{
            return i.anio == value.year.value && i.mes == value.month.value;
          });

          if(registroAux){
            this.registroMes = registroAux;
            return true;
          }
          else{
            this.toast.present("El mes seleccionado no se encuentra configurado", ToastType.Warning);
            return false;
          }
          
        }
      }]
    }
  }

  ngOnInit(): void {
    this.spinner.show();    
    this.uid = this.authService.GetCurrentUid();  
    let now = new Date();

    this.mensualService.getObservableByUser(this.uid).subscribe((items) => {
      this.registroMeses = items;
      this.registroMes = items.find((i) => {
        return i.anio == now.getFullYear() && i.mes == now.getMonth();
      });

      if(!this.registroMes){
        if(items.length > 0){        
          this.registroMes = items[0];
        }else{
          this.showMeses = false;
          this.toast.present("No hay meses configurados", ToastType.Warning);
        }
      }
    
      this.spinner.hide();
    })

    this.createForm();    
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      gastoCtrl:['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    });
  }

  save(){    
    // this.gasto.idMes = this.registroMes.docId;
    // this.gasto.uid = this.uid;
    this.spinner.show();   
    
    this.gastoService.addItem(this.gasto)
    .then(()=>{  
      this.toast.present("Se guardaron los datos correctamente", ToastType.Success);        
      this.gasto = new Gasto();
      this.createForm();
      this.initChip();
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{
      this.spinner.hide();
    });    
  }

  selectChip(i:number){   
    if(this.selectedChip && this.selectedChip == i){
      this.gasto.categoria = null;
      this.selectedChip = null;
    }
    else{
      this.selectedChip = i;
      switch(i){
        case 0:
          this.gasto.categoria = Categoria.Impuestos;
          break;
        case 1:
          this.gasto.categoria = Categoria.Ropa;
          break;
        case 2:
          this.gasto.categoria = Categoria.Restaurantes;
          break;
        case 3:
          this.gasto.categoria = Categoria.Entretenimiento;
          break;
        case 4:
          this.gasto.categoria = Categoria.Alimento;
          break;
        case 5:
          this.gasto.categoria = Categoria.Medicina;
          break;
      } 
    }

    this.chipsDisabled.forEach((value, index)=>{      
      if(index != i){
        this.chipsDisabled[index] = !value;
      }      
    })

   
  }

  initChip(){
    this.selectedChip = null;
    this.chipsDisabled = [
      false,
      false,
      false,
      false,
      false,
      false
    ]
  }

  private setMeses(){
    this.meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]; 
  }

  logout(){
    this.authService.Desloguearse();
  }
}
