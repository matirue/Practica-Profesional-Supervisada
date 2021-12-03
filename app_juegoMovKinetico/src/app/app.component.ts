import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private authService:AuthService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide();
        this.router.navigateByUrl('splash');
      }, 0);
    });
  }

  logout(){
    this.menu.close('custom');
    this.authService.Desloguearse();
  }

  goToTop3(){
    this.menu.close('custom');
    this.router.navigateByUrl('top3');
  }

  goHome(){
    this.menu.close('custom');
    this.router.navigateByUrl('home');
  }
}
