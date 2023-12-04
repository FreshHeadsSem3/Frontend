import { Guid } from 'guid-typescript';

export class Loginmodel {
    public Email: string;
    public Password: string;


    constructor(Email: string, Password: string) {
        this.Email = Email;
        this.Password = Password;
    }
}
