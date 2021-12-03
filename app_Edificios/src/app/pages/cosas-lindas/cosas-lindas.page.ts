import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  items: Observable<any[]>;
  likes: any[];
  array: any[] = [];

  constructor(public auth: AuthService, public photo: PhotoService) {
    this.items = this.photo.items;
  }

  ngOnInit() {
    this.items.subscribe( (val: any) =>{
      this.auth.loading = true;
      this.array = val;
      localStorage.removeItem('array');
      localStorage.setItem('array', JSON.stringify(this.array));
      this.array.sort((x,y)=>{
        return y.sort - x.sort;
      });
      this.auth.loading = false;
    })
    localStorage.setItem('array', JSON.stringify(this.array));
  }

  ionViewDidEnter(){
    localStorage.removeItem('array');
    localStorage.setItem('array', JSON.stringify(this.array));
  }
}
