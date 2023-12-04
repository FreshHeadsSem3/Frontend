import { Guid } from 'guid-typescript';

export class Loginmodel {
    public UserEmail: string;
    public UserPassword: string;


    constructor(UserEmail: string, UserPassword: string) {
        this.UserEmail = UserEmail;
        this.UserPassword = UserPassword;
    }
}
