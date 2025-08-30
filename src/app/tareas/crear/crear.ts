import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TareasService } from '../../services/tareas';;
import { CommonModule } from '@angular/common'; // Necesario para directivas estructurales

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa los módulos de formularios reactivos
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})
export class CrearComponent implements OnInit {
  tareaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      prioridad: ['Media'], // Puedes establecer una prioridad por defecto
      fechaLimite: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      const nuevaTarea = {
        ...this.tareaForm.value,
        id_usuario: 'ID_DE_USUARIO' // Reemplaza con el ID del usuario autenticado
      };
      this.tareasService.crearTarea(nuevaTarea).subscribe(response => {
        console.log('Tarea creada con éxito:', response);
        this.tareaForm.reset();
        // Puedes agregar lógica para notificar al usuario o navegar a la lista de tareas
      }, error => {
        console.error('Error al crear la tarea:', error);
      });
    }
  }
}
