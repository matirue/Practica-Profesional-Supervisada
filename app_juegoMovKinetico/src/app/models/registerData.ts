import { LoginData } from "./loginData";
import { User } from "./user";

export class RegisterData{
    public usuario:User;
    public loginData:LoginData;

    constructor(){
        this.loginData = new LoginData();
        this.usuario = new User();
    }
}
