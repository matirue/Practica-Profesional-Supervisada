import { PhotoService } from 'src/app/services/photo.service';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  items: Observable<any>;
  array: any;

  constructor(public auth: AuthService, private photo: PhotoService){
    this.items = this.photo.items;
  }

  ngOnInit() {
  }
}