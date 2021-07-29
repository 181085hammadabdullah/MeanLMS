import { Injectable } from '@angular/core';
import { AdminJwtService } from './admin-auth/admin-jwt-.service';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private jwtService: AdminJwtService,
    private router: Router,
    ) { }

  canActivate(): boolean {

    if (this.jwtService.getToken()) {
      return true;

    } else {

      this.router.navigate(['/admin']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
