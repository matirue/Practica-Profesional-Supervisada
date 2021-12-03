import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoginMock } from 'src/app/models/login-mock';
import { LoginData } from 'src/app/models/loginData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData:LoginData;
  loginForm:FormGroup;
  loginsMock:LoginData[];
  spinner: any;

  constructor(public toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController) { 
  }

  ngOnInit() {
    this.loginData = new LoginData();
    this.loginsMock = LoginMock.Mocks;
    this.loginForm = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async clickLogin(){     
    console.log(this.loginData)
    await this.presentLoading();
    this.spinner.present();
    this.ingresar();
  }

  ingresar(){
    this.authService.Ingresar(this.loginData).then((value)=>{
      if (value.ok){     
        this.router.navigate(['home']);
        this.ngOnInit();        
      }
      else{
        console.log("error ingreso")
        this.presentToast(value.error.description);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.dismiss();
    });      
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      color: 'warning',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.spinner = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...'
    });
  }

  getEmailControl() { return this.loginForm.controls["email"]; }

  getPassControl() { return this.loginForm.controls["pass"]; }

  goToRegister() {
    this.router.navigate(['register']); 
    this.ngOnInit();
  }

  fillLogin(index:number){
    this.loginData = this.loginsMock[index];
    
  }

}
