import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const isLoggedIn = this.keycloakService.isLoggedIn;
    if (isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
}
