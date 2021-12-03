import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: any = false;
  currentPassword: string;
  loading: boolean = false;

  constructor(private auth: AngularFireAuth, private router: Router, public loadingController: LoadingController, public toaster: ToastrService) {
    this.auth.authState.subscribe((user) => {
      this.isLoggedIn = user;
    });
  }


  async login(email, password) {
    this.currentPassword = password;
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  mostrarToast(mensaje: string){
    this.toaster.error(mensaje);
  }

  async logOut(){

    this.loading = true;
    
    this.auth.signOut()
    .then(() =>{
      setTimeout( () =>{
        this.router.navigate(['login']);
        this.loading = false;
      },2000)
    });
  }
}
