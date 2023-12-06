import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { Guid } from "guid-typescript";
import { Loginmodel } from "../model/company/loginmodel";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {
  isLoggedIn = false;
  UserEmail: string = '';
  UserPassword: string = '';


constructor(@Inject(AuthenticationService) private authService: AuthenticationService, private router: Router) {

}

isValid(): boolean {
    console.log('Email:', this.UserEmail);
    console.log('Password:', this.UserPassword);
    return this.UserEmail.trim() !== '' && this.UserPassword.trim() !== '';
}

onSubmit() {
  console.log('onSubmit called');
    if (!this.isValid()) {
        console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
        return;
    }
console.log('form ingevuld')

let loginData: Loginmodel = new Loginmodel(this.UserEmail, this.UserPassword);
        console.log(loginData)

    this.authService.login(loginData.UserEmail, loginData.UserPassword)
        .subscribe(
            (result: any) => {
              console.log('Login result:', result);
                if (result && result.companyResponse) {
                  console.log('Token ontvangen. Ingelogd.');
                    // Succesvol ingelogd, sla het token op en navigeer naar de homepagina
                    this.authService.setToken(result.companyResponse);
                    const ID = result.ID; // replace with the actual property name in the response

                // Use the ID as needed
                console.log('Company ID:', ID);
                    this.router.navigate(['']);
                } else {
                    console.log('Inloggen mislukt. Geen token ontvangen.');
                }
            },
            (error) => {
                console.error('Inloggen mislukt', error);
            }
        );
}

}


