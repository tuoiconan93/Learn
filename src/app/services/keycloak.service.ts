import { Injectable, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakAuth!: Keycloak;
  public isLoggedIn: boolean = false;
  constructor() {
    this.keycloakAuth = {} as Keycloak;
  }
  init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const config = {
        url: 'https://localhost:8443',
        realm: 'rieker',
        clientId: 'orderrieker'
      };
  
      this.keycloakAuth = new Keycloak(config);
  
      this.keycloakAuth.init({ onLoad: 'check-sso',flow:'standard' }) // Thay đổi 'login-required' thành 'check-sso'
        .then((authenticated) => {
          this.isLoggedIn = authenticated;
          if (authenticated) {
            resolve();
            
          } else {
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  status(){
    console.log('login',this.isLoggedIn);
    
  }
  login(): void {
    this.keycloakAuth.login();
  }

  logout(): void {
    this.keycloakAuth.logout();
  }
  // isAuthenticated(): boolean {
  //   return this.keycloakAuth.authenticated??true ;   
  // }
  getUserProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.keycloakAuth.loadUserProfile()
        .then((profile) => {
          const userProfile = {
            displayName: profile.firstName + ' ' + profile.lastName,
            email: profile.email,
            firstname: profile.firstName,
            lastname: profile.lastName,
          };
          resolve(userProfile);
        })
        .catch((error) => {
          reject(error);
        });
    });

  }
  
  
}
