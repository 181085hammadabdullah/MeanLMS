import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { JwtTokenService } from './client-interface/Client-Auth/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private jwtService: JwtTokenService,
    private router: Router,
    ) { }

  canActivate(): boolean {

    if (this.jwtService.getToken()) {
      return true;

    } else {

      this.router.navigate(['/SignIn']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
