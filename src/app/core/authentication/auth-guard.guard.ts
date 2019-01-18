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
      const currentUser = this.authService.getCurrentUserValue();
    if (state.url === '/home' && !currentUser) {
      this.router.navigate(['/login']);
      return false;
    } else if ((state.url === '/login' || state.url === '/' || state.url === '') && currentUser && currentUser.sessionTokenBck) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
