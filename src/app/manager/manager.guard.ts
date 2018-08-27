import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ManagerGuard implements CanActivate {
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['/login']);
        return false;
      } else {
        if ((decodedToken.is_admin === 'Y' || decodedToken.is_staff === 'Y') && decodedToken.status === 'Y') {
          return true;
        } else {
          this.router.navigate(['/access-denied']);
        }
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
