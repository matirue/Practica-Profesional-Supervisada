import { Genero } from "./enums/genero-enum";
import { LoginData } from "./loginData";

export class RegisterData{
    
    public genero: Genero;
    public nombre:string;
    public rol:string;
    public loginData:LoginData;
    
    constructor(){
        this.loginData = new LoginData();
    }
}
