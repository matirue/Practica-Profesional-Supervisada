import { LoginData } from './loginData';

export class LoginMock {
    public static Mocks:LoginData[] = [
        { email:"admin@admin.com", pass:"111111" },
        { email:"invitado@invitado.com", pass:"222222" },
        { email:"usuario@usuario.com", pass:"333333" },
        { email:"anonimo@anonimo.com", pass:"444444" },
        { email:"tester@tester.com", pass:"555555" }
    ];
}
