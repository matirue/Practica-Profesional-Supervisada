import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterData } from 'src/app/models/registerData';
import { ResponseFirebase } from 'src/app/models/response-firebase';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerData: RegisterData;
  passConfirmation: string;
  private registerForm:FormGroup;  
  private spinner: any;

  constructor(
    private authService:AuthService, 
    public toastController:ToastController,
    private router:Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController) {                 
  }

  ngOnInit() {
    this.registerData = new RegisterData();  
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass1: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required, Validators.minLength(2)]],
      genero: ["", [Validators.required]],
      pass2: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async registrarseClick(){        
    await this.presentLoading();
    this.spinner.present();
    await this.registrarse();
  }

  registrarse(){
    this.authService.Registrarse(this.registerData).then((value)=>{
      if (value.ok){      
        this.router.navigate(['home']);
        this.ngOnInit();
      }
      else{
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
      message: 'Please wait...'
    });
  }

  getEmailControl() { return this.registerForm.controls["email"]; }
  getPass1Control() { return this.registerForm.controls["pass1"]; }
  getNameControl() { return this.registerForm.controls["name"]; }
  getGeneroControl() { return this.registerForm.controls["genero"]; }
  getPass2Control() { return this.registerForm.controls["pass2"]; }

  goToLogin(){ 
    this.router.navigate(['login']);
    this.ngOnInit();
   }

}
