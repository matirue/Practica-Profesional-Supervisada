import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  items: any;
  chatDb = '/fotos';
  ultimaUbicacion = '';
  disable: boolean = false;

  constructor(private db: AngularFireDatabase, public auth: AuthService, private storage: AngularFireStorage, private toastr: ToastrService) {
    this.items = db.list('/fotos');
    this.items = this.items.snapshotChanges().pipe(
      map((changes: any) => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async TakePhoto(tipo: string){
      let capturedPhoto = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        webUseInput: true,
      });
  
      let dataUrl = capturedPhoto.dataUrl;
      let hora = new Date().getTime();
      this.ultimaUbicacion = '/' + this.auth.isLoggedIn?.email + hora;
      let ref = this.storage.ref(`fotos${tipo}/` + this.ultimaUbicacion);

      this.auth.loading = true;

      ref.putString(dataUrl, 'data_url',{
        contentType: 'image/jpeg',
      }).then(()=>{
        this.uploadPhoto(tipo);
      });
    }

    uploadPhoto(tipo: string){
      let storage = this.storage.ref(`/fotos${tipo}`).child(this.ultimaUbicacion);
      storage.getDownloadURL().toPromise()
      .then( (url:any) =>{
        const itemsRef = this.db.list('/fotos');
        let user = this.auth.isLoggedIn?.email.split('@');
        let d = new Date();
        let day: any = d.getDate();
        let month: any = d.getMonth();
        let year = d.getFullYear();

        if(day < 10) {
          day = '0' + day;
        }
        if(month < 10) {
          month = '0' + month;
        }

        let photo: any = {
          user: user[0],
          sort: Date.now(),
          url: url,
          likes: 0,
          dislikes: 0,
          likedBy: {
            admin: '',
            anonimo: '',
            invitado: '',
            usuario: '',
            tester: '',
          },
          tipo: tipo,
          date: day + "/" + month + "/" + year,
        }

        itemsRef.push(photo);
      });
      this.auth.loading = false;
    }

    mostrarToast(mensaje) {
      this.toastr.error(mensaje);
    }

    disableButton(item: any){
      let user = this.auth.isLoggedIn?.email.split('@');

      if(item.likedBy.admin === user[0])
      {
        this.disable = true;
        this.mostrarToast('Ya ha votado esta publicacion');
      }
      else if(item.likedBy.tester === user[0])
      {
        this.disable = true;
        this.mostrarToast('Ya ha votado esta publicacion');
      }
      else if(item.likedBy.anonimo === user[0])
      {
        this.disable = true;
        this.mostrarToast('Ya ha votado esta publicacion');
      }
      else if(item.likedBy.usuario === user[0])
      {
        this.disable = true;
        this.mostrarToast('Ya ha votado esta publicacion');
      }
      else if(item.likedBy.invitado === user[0])
      {
        this.disable = true;
        this.mostrarToast('Ya ha votado esta publicacion');
      }
    }

    updateLikes(item: any){
      let user = this.auth.isLoggedIn?.email.split('@');
      this.disableButton(item);

      if(item.likedBy.admin === '' && user[0] === 'admin')
      {
        item.likedBy.admin = 'admin';
        item.likes++;
      }
      else if(item.likedBy.tester === '' && user[0] === 'tester')
      {
        item.likedBy.tester = 'tester';
        item.likes++;
      }
      else if(item.likedBy.anonimo === '' && user[0] === 'anonimo')
      {
        item.likedBy.anonimo = 'anonimo';
        item.likes++;
      }
      else if(item.likedBy.invitado === '' && user[0] === 'invitado')
      {
        item.likedBy.invitado = 'invitado';
        item.likes++;
      }
      else if(item.likedBy.usuario === '' && user[0] === 'usuario')
      {
        item.likedBy.usuario = 'usuario';
        item.likes++;
      }

      let actualizar = this.db.list('/fotos');
      actualizar.set(item.key, {url: item.url, likes: item.likes, user: item.user, dislikes: item.dislikes, tipo: item.tipo, likedBy: item.likedBy, date: item.date, sort: item.sort});
    }
}