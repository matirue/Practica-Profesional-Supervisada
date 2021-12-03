import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  boton: string = 'Ingresar';
  loading: boolean = false;
  errorMail: string = '';
  errorPassword: string = '';

  constructor(public auth: AuthService, private router: Router, public loadingController: LoadingController, public toaster: ToastrService){

  }

  ngOnInit() {
  }

  login_admin(){
    this.errorMail = '';
    this.errorPassword = '';
    this.email = 'admin@admin.com';
    this.password = '111111';
  }
  
  login_invitado(){
    this.errorMail = '';
    this.errorPassword = '';
    this.email = 'invitado@invitado.com';
    this.password = '222222';
  }

  login_usuario(){
    this.errorMail = '';
    this.errorPassword = '';
    this.email = 'usuario@usuario.com';
    this.password = '333333';
  }

  login_anonimo(){
    this.errorMail = '';
    this.errorPassword = '';
    this.email = 'anonimo@anonimo.com';
    this.password = '444444';
  }  

  login_tester(){
    this.errorMail = '';
    this.errorPassword = '';
    this.email = 'tester@tester.com';
    this.password = '555555';
  }

  mostrarToast(mensaje: string){
    this.toaster.error(mensaje);
  }  

  emailChange(arg){

    if(!this.validarMail())
    {
      this.errorMail = 'Ingrese un correo electronico valido';
    }
    else
    {
      this.errorMail = '';
    }
  }

  passwordChange(arg){
    if(!this.validarPassword())
    {
      this.errorPassword = 'La contraseña debe poseer 6 caracteres o más';
    }
    else
    {
      this.errorPassword = '';
    }
  }

  validarPassword(){
    return this.password.length >= 6;
  }

  validarMail(){
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!regexp.test(this.email))
    {
      return false;
    }
    else
    {
      return true;
    }
  }


  async login(){
    if(this.email !== '' && this.password !== '' && this.password.length >= 6 && this.validarMail() && this.validarPassword()){
      this.errorMail = '';
      this.errorPassword = '';
      this.boton = '';
      this.loading = true;
      this.auth.login(this.email, this.password)
      .then(() =>{
        setTimeout( () =>{
          this.router.navigate(['home']);
          this.loading = false
          this.boton = 'Ingresar';
        },2000)
      })
      .catch((err) =>{
        this.mostrarToast('Los datos ingresados no son validos');
        setTimeout( () =>{
          this.loading = false;
          this.boton = 'Ingresar';
        },2000)
      });
    }
    else if(this.email === '' || this.password === '')
    {
      this.errorMail = 'Ingrese un correo electronico';
      this.errorPassword = 'Ingrese una contraseña';
    }
  }
}
