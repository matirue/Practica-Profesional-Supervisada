import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from "jquery";

//ESTO LO AGREGUE DPS
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit 
{
  email : string;
  password : string;
  usuarios: Observable<any[]>;
  lista: any[];

  constructor(private authService : AuthService, public router : Router, public fb : FormBuilder, db : AngularFirestore, public vibration : Vibration) 
  {
    this.usuarios = db.collection('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
    $("#loadingContainer").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer").attr("hidden", true);
    }, 2000);
  }

  ngOnInit() {
  }


  onSubmitLogin()
  {
    var flag : boolean = false;
    this.email=$("#input1").val();
    this.password=$("#input2").val();
    for (let usuario of this.lista)
    {
      if(usuario.correo == this.email && usuario.clave == this.password)
      {
        flag=true;
        localStorage.setItem("clave", usuario.clave);
        this.moveToHome();
        break;
      }
    }
    if(flag == false)
    {
      this.wrongData();
    }
    else
    {
      flag = false;
    }
  }


  //FALTA TERMINAR
  moveToHome()
  {
    this.clearInputs();
    this.hideDirs();
    $("#loadingContainer").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer").attr("hidden", true);
      this.router.navigate(['/home']);
    }, 2000);
  }

  wrongData() 
  {
    let aux : boolean = false;
    if(this.isEmail(this.email) == false)
    {
      $("#mensaje1").attr("hidden", false);
      aux = true;
    }
    else
    {
      $("#mensaje1").attr("hidden", true);
    }
    if(this.isPassword(this.password) == false)
    {
      $("#mensaje2").attr("hidden", false);
      aux = true;
    }
    else
    {
      $("#mensaje2").attr("hidden", true);
    }
    if(this.isEmail(this.email) && this.isPassword(this.password))
    {
      $("#mensaje3").attr("hidden", false);
      aux = true;
    }
    else
    {
      $("#mensaje3").attr("hidden", true);
    }
    if(aux)
    {
      this.vibration.vibrate(500);
    }
  }

  hideDirs()
  {
    $("#mensaje1").attr("hidden", true);
    $("#mensaje2").attr("hidden", true);
    $("#mensaje3").attr("hidden", true);
  }

  isEmail(cadena : string) : boolean
  {
    var retorno : boolean = false;

    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    retorno = regexp.test(cadena);

    return retorno;
  }

  isPassword(cadena : string) : boolean
  {
    var retorno : boolean = false;
    var error : boolean = false;
    
    if(cadena != null)
    {
      if(cadena.length >= 4)
      {
        for(var i = 0; i < cadena.length; i++)
        {
          if(cadena[i] == ' ')
          {
            error = true;
            break;
          }
        }
        if(error == false)
        {
          retorno = true;
        }
     }
    }
    return retorno;
  }

  clearInputs()
  {
    this.email ="";
    this.password ="";
    $("#input1").val(null);
    $("#input2").val(null);
  }

  imgUser: string = '';

  completar1()
  {
    $("#input1").val("admin@admin.com");
    $("#input2").val("111111");
    this.imgUser = "../../../assets/user/admin.png";
  }

  completar2()
  {
    $("#input1").val("invitado@invitado.com");
    $("#input2").val("222222");
    this.imgUser="../../../assets/user/invitado.png";
      
  }

  completar3()
  {
    $("#input1").val("usuario@usuario.com");
    $("#input2").val("333333");
    this.imgUser="../../../assets/user/user.png";    
  }

  completar4()
  {
    $("#input1").val("anonimo@anonimo.com");
    $("#input2").val("444444");
    this.imgUser="../../../assets/user/anonimo.png";
  }

  completar5()
  {
    $("#input1").val("tester@tester.com");
    $("#input2").val("555555");
    this.imgUser="../../../assets/user/test.png";
  }
}