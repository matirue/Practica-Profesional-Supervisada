import { Component, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { Gasto } from '../models/gasto';
import { RegistroMensual } from '../models/resgistro-mensual';
import { AuthService } from '../services/auth.service';
import { GastoService } from '../services/gasto.service';
import { MensualService } from '../services/mensual.service';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export default class Tab3Page implements OnInit{

  gastos:Gasto[];
  meses:RegistroMensual[];
  uid:string;
  contadorCategorias: number[];
  gastoAnual:number;
  ingresoAnual:number;

  // gráfico gastos
  typeGastos:string;
  dataGastos:any;
  optionsGastos:any;

  // gráfico anualizado
  typeAnual:string;
  dataAnual:any;
  optionsAnual:any;

  constructor(
    private spinner:SpinnerService,
    private authService:AuthService,
    private mensualService:MensualService,
  ) {
    this.gastos = [];
    this.meses = [];
    this.initCount();
    this.initIngreso();
  }
  
  ngOnInit(): void {
    this.spinner.show();

    this.uid = this.authService.GetCurrentUid();

    this.mensualService.getObservableByUser(this.uid).subscribe((items)=>{
      console.log(items);
      this.initIngreso();
      this.initCount();
      this.meses = items;

      items.forEach((doc) => {                               
        this.ingresoAnual += doc.ingreso;  
        doc.gastos.forEach((gas) => {                               
          this.gastoAnual += gas.gasto;
          this.contadorCategorias[gas.categoria - 1] += gas.gasto;          
        });     
      });    
         
      this.initAnual();
      this.initGastos();
      this.spinner.hide();
    });
  }

  private initCount(){
    this.contadorCategorias = [0,0,0,0,0,0];
    this.gastoAnual = 0;   
  }

  private initIngreso(){
    this.ingresoAnual = 0;
  }

  private initAnual(){
    this.typeAnual = 'bar';
    this.optionsAnual= {
      responsive: true,
      maintainAspectRatio: false,
    };    
    this.dataAnual = {
      labels: [
        'Gastos',
        'Ingresos'
      ],
      datasets: [{
        label: 'Gastos vs Ingresos Anualizados',
        data: [
          this.gastoAnual,
          this.ingresoAnual
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)'          
        ],
        borderWidth: 1,
        minBarLength: 5
      }]
    };   
  }

  private initGastos(){
    this.typeGastos = 'pie';
    this.optionsGastos= {
      responsive: true,
      radius:250
    };    
    this.dataGastos = {
      labels: [
        'Ropa',
        'Restaurantes',
        'Entretenimiento',
        'Alimento',
        'Medicina',
        'Impuestos'
      ],
      datasets: [{
        label: 'Gastos por Categoría',
        data: [
          this.contadorCategorias[0],
          this.contadorCategorias[1],
          this.contadorCategorias[2],
          this.contadorCategorias[3],
          this.contadorCategorias[4],
          this.contadorCategorias[5]
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'     
        ],
        weight: 4
      }]
    };   
    
  }

  logout(){
    this.authService.Desloguearse();
  }
}
