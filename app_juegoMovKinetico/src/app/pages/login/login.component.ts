import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastType } from 'src/app/models/enums/toastType-enum';
import { LoginMock } from 'src/app/models/login-mock';
import { LoginData } from 'src/app/models/loginData';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData:LoginData;
  loginForm:FormGroup;
  loginsMock:LoginData[];  

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,    
    private spinner:SpinnerService, 
    private toast:ToastService) { 
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
    this.spinner.show();
    this.ingresar();
  }

  ingresar(){
    this.authService.Ingresar(this.loginData).then((value)=>{
      if (value.ok){   
        this.ngOnInit();   
        this.router.navigate(['home']);    
      }
      else{
        console.log("error ingreso")      
        this.toast.present(value.error.description, ToastType.Warning);
      }
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{      
      this.spinner.hide();
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
