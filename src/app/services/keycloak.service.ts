import { Injectable, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakAuth!: Keycloak.KeycloakInstance;
  private authStatus:boolean=false;
  constructor() {
    this.keycloakAuth = {} as Keycloak.KeycloakInstance;
  }
  init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const config = {
        url: 'https://localhost:8443',
        realm: 'rieker',
        clientId: 'orderrieker'
      };
  
      this.keycloakAuth = new Keycloak(config);
  
      this.keycloakAuth.init({ onLoad: 'check-sso' }) // Thay đổi 'login-required' thành 'check-sso'
        .then((authenticated) => {
          if (authenticated) {
            resolve();
          } else {
            // Xử lý trường hợp chưa xác thực
            // Có thể không làm gì và resolve ngay lập tức
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  login(): void {
    this.keycloakAuth.login();
  }

  logout(): void {
    this.keycloakAuth.logout();
  }

  isAuthenticated(): boolean {
    return this.keycloakAuth.authenticated??true ;   
  }
  getUserDisplayName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.keycloakAuth.loadUserProfile()
        .then((profile) => {
          resolve(profile.firstName + ' ' + profile.lastName);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  
}
