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
  //private currentUser: User =  new User();

  constructor(private authDb:AngularFireAuth,
    private router:Router, 
    private userService:UserService) { }

  // public async Registrarse(registerData: RegisterData):Promise<ResponseFirebase>{
  //   let response:ResponseFirebase = new ResponseFirebase();
  //   let uid:string;

  //   await this.authDb.createUserWithEmailAndPassword(registerData.loginData.email, registerData.loginData.pass)
  //     .then((userCredential) => {        
  //       this.isAuth = true;
  //       response.ok = true;
  //       uid = userCredential.user.uid;
  //     })
  //     .catch((error) => {        
  //       this.isAuth = false;
  //       let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
  //       response.ok = false;
  //       response.error = errorFirebase;      
  //     });

  //   if(response.ok){
  //     this.currentUser = registerData.usuario;
  //     await this.userService.setItemWithId(this.currentUser, uid).catch((err)=>{
  //       console.log(err);
  //       this.Desloguearse();
  //     });
  //   }

  //   return response;
  // }

  public async Ingresar(loginData: LoginData): Promise<ResponseFirebase>{  
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.signInWithEmailAndPassword(loginData.email, loginData.pass)
    .then((userCredential) => {                 
      this.isAuth = true;
      response.ok = true;  
      this.currentEmail = userCredential.user.email;    
    })
    .catch((error) => {
      this.isAuth = false;
      let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
      response.ok = false;
      response.error = errorFirebase;          
    })
    .finally(()=>{

    });
          
    // if(response.ok){
    //   await this.userService.getUserByEmail(loginData.email).then((qs) =>{
    //     if(qs.size === 1){
    //       this.currentUser = qs.docs[0].data();
    //     }
    //   });
    // } 
    
    return response;
  }

  public Desloguearse(){    
    this.isAuth = false;
    this.currentEmail = '';
    //this.currentUser = new User();
    this.router.navigate(["login"]);
  }

  public GetIsAuth():boolean{    
    return this.isAuth;
  }

  public GetCurrentEmail():string{
    return this.currentEmail;
  }

  // public GetCurrentUser():User{
  //   return this.currentUser;
  // }
}
