import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastType } from '../models/enums/toastType-enum';
import { Gasto } from '../models/gasto';
import { RegistroMensual } from '../models/resgistro-mensual';
import { AuthService } from '../services/auth.service';
import { MensualService } from '../services/mensual.service';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe]
})
export class Tab1Page implements OnInit {

  meses:string[];  
  customPickerOptions: any;  
  uid:string;  
  isUpdate:boolean;
  noEditarIngreso:boolean;
  noEditarUmbral:boolean;
  registroMeses:RegistroMensual[];
  Form:FormGroup;  
  FormGasto:FormGroup;
  gasto:Gasto;
  currentMonth:RegistroMensual;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private mensualService:MensualService,
    private toast:ToastService,
    private spinner:SpinnerService
    ) {
    this.gasto = new Gasto();
    this.currentMonth = new RegistroMensual();
    this.registroMeses = [];
    this.setMeses();
    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (value) => {
          //console.log(value);
          let registroAux = this.registroMeses.find((i)=>{
            return i.anio == value.year.value && i.mes == value.month.value;
          });

          if(registroAux){
            this.currentMonth = registroAux;
            this.isMonthUpdate(true);
          }
          else{
            this.isMonthUpdate(false);
            this.currentMonth.fechaCompleta = value;
          }
          return true;
        }
      }]
    }
  }

  ngOnInit(): void {
    this.spinner.show();  
    this.createForm();
    this.createFormGasto();
    this.uid = this.authService.GetCurrentUid(); 
    let now = new Date(); 

    this.mensualService.getObservableByUser(this.uid).subscribe((items) => {
      this.registroMeses = items;
      this.createFormGasto();  

      this.currentMonth = items.find((i) => {
        return i.anio == now.getFullYear() && i.mes == (now.getMonth()+1);
      });

      if(this.currentMonth){
        this.isMonthUpdate(true);
      }
      else{
        this.currentMonth = new RegistroMensual();
        this.isMonthUpdate(false);
      }
    
      this.spinner.hide();
    })
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      ingresoCtrl:['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    });
  }

  private createFormGasto() {
    this.FormGasto = this.formBuilder.group({
      gastoCtrl:['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      categoriaCtrl:['', [Validators.required]],
    });
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

  isMonthUpdate(isUpdate:boolean){
    if(isUpdate){
      this.isUpdate = true;
      this.noEditarIngreso = true;
      this.noEditarUmbral = true;
      this.Form.patchValue({
        ingresoCtrl: this.currentMonth.ingreso
      });
    }
    else{
      this.isUpdate = false;
      this.noEditarIngreso = false;
      this.noEditarUmbral = false;
      this.currentMonth = new RegistroMensual();
      this.createForm();
    }
    this.createFormGasto();
  }

  logout(){
    this.authService.Desloguearse();
  }

  saveClick(){  
    this.evalGasto();   
    
    if(this.isUpdate){
      this.updateMonth();
    }else{
      this.saveNewMonth();
    }
  }

  evalGasto(){
    if(this.gasto.gasto && this.gasto.categoria){
      this.currentMonth.gastos.push(Object.assign({}, this.gasto));
    }
  }

  saveNewMonth(){
    this.currentMonth.anio = this.currentMonth.fechaCompleta.year.value;
    this.currentMonth.mes = this.currentMonth.fechaCompleta.month.value;
    this.currentMonth.uid = this.uid;

    this.spinner.show(); 
    this.mensualService.addItem(this.currentMonth)
    .then(()=>{  
      this.toast.present("Se guardaron los datos correctamente", ToastType.Success);        
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{
      this.spinner.hide();
    });
  }

  updateMonth(){
    this.spinner.show(); 
    this.mensualService.setItemWithId(this.currentMonth, this.currentMonth.docId)
    .then(()=>{     
      this.toast.present("Se guardaron los datos correctamente", ToastType.Success);   
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{
      this.spinner.hide();
    });
  }

  editUmbral(){
    this.noEditarUmbral = false;
  }

  editIngreso(){
    this.noEditarIngreso = false;
  }

  disabledBtn():boolean{
    if(this.Form.invalid || !this.currentMonth.fechaCompleta){
      return true;
    }else if(!this.isUpdateEdit() && !this.hasGasto() && this.isUpdate){
      return true;
    }
    else{
      return false;
    }
  }

  hasGasto():boolean{
    if(this.gasto.gasto && this.gasto.categoria && this.FormGasto.valid){
      return true;
    }else{
      return false;
    }
  }

  isUpdateEdit():boolean{
    if(this.isUpdate && (!this.noEditarIngreso || !this.noEditarUmbral) && this.Form.valid){
      return true;
    }
    else{
      return false;
    }
  }
}
