import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/models/registerData';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastType } from 'src/app/models/enums/toastType-enum';
import { StorageService } from 'src/app/services/storage.service';
import { Photo } from '@capacitor/camera';
import { CameraService } from 'src/app/services/camera.service';
import { Rol } from 'src/app/models/enums/rol-enum';
declare let window: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  personSrc:string = "assets/person.png";
  registerData: RegisterData;
  passConfirmation: string;
  registerForm:FormGroup;  

  constructor(
    private authService:AuthService, 
    private router:Router,
    private formBuilder: FormBuilder,
    private toast:ToastService,
    private spinner:SpinnerService,
    private storageService:StorageService,
    private cameraService:CameraService) {                 
  }

  ngOnInit() {
    this.registerData = new RegisterData();  
    this.registerData.usuario.rol = Rol.Usuario;
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      // rol: [""],
      pass1: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      pass2: ["", [Validators.required, Validators.minLength(6)]],
      dni:['', [Validators.required, Validators.max(999999999), Validators.min(1000000), Validators.pattern("^[0-9]*$")]],
    },
    {
      validator: this.MustMatch('pass1', 'pass2')
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  escanearClick(){
    window.cordova.plugins.barcodeScanner.scan(
      (result) => {
        var dniData = result.text.split('@');
        this.registerForm.patchValue({
          name: dniData[2],
          lastName: dniData[1],      
          dni: dniData[4],
        });
      },
      (err) => {
        console.log(err);
        this.toast.present("Error al escanear el DNI", ToastType.Danger);
      },
      {
        showTorchButton: true,
        prompt: 'Scan your code',
        formats: 'PDF_417',
        resultDisplayDuration: 2,
      }
    );
  }

  async registrarseClick(){        
    this.spinner.show();
    await this.registrarse();
  }

  registrarse(){
    this.registerData.usuario.email = this.registerData.loginData.email;
    this.authService.Registrarse(this.registerData).then((value)=>{
      if (value.ok){      
        this.toast.present("Registro OK", ToastType.Success);
        this.ngOnInit();
        this.router.navigate(['home']);
      }
      else{
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

  getEmailControl() { return this.registerForm.controls["email"]; }
  getPass1Control() { return this.registerForm.controls["pass1"]; }
  getNameControl() { return this.registerForm.controls["name"]; }
  getLastNameControl() { return this.registerForm.controls["lastName"]; }
  getDniControl() { return this.registerForm.controls["dni"]; }
  getPass2Control() { return this.registerForm.controls["pass2"]; }
  // getRolControl() { return this.registerForm.controls["rol"]; }

  goToHome(){ 
    this.router.navigateByUrl('/home');
    this.ngOnInit();
  }

  tomarFotoPerfil(){    
    this.addPhotoToGallery();
  }

  async addPhotoToGallery() {
    const photo = await this.cameraService.addNewToGallery();
    this.uploadPhoto(photo).then().catch((err) => {
      console.log(err);
      this.toast.Error();
    });
  }

  private async uploadPhoto(cameraPhoto: Photo) {    
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const filePath = this.getFilePath();
    
    const uploadTask = this.storageService.saveFile(blob, filePath);    

    uploadTask.then(async res =>{
      const downloadURL = await res.ref.getDownloadURL();
      this.registerData.usuario.img_src = downloadURL;
      this.personSrc = downloadURL;
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    });    
  }

  getFilePath(){
    return new Date().getTime() + '-perfil';
  }
}
