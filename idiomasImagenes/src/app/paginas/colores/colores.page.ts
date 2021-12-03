import { Component, OnInit } from '@angular/core';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from "@angular/router";


@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {

  spinner: boolean = false;

  colores = [
    {
      nombre: "rojo",
      imagen: "../../../assets/img/colores/rojo.png",
      sonidoE: "../../../assets/sonidos/colores/español/rojoEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/rojoIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/rojoPortugues.mp3",
    },    
    {
      nombre: "azul",
      imagen: "../../../assets/img/colores/azul.png",
      sonidoE: "../../../assets/sonidos/colores/español/azulEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/azulIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/azulPortugues.mp3",
    },
    {
      nombre: "naranja",
      imagen: "../../../assets/img/colores/naranja.jpg",
      sonidoE: "../../../assets/sonidos/colores/español/naranjaEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/naranjaIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/naranjaPortugues.mp3",

    },
    {
      nombre: "verde",
      imagen: "../../../assets/img/colores/verde.png",
      sonidoE: "../../../assets/sonidos/colores/español/verdeEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/verdeIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/verdePortugues.mp3",
    },
    {
      nombre: "gris",
      imagen: "../../../assets/img/colores/gris.png",
      sonidoE: "../../../assets/sonidos/colores/español/grisEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/grisIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/grisPortugues.mp3",
    },
    {
      nombre: "violeta",
      imagen: "../../../assets/img/colores/violeta.jpg",
      sonidoE: "../../../assets/sonidos/colores/español/moradoEspañol.mp3",
      sonidoI: "../../../assets/sonidos/colores/ingles/moradoIngles.mp3",
      sonidoP: "../../../assets/sonidos/colores/portu/moradoPortugues.mp3",
    },
  ]

  idioma: string  = "español"; 
  bandera : string = "../../../assets/img/fab/argentina.png";
  juego: string = "../../../assets/img/fab/colores.png";

  constructor(
    // private screenOrientation: ScreenOrientation
    private router: Router,
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
        sonido.src = color.sonidoE;
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
