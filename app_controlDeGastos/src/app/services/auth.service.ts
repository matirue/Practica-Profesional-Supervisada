import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Rol } from '../models/enums/rol-enum';
import { ErrorHandleFirebase } from '../models/errors-handle';
import { LoginData } from '../models/loginData';
import { RegisterData } from '../models/registerData';
import { ResponseFirebase } from '../models/response-firebase';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth:boolean = false;
  private currentEmail:string = '';
  private currentUid:string;

  constructor(private authDb:AngularFireAuth,
    private router:Router, 
    private userService:UserService) { }

  public async Ingresar(loginData: LoginData): Promise<ResponseFirebase>{  
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.signInWithEmailAndPassword(loginData.email, loginData.pass)
    .then((userCredential) => {                 
      this.isAuth = true;
      response.ok = true;  
      this.currentEmail = userCredential.user.email;  
      this.currentUid =userCredential.user.uid;  
    })
    .catch((error) => {
      this.isAuth = false;
      let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
      response.ok = false;
      response.error = errorFirebase;          
    })
    .finally(()=>{

    });
        
    
    return response;
  }

  public Desloguearse(){    
    this.isAuth = false;
    this.currentEmail = '';
    this.currentUid = '';
    //this.currentUser = new User();
    this.router.navigate(["login"]);
  }

  public GetIsAuth():boolean{    
    return this.isAuth;
  }

  public GetCurrentEmail():string{
    return this.currentEmail;
  }

  public GetCurrentUid():string{
    return this.currentUid;
  }
}
