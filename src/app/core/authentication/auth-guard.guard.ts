import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
      private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url === '/home' && !this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    } else if ((state.url === '/login' || state.url === '/' || state.url === '') && this.authService.isLogged()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
