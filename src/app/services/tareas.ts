// En tu servicio (tareas.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:4000/api/tareas';

  constructor(private http: HttpClient, private authService: AuthService) { }

    crearTarea(tarea: any): Observable<any> {
    const userId = this.authService.getUserId();
    if (userId) {
      const nuevaTarea = { ...tarea, id_usuario: userId };
      return this.http.post(this.apiUrl, nuevaTarea);
    } else {
      return new Observable();
    }
  }

  getTareas(): Observable<any> {
    const userId = this.authService.getUserId();
    if (userId) {
      return this.http.get(`${this.apiUrl}?id_usuario=${userId}`);
    } else {
      // Manejar el caso de un usuario no autenticado (por ejemplo, redirigir al login)
      return new Observable();
    }
  }
}