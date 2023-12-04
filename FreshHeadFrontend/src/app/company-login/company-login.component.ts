import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { Guid } from "guid-typescript";
import { Loginmodel } from "../model/company/loginmodel";

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {
  isLoggedIn = false;
  Email: string = '';
  Password: string = '';


constructor(@Inject(AuthenticationService) private authService: AuthenticationService, private router: Router) {

}

isValid(): boolean {
    console.log('Email:', this.Email);
    console.log('Password:', this.Password);
    return this.Email.trim() !== '' && this.Password.trim() !== '';
}

onSubmit() {
    if (!this.isValid()) {
        console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
        return;
    }

    let loginData: Loginmodel = new Loginmodel(this.Email, this.Password);
    console.log(loginData)

    this.authService.login(loginData)
        .subscribe(
            (result: any) => {
                if (result && result.token) {
                    // Succesvol ingelogd, sla het token op en navigeer naar de homepagina
                    this.authService.setToken(result.token);
                    const ID = result.ID; // replace with the actual property name in the response

                // Use the ID as needed
                console.log('Company ID:', ID);
                    this.router.navigate(['company']);
                } else {
                    console.log('Inloggen mislukt. Geen token ontvangen.');
                }
            },
            (error) => {
                console.error('Inloggen mislukt', error);
            }
        );
}

logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.Email = '';
}

}


