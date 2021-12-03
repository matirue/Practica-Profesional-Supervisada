import { Rol } from "./enums/rol-enum";

export class User{
    public nombre:string;
    public apellido: string;
    public dni:string;
    public rol:Rol;
    public img_src: string;
    public email:string;
}