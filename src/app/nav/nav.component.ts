import { Component, OnInit,  } from '@angular/core';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  authenticated:boolean=false;
  constructor(private keycloakService: KeycloakService) { }
  displayName='';
  ngOnInit(): void {  
    this.keycloakService.init().then(() => {
      // this.authenticated = this.keycloakService.isAuthenticated();
      this.authenticated=this.keycloakService.isLoggedIn;
      if (this.authenticated) {
        this.keycloakService.getUserDisplayName().then((data) => {  
          this.displayName=data;
          // Thực hiện các xử lý khác với displayName ở đây
        }).catch((error) => {
        
        });
      }
    });
  }
  

  login(): void {
    // this.keycloakService.init();
    this.keycloakService.login();
  }

  logout(): void {
    // this.keycloakService.init();
    this.keycloakService.logout();
  }

}
