import { Injectable } from '@angular/core';
//Import router modules
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { AuthService } from 'src/auth.service';
//Import service
@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private authService: AuthService){};
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.isAuthenticated();
  }
}