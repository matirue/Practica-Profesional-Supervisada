import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  title:string;
  id:Observable<number>;
  public chatForm: FormGroup;
  mensaje:string;
  mensajes:Message[];
  //@ViewChild('salachat', { static: true }) private chatDiv: any;
  showSpinner:boolean;
  currentUserEmail: string;
  bgSala:string;  

  constructor(private route: ActivatedRoute,
    private mjeService: ChatService, 
    private authService:AuthService, 
    private fb:FormBuilder,
    private router:Router) 
  {
    this.id = this.route.params.pipe(map(p => p.id));
    this.title = "";
    
    
  }

  ngOnInit() {
    this.id.subscribe((id)=>{              
      if(id == 0){
        this.title = "PPS-4A";
        this.bgSala = "container cont-chat bg-sala-a";
      }
      else{
        this.title = "PPS-4B";
        this.bgSala = "container cont-chat bg-sala-b";
      }

      this.mjeService.setCollName(this.title);

      this.mjeService.items.subscribe(
        (mje)=>{        
          this.mensajes = mje;
          this.showSpinner = false;
        }
      );  
      
    });

    this.chatForm = this.fb.group({
      messageCtrl:['', [Validators.required, Validators.maxLength(21)]],      
    });    
        
    this.currentUserEmail = this.authService.GetCurrentUser().email;    
  }

  enviarMje(){       
    let mje = new Message();
    mje.message = this.mensaje;  
    mje.userName = this.authService.GetCurrentUser().email;
    mje.userEmail = this.authService.GetCurrentUser().email;                
    mje.fecha = Date.now();      

    this.mjeService.setItemWithId(mje, mje.fecha.toString());    
    console.log(mje);

    this.mensaje = "";
  }

  getMessageCtrl(){
    return this.chatForm.get("messageCtrl");
  }

  goToHome(){
    this.router.navigate(["home"]);
  }

  clickLogout(){
    this.authService.Desloguearse();
  }
}
