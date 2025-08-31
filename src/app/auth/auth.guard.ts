import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return !!localStorage.getItem('token');
    } else {
      this.router.navigate(['/login']); // 🔄 Redirige al login si no hay token
      return false;
    }
  }
}
