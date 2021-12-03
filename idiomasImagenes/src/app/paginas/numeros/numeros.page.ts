import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  spinner: boolean = false;

  numeros = [
    {
      nombre: "0",
      imagen: "../../../assets/img/numeros/0.png",
      sonidoE: "../../../assets/sonidos/numeros/0e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/0i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/0p.m4a",
    },
    {
      nombre: "1",
      imagen: "../../../assets/img/numeros/1.png",
      sonidoE: "../../../assets/sonidos/numeros/1e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/1i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/1p.m4a",
    },
    {
      nombre: "2",
      imagen: "../../../assets/img/numeros/2.png",
      sonidoE: "../../../assets/sonidos/numeros/2e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/2i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/2p.m4a",
    },   
    {
      nombre: "3",
      imagen: "../../../assets/img/numeros/3.png",
      sonidoE: "../../../assets/sonidos/numeros/3e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/3i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/3p.m4a",
    },   
    {
      nombre: "4",
      imagen: "../../../assets/img/numeros/4.png",
      sonidoE: "../../../assets/sonidos/numeros/4e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/4i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/4p.m4a",
    },  
    {
      nombre: "5",
      imagen: "../../../assets/img/numeros/5.png",
      sonidoE: "../../../assets/sonidos/numeros/5e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/5i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/5p.m4a",
    },
    {
      nombre: "6",
      imagen: "../../../assets/img/numeros/6.png",
      sonidoE: "../../../assets/sonidos/numeros/6e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/6i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/6p.m4a",
    },
    {
      nombre: "7",
      imagen: "../../../assets/img/numeros/7.png",
      sonidoE: "../../../assets/sonidos/numeros/7e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/7i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/7p.m4a",
    },   
    {
      nombre: "8",
      imagen: "../../../assets/img/numeros/8.png",
      sonidoE: "../../../assets/sonidos/numeros/8e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/8i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/8p.m4a",
    },   
    {
      nombre: "9",
      imagen: "../../../assets/img/numeros/9.png",
      sonidoE: "../../../assets/sonidos/numeros/9e.m4a",
      sonidoI: "../../../assets/sonidos/numeros/9i.m4a",
      sonidoP: "../../../assets/sonidos/numeros/9p.m4a",
    },  
    
  ]

  idioma: string; 
  bandera : string;

  constructor(public router: Router
    // private screenOrientation: ScreenOrientation
    ) {
    this.recuperarDatos();
  }

  ngOnInit() {
    // this.screenOrientation.unlock();
  }

  recuperarDatos() {
    this.idioma = JSON.parse(localStorage.getItem("idioma"));
    switch (this.idioma) {
      case "ingles":
        this.bandera = "../../../assets/img/fab/ingles-png.png";
        break;
      case "portugues":
        this.bandera = "../../../assets/img/fab/brasil.png";
        break;
      case "español":
        this.bandera = "../../../assets/img/fab/argentina.png";
        break;
      default:
        break;
    }
  }

  reproducirSonido(color) {
    let sonido = new Audio();
    switch (this.idioma) {
      case "español":
        sonido.src = color.sonidoE;
        break;
      case "portugues":
        sonido.src = color.sonidoP;
        break;
      case "ingles":
        sonido.src = color.sonidoI;
        break;
      default:
        break;
    }
    sonido.play();
  }

  cambiarIdioma1(){
    this.idioma = "portugues";
    this.bandera = "../../../assets/img/fab/brasil.png";
    localStorage.setItem("idioma", JSON.stringify(this.idioma));
  }
  
  cambiarIdioma2(){
    this.idioma = "español";
    this.bandera = "../../../assets/img/fab/argentina.png";
    localStorage.setItem("idioma", JSON.stringify(this.idioma));
  }
  
  cambiarIdioma3(){
    this.idioma = "ingles";
    this.bandera = "../../../assets/img/fab/ingles-png.png";
    localStorage.setItem("idioma", JSON.stringify(this.idioma));
  }

  moverA(pagina){
    this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
        this.router.navigateByUrl(pagina);
      }, 3000)
  }


}
