import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasService, Tarea } from '../../services/tareas';
import { ListaComponent } from '..//lista/lista';
import { CrearComponent } from '../crear/crear';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ListaComponent, CrearComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  total = 0;
  completadas = 0;
  pendientes = 0;
  
  tareaSeleccionada: Tarea | null = null;

  seleccionarTarea(tarea: Tarea) {
    this.tareaSeleccionada = tarea; // 👈 ahora el formulario recibe la tarea
  }

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.tareas$.subscribe((tareas) => {
      this.total = tareas.length;
      this.completadas = tareas.filter((t) => t.estado === 'completada').length;
      this.pendientes = tareas.filter((t) => !t.estado || t.estado === 'pendiente').length;      
    });   

    this.tareasService.cargarTareas();
  }
 
}
