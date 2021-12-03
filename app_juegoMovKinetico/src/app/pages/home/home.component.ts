import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { GameResult } from 'src/app/models/game-result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  srcImg:string;
  public analizarMovimientos: any;
  maxX:number;
  maxY:number;
  calculatedX:number;
  calculatedY:number;
  y:number;
  x:number;
  acel:number;
  acelX:number;
  acelY:number;
  posX:number;
  posY:number;
  public imgxy: Animation;
  interval:any;  
  gameOver:boolean;
  sleep:boolean;
  time:string;
  @ViewChild('myImg') element:ElementRef;

  constructor(
    private animationController: AnimationController,
    private motion:DeviceMotion,
    private route: ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private gameService: GameService) {
      this.acel = 3;
      this.srcImg = "assets/icon.png";
      this.gameOver = false;
      this.sleep = false;

      this.maxX= window.innerWidth-60;
      this.maxY= window.innerHeight-60;

      this.calculatedX = this.maxX/2;
      this.calculatedY = this.maxY/2;

      this.x = this.calculatedX;
      this.y = this.calculatedY;
  }

  ngOnInit() {
    this.activar();  
    this.srcImg = this.route.snapshot.paramMap.get('logo');     
  }

  play(){    
    this.router.navigate(['home']);
    this.gameOver = false;
  }

  executeAnimation(duration:number, xPx:number, yPx:number){    
    if(this.imgxy){
      this.imgxy.pause();
      clearInterval(this.interval);
    }
    
    // Evalúo si llega a las paredes
    this.interval = setInterval(() => {
      this.posX = this.element.nativeElement.getBoundingClientRect().x;
      this.posY = this.element.nativeElement.getBoundingClientRect().y;

      if(this.posY > this.maxY || this.posY < 0 || this.posX > this.maxX || this.posX < 0){
        this.gameOver = true;
        this.imgxy.pause();
        clearInterval(this.interval);
        this.saveGame();
      }
    }, 15);    
    
    // Ejecuto animación
    this.imgxy = this.animationController
    .create()
    .addElement(document.querySelector('.img-element'))
    .duration(duration)
    .keyframes([
      { offset: 1, transform: 'translateX('+xPx+'px) translateY('+yPx+'px)' }
    ]);

    // Fin del Juego
    this.imgxy.play().then(() => {
      this.gameOver = true;
      clearInterval(this.interval);
    });
  }

  activar(){
    const options: DeviceMotionAccelerometerOptions = { frequency: 200 };
      // Comienza a escuchar los cambios en el movimiento del dispositivo
    this.analizarMovimientos = this.motion
      .watchAcceleration(options)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        if(!this.gameOver){
          if (acceleration.x > this.acel || acceleration.x < -this.acel || acceleration.y > this.acel || acceleration.y < -this.acel) {
            this.acelX = acceleration.x;
            this.acelY = acceleration.y;
            this.setXCoordinate(acceleration.x);
            this.setYCoordinate(acceleration.y);
            this.executeAnimation(5000, this.x, this.y);
          }
        }
    });
  }

  setXCoordinate(x:number){
    if(x < -this.acel){
      this.x = window.innerWidth; 
    }
    else if(x > this.acel){
      this.x = -window.innerWidth; 
    }else{
      this.x = this.posX;
    } 
  }

  setYCoordinate(y:number){
    if(y < -this.acel){
      this.y = -window.innerHeight; 
    }
    else if(y > this.acel){
      this.y = window.innerHeight; 
    }
    else{
      this.y = this.posY;
    } 
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  getTime(time:string){
    this.time = time;
  }

  saveGame(){
    let result = new GameResult();
    result.email = this.authService.GetCurrentEmail();
    result.imgSrc = this.srcImg;
    result.time = this.time;

    this.gameService.addItem(result);
  }
}
