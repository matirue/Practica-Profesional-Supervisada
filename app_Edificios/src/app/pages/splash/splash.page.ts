import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  subscribe: any;

  constructor(private router: Router, private platform: Platform) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666,() =>{
      if(this.constructor.name === 'SplashPage' || this.constructor.name === 'LoginPage')
      {
        if(window.confirm('Desea salir de la aplicación?'))
        {
          navigator['app'].exitApp();
        }
      }
      else
      {
        window.history.back();
      }
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // SplashScreen.hide();
    setTimeout(()=>{
      this.router.navigate(['login']);
    },2000);
  }

}