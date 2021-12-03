import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit {

  logos_DC:string[];
  logos_MV:string[];

  constructor(private router:Router) { 
    this.logos_DC = [
      "assets/batman.png",
      "assets/superman.png",
      "assets/flash.jpg",
    ];
    this.logos_MV = [
      "assets/iroman.jpg",
      "assets/capitanamerica.png",
      "assets/spiderman.png",
      
    ]
  }

  ngOnInit() {}

  seleccionarPersonaje_DC(index:number):void {
    this.router.navigate(['game', {logo: this.logos_DC[index]}])
  }

  seleccionarPersonaje_MV(index:number):void {
    this.router.navigate(['game', {logo: this.logos_MV[index]}])
  }
}
