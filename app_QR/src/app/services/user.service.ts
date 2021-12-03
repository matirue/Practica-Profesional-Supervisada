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
    this.setCollection("users");
  }

  async getUserByEmail(email:string){

    return this.getItemByFilter("email", email).then();

    // this.getItemByFilter("email", email).then((qs) =>{
    //   if(qs.size === 1){
    //     qs.docs[0].data();
    //   }
    // })
    // .catch((err)=>{
    //   console.log(err);
    // });
  }
}
