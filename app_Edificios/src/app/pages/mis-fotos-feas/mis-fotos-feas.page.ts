import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-mis-fotos-feas',
  templateUrl: './mis-fotos-feas.page.html',
  styleUrls: ['./mis-fotos-feas.page.scss'],
})
export class MisFotosFeasPage implements OnInit {

  user: string[] = [''];
  items: any;
  disable: boolean = false;
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
}
