import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TareasService, Tarea } from '../../services/tareas';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar ngFor

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrls: ['./lista.css'],
})
export class ListaComponent implements OnInit {
  tareas: Tarea[] = [];

  @Output() editar = new EventEmitter<Tarea>();

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.tareas$.subscribe((data) => (this.tareas = data));
    this.tareasService.cargarTareas(); // carga inicial
  }

  cargarTareas() {
    this.tareasService.getTareas().subscribe((data) => {
      this.tareas = data;
    });
  }

  obtenerTareas() {
    this.tareasService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log('Tareas obtenidas:', this.tareas); // Opcional, para verificar en la consola
    });
  }

  eliminarTarea(id: string) {
    this.tareasService.eliminarTarea(id).subscribe(() => {
      this.obtenerTareas();
    });
  }

  marcarCompletada(tarea: Tarea): void {
    this.tareasService
      .actualizarTarea(tarea._id!, { ...tarea, estado: 'completada' })
      .subscribe(() => this.cargarTareas());
  }

  editarTarea(tarea: Tarea) {
    this.editar.emit(tarea);
  }
}
