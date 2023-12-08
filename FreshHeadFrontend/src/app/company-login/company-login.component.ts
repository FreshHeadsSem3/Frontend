import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Inject } from '@angular/core';
import { Router } from "@angular/router";
import { Guid } from "guid-typescript";
import { Loginmodel } from "../model/company/loginmodel";
import { NgForm } from '@angular/forms';
import {NavbarComponent} from "../navbar/navbar.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {
  isLoggedIn = false;
  UserEmail: string = '';
  UserPassword: string = '';


constructor(@Inject(AuthenticationService) private authService: AuthenticationService, private router: Router, private navbar: NavbarComponent, private toastr : ToastrService) {

}

isValid(): boolean {
    return this.UserEmail.trim() !== '' && this.UserPassword.trim() !== '';
}

onSubmit() {
  console.log('onSubmit called');
  if (!this.isValid()) {
      console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
      return;
  }
  let loginData: Loginmodel = new Loginmodel(this.UserEmail, this.UserPassword);
  this.authService.login(loginData)
      .subscribe(
          (result: any) => {
              if (result != null) {
                this.toastr.success("U bent ingelogd")
                this.navbar.isLogedin = true
                this.router.navigate(['']);
              } else {
                  console.log('Inloggen mislukt. Geen token ontvangen.');
              }
          },
          (error) => {
              this.toastr.error("Email en wachtwoord komen niet overeen")
          }
      );
  }

}


