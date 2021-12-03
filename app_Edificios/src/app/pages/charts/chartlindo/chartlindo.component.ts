import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ThemeOption } from 'ngx-echarts';
import { Theme } from 'src/app/classes/theme'
import { AuthService } from 'src/app/services/auth.service';

var arrayDatos;

var likes: number[] = [];
var url: string[] = [];
var label: string[] = [];

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@Component({
  selector: 'app-chartlindo',
  templateUrl: './chartlindo.component.html',
  styleUrls: ['./chartlindo.component.scss'],
})
export class ChartlindoComponent implements OnInit {

  options:any;
  fotos: any;
  datos: any;
  image: string = '';
  theme1 = Theme;
  theme: string | ThemeOption;
  myChart: any;
  ctx: any;
  ctx1: any;
  contador = 0;

  constructor(private photo: PhotoService, public auth: AuthService) {
    likes = [];
    url = [];
    arrayDatos = JSON.parse(localStorage.getItem('array'));
    this.datos = [];
    this.fotos = this.photo.items;
  }

  ionViewDidEnter(){
    this.cargarDatos();
    this.ctx = document.getElementById('myChart') as any;
    this.ctx1 = this.ctx.getContext('2d');
    this.chart();
  }

  cargarDatos(){
    for(let item of arrayDatos)
    {
      if(item.tipo === 'Linda')
      {
        likes.push(item.likes);
        url.push(item.url);
      }
    }
  }


  ionViewWillEnter(){
    arrayDatos = JSON.parse(localStorage.getItem('array'));
    for(let item of arrayDatos)
    {
      if(item.tipo === 'Linda')
      {
        this.contador++;
      }
    }
    label = Array(this.contador).fill('');
    console.log('datos: ', arrayDatos, 'this.contador: ', this.contador);
  }

  ionViewDidLeave(){
    label = null;
    url = null;
    arrayDatos = null;
    likes = null;
    this.contador = 0;
  }

  ngOnInit() {}


  chart(){
    this.myChart = new Chart(this.ctx1, {
      type: 'pie',
      data: {
        datasets: [{
          data: likes,
          label: 'Cantidad de votos',
          backgroundColor: [
            "rgb(7,59,76)",
            "rgb(239,71,111)",
            "rgb(17,138,178)",
            "rgb(6,214,160)",
            "rgb(255,209,102)"
          ],
          borderColor: [
            "rgb(7,59,76)",
            "rgb(239,71,111)",
            "rgb(17,138,178)",
            "rgb(6,214,160)",
            "rgb(255,209,102)"
          ],
            borderWidth: 1
          }]
      },
      options: {
        onClick: this.graphClickEvent,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  })};

  graphClickEvent(event, array){
    console.log(array[0].index);
    console.log(arrayDatos[array[0].index]);
    let imagen = document.getElementById('imagen') as HTMLImageElement
    let card = document.getElementById('card') as HTMLElement;
    card.style.display = 'block';
    imagen.src = url[array[0].index];
  }

}
