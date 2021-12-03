import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuarix } from "../clases/usuarix";

@Injectable({
  providedIn: 'root'
})
export class AutentiService {

  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  //login
  async onLogin(usuar: Usuarix) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(usuar.correo, usuar.contrasenia)
    } catch (error) {
      console.log("Se ha producido un error al relizar el ingreso a su cuenta!", error);
    }
  }
}
