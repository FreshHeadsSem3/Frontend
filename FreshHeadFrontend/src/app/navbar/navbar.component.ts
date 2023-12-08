import { Component } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isLogedin = false;

  constructor(private authService : AuthenticationService) {
    if(this.authService.getToken()){
      this.isLogedin = true;
    } else {
      this.isLogedin = false;
    }
  }

  public Logout(){
    this.authService.deleteToken()
    this.isLogedin = false;
  }
}
