import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-mis-fotos-lindas',
  templateUrl: './mis-fotos-lindas.page.html',
  styleUrls: ['./mis-fotos-lindas.page.scss'],
})
export class MisFotosLindasPage implements OnInit {

  user: string[] = [''];
  items: any;
  array: any[] = [];

  constructor(public auth: AuthService, public photo: PhotoService) {
    this.user = this.auth.isLoggedIn?.email.split('@');
    this.items = this.photo.items;
  }

  ngOnInit() {
    this.user = this.auth.isLoggedIn?.email.split('@');
    this.items.subscribe( (val: any) =>{
      this.auth.loading = true;
      this.array = val;
      this.array.sort((x,y)=>{
        return y.sort - x.sort;
      });
      this.auth.loading = false;
    })
  }

  ionViewWillLeave(){
    localStorage.removeItem('array');
  }

}
