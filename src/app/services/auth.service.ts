import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth'; // 👈 ya incluye /auth
  private loggedInUser: any = null;

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
    tap((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
    })
  );
}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser'); // 👈 opcional, por limpieza
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // true si hay token
  }

  getUserId(): string | null {
    if (this.loggedInUser) {
      return this.loggedInUser.id;
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
      return this.loggedInUser.id;
    }
    return null;
  }
}
