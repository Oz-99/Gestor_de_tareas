import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth'; // 👈 ya incluye /auth
  private loggedInUser: any = null;

  constructor(private http: HttpClient) {}

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // payload del JWT
    } catch (e) {
      return null;
    }
  }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const payload = this.decodeToken(response.token);
          if (payload) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({
                id: payload.id,
                correo: payload.correo,
                nombre: payload.nombre || payload.correo, // 👈 fallback
              })
            );
          }
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
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // true si hay token
  }

  /** 🔥 Decodifica el token JWT para extraer el id */
  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // decodifica la parte del medio del JWT
      return payload.id || null;
    } catch (error) {
      console.error('❌ Error decodificando token', error);
      return null;
    }
  }

  getUserNombre(): string | null {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.nombre || user.correo || null; // 👈 prioridad al nombre
    }
    return null;
  }
}
