import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  items: Observable<any[]>;
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
  }

  ionViewDidEnter(){
    localStorage.removeItem('array');
    localStorage.setItem('array', JSON.stringify(this.array));
  }

}
