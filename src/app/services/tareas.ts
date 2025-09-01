import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Tarea {
  _id: string;
  titulo: string;
  descripcion?: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  fechaLimite?: string;
  estado?: 'pendiente' | 'completada' | 'en_progreso';
  id_usuario?: string;
  expandida?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'http://localhost:4000/api/tareas';

  // 🔥 Estado reactivo
  private tareasSubject = new BehaviorSubject<Tarea[]>([]);
  tareas$ = this.tareasSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Cargar tareas del backend */
  cargarTareas(): void {
    const userId = this.authService.getUserId();
    console.log('🆔 UserId en cargarTareas:', userId);
    if (userId) {
      this.http.get<Tarea[]>(`${this.apiUrl}?id_usuario=${userId}`).subscribe((tareas) => {
        console.log('📡 Backend devolvió:', tareas);
        this.tareasSubject.next(tareas);
      });
    }
  }

  /** Crear tarea */
  crearTarea(tarea: Partial<Tarea>): Observable<Tarea | null> {
    const userId = this.authService.getUserId();
    console.log('🆔 UserId en crearTareas:', userId);
    if (userId) {
      const nuevaTarea = {
        ...tarea,
        id_usuario: userId,
        estado: 'pendiente',
      };
      return this.http.post<Tarea>(this.apiUrl, nuevaTarea).pipe(
        tap((t) => {
          console.log('👉 Respuesta del backend al crear:', t);
          const tareas = this.tareasSubject.value;
          this.tareasSubject.next([...tareas, t]); // 🔥 se actualiza en vivo
        })
      );
    }
    return of(null);
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

  /** Eliminar tarea */
  eliminarTarea(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const tareas = this.tareasSubject.value.filter((t) => t._id !== id);
        this.tareasSubject.next(tareas);
      })
    );
  }

  /** Actualizar tarea */
  actualizarTarea(id: string, tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea).pipe(
      tap((tActualizada) => {
        const tareas = this.tareasSubject.value.map((t) =>
          t._id === id ? { ...t, ...tActualizada } : t
        );
        this.tareasSubject.next(tareas);
      })
    );
  }
}
