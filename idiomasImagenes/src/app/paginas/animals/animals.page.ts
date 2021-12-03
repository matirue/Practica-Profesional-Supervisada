import { Component, OnInit } from '@angular/core';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from "@angular/router";



@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {

  spinner: boolean = false;


  animales = [
    {
      nombre: "vaca",
      imagen: "../../../assets/img/animales/vaca.png",
      sonidoE: "../../../assets/sonidos/animales/español/vacaEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/vacaIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/vacaPortugues.mp3",

    },
    {
      nombre: "burro",
      imagen: "../../../assets/img/animales/burro.png",
      sonidoE: "../../../assets/sonidos/animales/español/burroEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/burroIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/burroPortugues.mp3",

    },
    {
      nombre: "cerdo",
      imagen: "../../../assets/img/animales/cerdo.png",
      sonidoE: "../../../assets/sonidos/animales/español/cerdoEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/cerdoIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/cerdoPortugues.mp3",
    },
    {
      nombre: "conejo",
      imagen: "../../../assets/img/animales/conejo.png",
      sonidoE: "../../../assets/sonidos/animales/español/conejoEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/conejoIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/conejoPortugues.mp3",
    },
    {
      nombre: "gallo",
      imagen: "../../../assets/img/animales/gallo.png",
      sonidoE: "../../../assets/sonidos/animales/español/galloEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/galloIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/galloPortugues.mp3",
    },
    {
      nombre: "pato",
      imagen: "../../../assets/img/animales/pato.png",
      sonidoE: "../../../assets/sonidos/animales/español/patoEspañol.mp3",
      sonidoI: "../../../assets/sonidos/animales/ingles/patoIngles.mp3",
      sonidoP: "../../../assets/sonidos/animales/porugues/patoPortugues.mp3",
    },
  ]

  idioma: string;
  bandera: string;

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

  reproducirSonido(animal) {
    let sonido = new Audio();
    switch (this.idioma) {
      case "español":
        sonido.src = animal.sonidoE;
        break;
      case "portugues":
        sonido.src = animal.sonidoP;
        break;
      case "ingles":
        sonido.src = animal.sonidoI;
        break;
      default:
        break;
    }
    sonido.play();
  }

  cambiarIdioma1() {
    this.idioma = "portugues";
    this.bandera = "../../../assets/img/fab/brasil.png";
    localStorage.setItem("idioma", JSON.stringify(this.idioma));
  }

  cambiarIdioma2() {
    this.idioma = "español";
    this.bandera = "../../../assets/img/fab/argentina.png";
    localStorage.setItem("idioma", JSON.stringify(this.idioma));
  }

  cambiarIdioma3() {
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
