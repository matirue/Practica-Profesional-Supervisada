import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollectionOrderBy("users", "nombre");
  }

  async getUserByEmail(email:string){

    return this.getItemByFilter("email", email).then();
  }
}
