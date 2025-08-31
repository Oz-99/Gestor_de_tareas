import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TareasService, Tarea } from '../../services/tareas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css'],
})

export class CrearComponent {
  // Usamos un setter para parchear el formulario cuando llega una tarea a editar
  private _tareaEditando: Tarea | null = null;

  @Input() set tareaEditando(value: Tarea | null) {
    this._tareaEditando = value;
    if (value) {
      this.tareaForm.patchValue({
        titulo: value.titulo ?? '',
        descripcion: value.descripcion ?? '',
        prioridad: value.prioridad ?? 'Media',
        fechaLimite: value.fechaLimite ?? '',
      });
    } else {
      // Si limpias la selección, resetea el formulario a “crear”
      this.tareaForm.reset({ prioridad: 'Media' });
    }
  }
  get tareaEditando(): Tarea | null {
    return this._tareaEditando;
  }

  tareaForm: FormGroup;

  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      prioridad: ['Media', Validators.required],
      fechaLimite: [''],
    });
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) return;

    if (this.tareaEditando?._id) {
      // EDITAR
      this.tareasService
        .actualizarTarea(this.tareaEditando._id, this.tareaForm.value)
        .subscribe(() => {
          console.log('Tarea actualizada');
          this.tareaEditando = null; // limpia modo edición
          this.tareaForm.reset({ prioridad: 'Media' });
        });
    } else {
      // CREAR
      this.tareasService.crearTarea(this.tareaForm.value).subscribe(() => {
        console.log('Tarea creada');
        this.tareaForm.reset({ prioridad: 'Media' });
      });
    }
  } 
}

